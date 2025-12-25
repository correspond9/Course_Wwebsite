from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import *
from datetime import datetime
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== COURSE ROUTES ====================

@api_router.get("/courses", response_model=List[Course])
async def get_courses(category: str = None):
    """Get all courses or filter by category"""
    query = {}
    if category:
        query["category"] = category
    courses = await db.courses.find(query).sort("createdAt", -1).to_list(1000)
    return [Course(**course) for course in courses]

@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    """Get a single course by ID"""
    course = await db.courses.find_one({"id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return Course(**course)

@api_router.post("/courses", response_model=Course)
async def create_course(course: CourseCreate):
    """Create a new course"""
    course_dict = course.dict()
    course_obj = Course(**course_dict)
    await db.courses.insert_one(course_obj.dict())
    return course_obj

@api_router.put("/courses/{course_id}", response_model=Course)
async def update_course(course_id: str, course_update: CourseUpdate):
    """Update a course"""
    # Get existing course
    existing_course = await db.courses.find_one({"id": course_id})
    if not existing_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in course_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.courses.update_one(
        {"id": course_id},
        {"$set": update_data}
    )
    
    updated_course = await db.courses.find_one({"id": course_id})
    return Course(**updated_course)

@api_router.delete("/courses/{course_id}")
async def delete_course(course_id: str):
    """Delete a course"""
    result = await db.courses.delete_one({"id": course_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Course deleted successfully"}

# ==================== LEAD ROUTES ====================

@api_router.post("/leads", response_model=Lead)
async def create_lead(lead: LeadCreate):
    """Create a new lead/inquiry"""
    lead_dict = lead.dict()
    lead_obj = Lead(**lead_dict)
    await db.leads.insert_one(lead_obj.dict())
    logger.info(f"New lead created: {lead.name} - {lead.email}")
    return lead_obj

@api_router.get("/leads", response_model=List[Lead])
async def get_leads(status: str = None):
    """Get all leads, optionally filter by status"""
    query = {}
    if status:
        query["status"] = status
    leads = await db.leads.find(query).sort("createdAt", -1).to_list(1000)
    return [Lead(**lead) for lead in leads]

@api_router.put("/leads/{lead_id}")
async def update_lead_status(lead_id: str, status: str):
    """Update lead status"""
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead status updated"}

@api_router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str):
    """Delete a lead"""
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}

# ==================== SITE SETTINGS ROUTES ====================

@api_router.get("/site-settings", response_model=SiteSettings)
async def get_site_settings():
    """Get site settings"""
    settings = await db.site_settings.find_one({"id": "site_settings"})
    if not settings:
        # Create default settings if not exists
        default_settings = SiteSettings()
        await db.site_settings.insert_one(default_settings.dict())
        return default_settings
    return SiteSettings(**settings)

@api_router.put("/site-settings", response_model=SiteSettings)
async def update_site_settings(settings_update: SiteSettingsUpdate):
    """Update site settings"""
    update_data = {k: v for k, v in settings_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.site_settings.update_one(
        {"id": "site_settings"},
        {"$set": update_data},
        upsert=True
    )
    
    updated_settings = await db.site_settings.find_one({"id": "site_settings"})
    return SiteSettings(**updated_settings)

# ==================== PAYMENT GATEWAY ROUTES ====================

@api_router.get("/payment-gateway", response_model=PaymentGateway)
async def get_payment_gateway():
    """Get payment gateway settings"""
    settings = await db.payment_gateway.find_one({"id": "payment_settings"})
    if not settings:
        # Create default settings
        default_settings = PaymentGateway()
        await db.payment_gateway.insert_one(default_settings.dict())
        return default_settings
    return PaymentGateway(**settings)

@api_router.put("/payment-gateway", response_model=PaymentGateway)
async def update_payment_gateway(gateway_update: PaymentGatewayUpdate):
    """Update payment gateway settings"""
    update_data = {k: v for k, v in gateway_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.payment_gateway.update_one(
        {"id": "payment_settings"},
        {"$set": update_data},
        upsert=True
    )
    
    updated_settings = await db.payment_gateway.find_one({"id": "payment_settings"})
    return PaymentGateway(**updated_settings)

# ==================== ADMIN AUTH ROUTES ====================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

@api_router.post("/admin/register")
async def register_admin(admin: AdminCreate):
    """Register a new admin (for initial setup only)"""
    # Check if admin already exists
    existing = await db.admins.find_one({"username": admin.username})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    # Hash password
    hashed_pw = hash_password(admin.password)
    admin_dict = admin.dict()
    admin_dict["password"] = hashed_pw
    admin_obj = Admin(**admin_dict)
    
    await db.admins.insert_one(admin_obj.dict())
    return {"message": "Admin registered successfully"}

@api_router.post("/admin/login")
async def login_admin(credentials: AdminLogin):
    """Admin login"""
    admin = await db.admins.find_one({"username": credentials.username})
    if not admin or not verify_password(credentials.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "message": "Login successful",
        "admin": {
            "username": admin["username"],
            "email": admin["email"]
        }
    }

# ==================== STATS ROUTE ====================

@api_router.get("/stats")
async def get_stats():
    """Get dashboard stats"""
    total_courses = await db.courses.count_documents({})
    total_leads = await db.leads.count_documents({})
    new_leads = await db.leads.count_documents({"status": "new"})
    
    return {
        "totalCourses": total_courses,
        "totalLeads": total_leads,
        "newLeads": new_leads
    }

# ==================== DEFAULT ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "IFMC Institute API", "status": "running"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
