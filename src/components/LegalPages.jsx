import React from 'react';

const LegalPages = ({ type }) => {
  const content = {
    about: {
      title: "About Us",
      body: "Financio - Straddly is a premier financial education hub dedicated to transforming beginners into world-class market professionals. Our mission is to provide professional-grade market education through a structured 12-level curriculum, empowering individuals with the skills to manage capital and grow wealth in Indian and Global markets."
    },
    contact: {
      title: "Contact Us",
      body: "Official Support Channels:\n\nEmail: info@financio.pro\nMobile: +91 89289 40525\nAddress: 1304 Ozone Biz Center, Belasis Road, Mumbai 400008\n\nOperational Hours: Monday - Friday (10:00 AM to 6:00 PM IST)"
    },
    privacy: {
      title: "Privacy Policy",
      body: "We value your data security. Financio - Straddly collects information for enrollment and student progress tracking only. We do not share data with third parties for marketing. All payments are processed through encrypted, licensed payment gateways."
    },
    terms: {
      title: "Terms and Conditions",
      body: "All course content, strategies, and materials are proprietary to Financio - Straddly. Membership is for individual use only. Any unauthorized distribution or recording of live sessions is strictly prohibited."
    },
    refund: {
      title: "Refund/Cancellation Policy",
      body: "We offer a 7-day refund policy for our digital modules, provided content consumption is below 20%. For offline batches, a notice of 48 hours is required for cancellation. Refund requests must be sent to info@financio.pro."
    }
  };

  const page = content[type] || content.about;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 animate-in fade-in duration-700">
      <div className="premium-card bg-slate-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem]">
        <h1 className="text-5xl font-black text-white italic uppercase mb-8 tracking-tighter">
          {page.title}
        </h1>
        <div className="text-blue-100/80 leading-relaxed text-lg whitespace-pre-line font-medium">
          {page.body}
        </div>
      </div>
    </div>
  );
};

export default LegalPages;