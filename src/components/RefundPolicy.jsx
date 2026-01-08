import GlassCard from "./GlassCard";

export default function RefundPolicy() {
  return (
    <div className="max-w-5xl mx-auto">
      <GlassCard className="p-10 space-y-6">

        <h1 className="text-4xl font-bold">
          Refund Policy
          <span className="text-financio-primary">.</span>
        </h1>

        <p className="text-gray-200">
          Last Updated: January 1, 2026
        </p>

        <p className="text-gray-200">
          At Financio, we value your trust and strive to provide the best learning
          and trading experience possible. However, we understand that situations
          may arise where a refund is required. This policy explains when and how
          refunds may be processed.
        </p>

        <h2 className="text-2xl font-semibold">7-Day Refund Policy</h2>

        <p className="text-gray-200">
          We offer a <strong>7-day refund window</strong> from the date of purchase
          for eligible programs and services. To qualify for a refund:
        </p>

        <ul className="list-disc pl-6 text-gray-200 space-y-2">
          <li>The purchase must have been made within the last 7 days.</li>
          <li>The student must not have completed more than 20% of the course.</li>
          <li>No downloadable premium content should have been consumed.</li>
          <li>No certificate should have been issued.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Non-Refundable Cases</h2>

        <ul className="list-disc pl-6 text-gray-200 space-y-2">
          <li>Program completed beyond 20% progress</li>
          <li>Certificates issued</li>
          <li>Downloaded course assets or tools</li>
          <li>Live trading support programs once activated</li>
          <li>Misuse or violation of platform policy</li>
        </ul>

        <h2 className="text-2xl font-semibold">Refund Processing</h2>

        <p className="text-gray-200">
          Approved refunds are processed within 5-7 business days to your original
          payment method. Processing time may vary depending on your bank.
        </p>

        <h2 className="text-2xl font-semibold">Contact Support</h2>

        <p className="text-gray-200">
          For refund related queries, email our support team at:
        </p>

        <p className="text-white font-semibold">
          support@financio.pro
        </p>

        <p className="text-gray-200">
          Our team will review your request and respond promptly.
        </p>

      </GlassCard>
    </div>
  );
}
