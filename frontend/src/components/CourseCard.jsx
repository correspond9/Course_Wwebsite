import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Video, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const CourseCard = ({ course, variant = 'red' }) => {
  const bgColor = variant === 'red' ? 'bg-gradient-to-br from-red-700 to-red-900' : 'bg-gradient-to-br from-[#1e3a5f] to-[#2d5382]';
  
  return (
    <div className={`${bgColor} rounded-lg p-6 text-white border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <TrendingUp size={120} />
      </div>
      
      {course.topSelling && (
        <Badge className="absolute top-4 right-4 bg-red-600 text-white border-0 text-xs px-3 py-1">
          Top Selling
        </Badge>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4">
          <div className="inline-block">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="8" height="35" y="25" fill="#fbbf24" rx="2"/>
              <rect width="8" height="45" x="13" y="15" fill="#fbbf24" rx="2"/>
              <rect width="8" height="55" x="26" y="5" fill="#fbbf24" rx="2"/>
              <rect width="8" height="50" x="39" y="10" fill="#fbbf24" rx="2"/>
              <path d="M45 8 L55 2 L52 12 Z" fill="#fbbf24"/>
            </svg>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold mb-4 min-h-[56px] leading-tight">
          {course.title}
        </h3>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="flex-shrink-0" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Video size={16} className="flex-shrink-0" />
            <span>{course.features}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          {course.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">₹ {course.discountPrice}/-</span>
              <span className="text-sm line-through opacity-70">₹ {course.price}/-</span>
            </div>
          ) : (
            <span className="text-2xl font-bold">₹ {course.price}/-</span>
          )}
          <span className="text-xs opacity-80 ml-1">+ T&C</span>
        </div>

        {/* CTA Button */}
        <Link to={`/course/${course.id}`}>
          <Button 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded shadow-lg transition-all duration-200"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;