import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/mockCourses';
import { Star, Calendar, Globe, Clock, CheckCircle, Play, FileText, Award, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import CourseCard from '../components/CourseCard';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Course not found</p>
      </div>
    );
  }

  const relatedCourses = courses
    .filter(c => c.id !== course.id && c.category === course.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <Link to="/" className="hover:text-red-600">Online Video Courses</Link>
            <span>/</span>
            <span className="text-[#1e3a5f] font-semibold">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Image and Video */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <Card className="mb-6 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#1e3a5f] to-[#2d5382] flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="120" y="80" fill="#B91C1C" rx="4"/>
                    <rect width="30" height="150" x="45" y="50" fill="#B91C1C" rx="4"/>
                    <rect width="30" height="180" x="90" y="20" fill="#B91C1C" rx="4"/>
                    <rect width="30" height="160" x="135" y="40" fill="#B91C1C" rx="4"/>
                    <text x="50" y="230" fill="white" fontSize="36" fontWeight="bold">IFMC</text>
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded text-sm font-semibold text-[#1e3a5f]">
                  {course.title}
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b">
                <div className="flex gap-4 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                      activeTab === 'overview'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                      activeTab === 'curriculum'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">About This Course</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>
                    
                    <h4 className="text-xl font-bold text-[#1e3a5f] mb-4">What You'll Learn</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">Comprehensive understanding of market dynamics</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">Practical trading strategies and techniques</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">Risk management and position sizing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">Real-world market examples and case studies</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">Technical and fundamental analysis skills</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">Certificate upon successful completion</span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-[#1e3a5f] mb-4">Course Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <Play className="text-red-600" />
                            <div>
                              <p className="font-semibold text-[#1e3a5f]">Video Lectures</p>
                              <p className="text-sm text-gray-600">HD quality recordings</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <FileText className="text-red-600" />
                            <div>
                              <p className="font-semibold text-[#1e3a5f]">Study Material</p>
                              <p className="text-sm text-gray-600">Downloadable PDFs</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <Award className="text-red-600" />
                            <div>
                              <p className="font-semibold text-[#1e3a5f]">Certificate</p>
                              <p className="text-sm text-gray-600">On completion</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <Clock className="text-red-600" />
                            <div>
                              <p className="font-semibold text-[#1e3a5f]">Lifetime Access</p>
                              <p className="text-sm text-gray-600">Learn at your pace</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Course Curriculum</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {course.curriculum.map((module, index) => (
                        <AccordionItem key={index} value={`module-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center justify-between w-full pr-4">
                              <span className="font-semibold text-[#1e3a5f]">
                                Module {index + 1}: {module.module}
                              </span>
                              <span className="text-sm text-gray-600">
                                {module.lessons} lessons • {module.duration}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-4 space-y-2">
                              {[...Array(module.lessons)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                                  <Play size={16} className="text-gray-400" />
                                  <span className="text-gray-700">Lesson {i + 1}</span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Student Reviews</h3>
                    <div className="flex items-center gap-6 mb-6 p-6 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-[#1e3a5f] mb-2">{course.rating}</div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={20} 
                              className={i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{course.reviews} reviews</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">Students rate this course highly for its comprehensive content and practical approach to learning.</p>
                      </div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Write a Review
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">{course.title}</h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-red-600 font-semibold">({course.reviews} customer reviews)</span>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-6 border-t border-b py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Instructor</span>
                    <span className="text-[#1e3a5f] font-semibold italic">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Language</span>
                    <span className="text-[#1e3a5f] font-semibold">{course.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Validity Period</span>
                    <span className="text-[#1e3a5f] font-semibold">{course.duration.replace(' Validity', '')}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {course.discountPrice ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-[#1e3a5f]">₹{course.discountPrice}</span>
                      <span className="text-xl text-gray-400 line-through">₹{course.price}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-[#1e3a5f]">₹{course.price}</span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold">
                    <ShoppingCart className="mr-2" />
                    ADD TO CART
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white py-6 text-lg font-semibold">
                    Enquire Now
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#1e3a5f] mb-2">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Lifetime access to course content
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Downloadable study materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Expert instructor support
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} variant="blue" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;