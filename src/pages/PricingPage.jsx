import React from 'react';
import PricingCard from '../components/PricingCard';

const PricingPage = () => {
  const plans = [
    {
      plan: "Basic",
      price: "999",
      features: ["Up to 5 Courses", "100 Students", "Standard Support", "Basic Analytics"],
      isPopular: false,
      buttonText: "Start Free Trial"
    },
    {
      plan: "Pro Business",
      price: "2499",
      features: ["Unlimited Courses", "1000 Students", "Priority Support", "Advanced Revenue Insights", "Custom Branding"],
      isPopular: true,
      buttonText: "Get Pro Now"
    },
    {
      plan: "Enterprise",
      price: "5999",
      features: ["Unlimited Everything", "Dedicated Manager", "API Access", "Custom Integrations"],
      isPopular: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Choose Your Plan</h1>
        <p className="text-blue-100 text-lg opacity-90 max-w-2xl">
          Scale your educational business in India with our transparent pricing. No hidden fees.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((item, index) => (
          <PricingCard 
            key={index}
            plan={item.plan}
            price={item.price}
            features={item.features}
            isPopular={item.isPopular}
            buttonText={item.buttonText}
          />
        ))}
      </div>

      {/* Trust Badge Section */}
      <div className="mt-16 bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-2xl p-6 text-center">
        <p className="text-white text-sm opacity-70">
          Trusted by 500+ Indian Educators. Secure payments via Razorpay & UPI.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;