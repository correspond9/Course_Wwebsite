import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { courses, testimonials, categories } from '../data/mockCourses';
import { Star, Award, Users, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const topSellingCourses = courses.filter(course => course.topSelling).slice(0, 3);
  const tradingStrategyCourses = courses.filter(course => course.category === 'strategy');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5382] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            India's Best Online Stock Market Courses
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Learn from SEBI Registered Professionals | ISO 9001:2015 Certified | 14+ Million YouTube Views
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 hover:scale-105">
              View All Courses
            </Button>
            <Button 
              variant="outline" 
              className="bg-white text-[#1e3a5f] hover:bg-gray-100 px-8 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 hover:scale-105 border-2"
            >
              Talk to Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mx-auto mb-3 text-red-600" />
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-1">50,000+</h3>
                <p className="text-gray-600">Students Trained</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 mx-auto mb-3 text-red-600" />
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-1">ISO Certified</h3>
                <p className="text-gray-600">9001:2015</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 text-red-600" />
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-1">24+</h3>
                <p className="text-gray-600">Online Courses</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Star className="w-12 h-12 mx-auto mb-3 text-red-600" />
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-1">4.8/5</h3>
                <p className="text-gray-600">Google Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Selling Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Featured Courses</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topSellingCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} variant="red" />
            ))}
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-600 mb-4 uppercase">
              TOP 24 ONLINE STOCK MARKET COURSES
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          </div>

          {/* IFMC Trading Strategies */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-[#1e3a5f] text-center mb-8 pb-2 border-b-2 border-[#1e3a5f] inline-block w-full">
              IFMC Trading Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tradingStrategyCourses.map((course) => (
                <CourseCard key={course.id} course={course} variant="blue" />
              ))}
            </div>
          </div>

          {/* Other Courses */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-[#1e3a5f] text-center mb-8 pb-2 border-b-2 border-[#1e3a5f] inline-block w-full">
              Investor & Trader Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.filter(c => c.category === 'trader' || c.category === 'investor').slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} variant="red" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">What Our Students Say</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#1e3a5f]">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.course}</p>
                    <p className="text-xs text-gray-400 mt-1">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of successful traders who learned with IFMC Institute
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 hover:scale-105">
              Enroll Now
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/919870510511"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle size={32} />
      </a>

      {/* Enquire Now Float Button */}
      <button className="fixed bottom-8 right-28 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-105 font-semibold">
        Enquire Now
      </button>
    </div>
  );
};

export default Home;