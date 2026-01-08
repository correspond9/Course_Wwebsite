import React from 'react';

const PricingCard = ({ plan, price, features, isPopular, buttonText }) => {
  return (
    <div className={`
      relative p-8 rounded-3xl transition-all duration-300
      ${isPopular 
        ? 'bg-white bg-opacity-20 border-2 border-white scale-105 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]' 
        : 'bg-white bg-opacity-10 border border-white border-opacity-30 hover:bg-opacity-15 shadow-xl'}
      backdrop-blur-xl flex flex-col h-full overflow-hidden animate-shine
    `}>
      {/* Shine effect is handled by the 'animate-shine' class in CSS */}
      
      {isPopular && (
        <span className="absolute top-4 right-4 bg-white text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Best Value
        </span>
      )}

      <h3 className="text-white text-xl font-bold mb-2">{plan}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-white text-4xl font-extrabold">₹{price}</span>
        <span className="text-blue-100 text-sm opacity-80 ml-2">/month</span>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white text-sm">
            <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`
        w-full py-4 rounded-2xl font-bold transition-all
        ${isPopular 
          ? 'bg-white text-blue-600 hover:bg-blue-50' 
          : 'bg-transparent border border-white text-white hover:bg-white hover:text-blue-600'}
      `}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;