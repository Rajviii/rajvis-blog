import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy of Rajvi's Blog to understand how we collect, use, and protect your information when you visit our website.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold font-heading mb-8 text-gradient">Privacy Policy</h1>
      <div className="prose prose-lg mx-auto">
        <p className="text-muted-foreground"><strong>Last Updated: June 24, 2026</strong></p>
        
        <p>
          Welcome to Rajvi's Blog. Your privacy is important to us. This Privacy Policy explains what information may be collected when you visit this website and how it is used.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          Rajvi's Blog does not require user registration or account creation.
        </p>
        <p>
          Information may be collected only when you voluntarily submit details through the Contact page, such as:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Message content</li>
        </ul>
        <p>
          This information is used solely to respond to inquiries and communications.
        </p>

        <h2>2. Cookies and Tracking</h2>
        <p>
          Rajvi's Blog does not intentionally use cookies to track visitors or collect personal information.
        </p>
        <p>
          However, certain third-party services, hosting providers, or browser technologies may use cookies as part of their normal operation.
        </p>

        <h2>3. Third-Party Services</h2>
        <p>
          This website may use third-party services for hosting, analytics, search functionality, or other website operations. These services may process technical information required to provide their functionality.
        </p>

        <h2>4. Google AdSense</h2>
        <p>
          Rajvi's Blog may display advertisements through Google AdSense in the future.
        </p>
        <p>
          When enabled, Google and its partners may use cookies to serve personalized or non-personalized advertisements based on user interests and browsing activity.
        </p>
        <p>
          Users can learn more about Google's advertising policies through Google's Privacy & Terms documentation.
        </p>

        <h2>5. Data Security</h2>
        <p>
          Reasonable measures are taken to protect information submitted through the website. However, no method of transmission over the Internet can be guaranteed to be completely secure.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          This Privacy Policy may be updated from time to time. Any changes will be reflected on this page along with the updated revision date.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please use the Contact page available on this website.
        </p>
      </div>
    </div>
  );
}

