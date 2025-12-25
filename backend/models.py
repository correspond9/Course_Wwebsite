from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class CurriculumModule(BaseModel):
    module: str
    lessons: int
    duration: str

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    duration: str
    language: str
    features: str
    price: float
    discountPrice: Optional[float] = None
    instructor: str
    rating: float = 0.0
    reviews: int = 0
    topSelling: bool = False
    image: str = "/course-images/default.jpg"
    description: str
    curriculum: List[dict] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class CourseCreate(BaseModel):
    title: str
    category: str
    duration: str
    language: str
    features: str
    price: float
    discountPrice: Optional[float] = None
    instructor: str
    rating: float = 0.0
    reviews: int = 0
    topSelling: bool = False
    image: str = "/course-images/default.jpg"
    description: str
    curriculum: List[dict] = []

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    language: Optional[str] = None
    features: Optional[str] = None
    price: Optional[float] = None
    discountPrice: Optional[float] = None
    instructor: Optional[str] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    topSelling: Optional[bool] = None
    image: Optional[str] = None
    description: Optional[str] = None
    curriculum: Optional[List[dict]] = None

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    course: Optional[str] = None
    message: Optional[str] = None
    source: str = "website"  # website, whatsapp
    status: str = "new"  # new, contacted, converted, rejected
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class LeadCreate(BaseModel):
    name: str
    email: str
    phone: str
    course: Optional[str] = None
    message: Optional[str] = None
    source: str = "website"

class SiteSettings(BaseModel):
    id: str = "site_settings"
    logo: str = "/default-logo.png"
    siteName: str = "IFMC Institute"
    siteDescription: str = "Institute of Financial Market Courses"
    contactEmail: str = "info@ifmcinstitute.com"
    contactPhone: str = "+91 98 705 10511"
    whatsappNumber: str = "919870510511"
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class SiteSettingsUpdate(BaseModel):
    logo: Optional[str] = None
    siteName: Optional[str] = None
    siteDescription: Optional[str] = None
    contactEmail: Optional[str] = None
    contactPhone: Optional[str] = None
    whatsappNumber: Optional[str] = None

class PaymentGateway(BaseModel):
    id: str = "payment_settings"
    provider: str = "razorpay"  # razorpay, stripe, paypal
    enabled: bool = False
    apiKey: str = ""
    apiSecret: str = ""
    webhookSecret: Optional[str] = None
    testMode: bool = True
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class PaymentGatewayUpdate(BaseModel):
    provider: Optional[str] = None
    enabled: Optional[bool] = None
    apiKey: Optional[str] = None
    apiSecret: Optional[str] = None
    webhookSecret: Optional[str] = None
    testMode: Optional[bool] = None

class Admin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: str
    password: str  # This will be hashed
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class AdminCreate(BaseModel):
    username: str
    email: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str