import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TermsAndPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-white">
      <h2 className="text-3xl font-bold text-center my-8 text-[#004E64]">
        Terms of Service and Privacy Policy
      </h2>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#004E64] mb-4">
              1. Terms of Service
            </h2>
            <p className="text-[#37474F] mb-4">
              Welcome to our Food Ordering System. By using our service, you
              agree to these terms. Please read them carefully.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              1.1 Use of Service
            </h3>
            <p className="text-[#37474F] mb-4">
              You must be at least 18 years old to use this service. You are
              responsible for maintaining the confidentiality of your account
              and password.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              1.2 Order Placement and Cancellation
            </h3>
            <p className="text-[#37474F] mb-4">
              Orders are subject to acceptance by the restaurant. Once an order
              is accepted, cancellations may not be possible or may incur fees.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              1.3 Pricing and Payments
            </h3>
            <p className="text-[#37474F] mb-4">
              All prices are as quoted on the platform. We reserve the right to
              change prices at any time. Payment is due at the time of order
              placement.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              1.4 Delivery
            </h3>
            <p className="text-[#37474F] mb-4">
              Delivery times are estimates and may vary. We are not responsible
              for delays caused by factors outside our control.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#004E64] mb-4">
              2. Privacy Policy
            </h2>
            <p className="text-[#37474F] mb-4">
              Your privacy is important to us. This policy outlines how we
              collect, use, and protect your personal information.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              2.1 Information Collection
            </h3>
            <p className="text-[#37474F] mb-4">
              We collect information you provide directly, such as name,
              address, and payment details. We also collect data about your
              usage of our service.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              2.2 Use of Information
            </h3>
            <p className="text-[#37474F] mb-4">
              We use your information to process orders, improve our service,
              and communicate with you. We may use your data for marketing
              purposes, subject to your preferences.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              2.3 Data Sharing
            </h3>
            <p className="text-[#37474F] mb-4">
              We share your information with restaurants to fulfill orders. We
              may share data with service providers who assist us in operating
              our platform.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              2.4 Data Security
            </h3>
            <p className="text-[#37474F] mb-4">
              We implement various security measures to protect your personal
              information. However, no method of transmission over the Internet
              is 100% secure.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#004E64] mb-4">
              3. Cookie Policy
            </h2>
            <p className="text-[#37474F] mb-4">
              We use cookies to enhance your experience on our platform. By
              using our service, you consent to our use of cookies in accordance
              with this policy.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              3.1 What are Cookies
            </h3>
            <p className="text-[#37474F] mb-4">
              Cookies are small text files placed on your device to collect
              standard Internet log information and visitor behavior
              information.
            </p>

            <h3 className="text-xl font-semibold text-[#004E64] mb-2">
              3.2 How We Use Cookies
            </h3>
            <p className="text-[#37474F] mb-4">
              We use cookies to personalize content, to provide social media
              features, and to analyze our traffic. We also share information
              about your use of our site with our social media, advertising, and
              analytics partners.
            </p>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold text-[#004E64] mb-4">
              4. Changes to These Policies
            </h2>
            <p className="text-[#37474F] mb-4">
              We may update these policies from time to time. We will notify you
              of any changes by posting the new policies on this page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
