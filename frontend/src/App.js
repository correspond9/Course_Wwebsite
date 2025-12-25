import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Route - No Navbar/Footer */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Public Routes - With Navbar/Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course/:id" element={<CourseDetail />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
