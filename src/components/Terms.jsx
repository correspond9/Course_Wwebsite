import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

const Terms = () => {
  // Default content is just a fallback; real content comes from localStorage
  const defaultTerms = `
### **Last updated: December 31, 2025**

Welcome to Financio ("Company", "we", "our", "us"). These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of our website and mobile application (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.

**1. Educational Purpose Only**
All content provided on Financio, including courses, live sessions, and market analysis, is for educational purposes only. It does not constitute financial advice. Trading in financial markets involves risk, and you are solely responsible for your investment decisions.

**2. Payments & Refunds**
We use third-party payment gateways for transactions. All fees are non-refundable once the course content has been accessed. In case of technical errors or double deductions, refunds will be processed within 5-7 business days.

**3. Intellectual Property**
The Service and its original content, features, and functionality are and will remain the exclusive property of Financio. Our content is protected by copyright and other laws. You may not reproduce or resell our course material.

**4. Termination**
We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

**5. Limitation of Liability**
In no event shall Financio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits or data.

**6. Governing Law**
These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.

If you have any questions about these Terms, please contact us via the Contact Us page on our website.`;

  const [content, setContent] = useState(defaultTerms);

  useEffect(() => {
    const saved = localStorage.getItem('legal_terms');
    if (saved) setContent(saved);
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <GlassCard className="p-10">
        <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10">Terms & Conditions</h1>
        <div className="prose prose-invert prose-sm max-w-none text-financio-muted leading-relaxed whitespace-pre-wrap font-sans">
          {content}
        </div>
      </GlassCard>
    </div>
  );
};

export default Terms;
