import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

const Privacy = () => {
  const defaultPrivacy = `
### **Last updated: December 31, 2025**

**1. Information Collection**
We collect information you provide directly to us, such as when you create an account, enroll in a course, or communicate with us. This may include your name, email address, phone number, and payment information.

**2. Use of Information**
We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you technical notices, and respond to your comments and questions.

**3. Data Security**
We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet is 100% secure.

**4. Cookies & Tracking**
We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

**5. Service Providers**
We may employ third-party companies and individuals to facilitate our Service (e.g., Payment Processors, Analytics). These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

**6. Changes to This Policy**
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

If you have any questions about this Privacy Policy, please contact us.`;

  const [content, setContent] = useState(defaultPrivacy);

  useEffect(() => {
    const saved = localStorage.getItem('legal_privacy');
    if (saved) setContent(saved);
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <GlassCard className="p-10">
        <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none text-financio-muted leading-relaxed whitespace-pre-wrap font-sans">
          {content}
        </div>
      </GlassCard>
    </div>
  );
};

export default Privacy;
