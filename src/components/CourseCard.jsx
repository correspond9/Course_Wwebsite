import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 group">
      {/* Course Title */}
      <h3 className="text-2xl font-semibold mb-3 text-slate-900 leading-tight min-h-[64px] group-hover:text-navy transition-colors">
        {course.title}
      </h3>

      {/* Course Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar size={16} className="text-slate-400" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <BookOpen size={16} className="text-slate-400" />
          <span>{course.language}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm mb-6 line-clamp-2">
        {course.description}
      </p>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <div>
          {course.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">₹{course.discountPrice}</span>
              <span className="text-sm line-through text-slate-400">₹{course.price}</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-slate-900">₹{course.price}</span>
          )}
        </div>
        <Link to={`/course/${course.id}`}>
          <Button 
            size="sm"
            className="bg-navy hover:bg-navy-dark text-white font-medium rounded-lg px-4 group-hover:px-6 transition-all shadow-soft"
          >
            View Course
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;