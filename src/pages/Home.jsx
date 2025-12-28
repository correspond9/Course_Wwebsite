import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { courses, testimonials } from '../data/mockCourses';
import { Star, Award, Users, TrendingUp, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [allCourses, setAllCourses] = useState(courses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/courses`);
      if (response.data && response.data.length > 0) {
        setAllCourses(response.data);
      }
    } catch (error) {
      console.log('Using mock data for courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-50 rounded-full">
            <span className="text-sm font-medium text-navy">🎓 India's Leading Stock Market Institute</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight text-slate-900 max-w-4xl mx-auto">
            Master the Stock Market with
            <span className="text-navy"> Expert-Led Courses</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Learn from SEBI Registered Professionals. ISO 9001:2015 Certified. Join 50,000+ successful traders.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-navy hover:bg-navy-dark text-white px-8 py-6 text-base rounded-xl shadow-soft-lg transition-all hover:shadow-soft-xl font-medium">
              Explore Courses
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-slate-200 text-slate-700 hover:border-navy hover:text-navy px-8 py-6 text-base rounded-xl font-medium transition-all"
            >
              Talk to Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft mb-4">
                <Users className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">50,000+</h3>
              <p className="text-slate-600">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft mb-4">
                <Award className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">ISO 9001</h3>
              <p className="text-slate-600">Certified Institute</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft mb-4">
                <TrendingUp className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">24+</h3>
              <p className="text-slate-600">Expert Courses</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-soft mb-4">
                <Star className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">4.8/5</h3>
              <p className="text-slate-600">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Courses</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start your journey with our most sought-after trading and investment courses
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCourses.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:border-navy hover:text-navy px-8 py-4 text-base rounded-xl font-medium"
            >
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose IFMC?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We provide comprehensive education with practical insights from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-soft-lg rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Check className="text-navy" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Instructors</h3>
                <p className="text-slate-600 leading-relaxed">
                  Learn from SEBI registered professionals with years of market experience
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft-lg rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Check className="text-navy" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Lifetime Access</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get unlimited access to course materials and updates at your own pace
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft-lg rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Check className="text-navy" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Certification</h3>
                <p className="text-slate-600 leading-relaxed">
                  Receive industry-recognized certificates upon course completion
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Student Success Stories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from our students who transformed their trading journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-soft rounded-2xl hover:shadow-soft-lg transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Join thousands of successful traders and investors. Get started today with our expert-led courses.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-navy hover:bg-slate-50 px-8 py-6 text-base rounded-xl shadow-soft-lg font-medium">
              Browse Courses
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-xl font-medium"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/919870510511"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl shadow-soft-xl z-50 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle size={28} />
      </a>

      {/* Enquire Now Float Button */}
      <button className="fixed bottom-8 right-28 bg-accent-red hover:bg-accent-red-dark text-white px-6 py-3 rounded-2xl shadow-soft-xl z-50 transition-all duration-300 hover:scale-105 font-medium">
        Enquire Now
      </button>
    </div>
  );
};

export default Home;
