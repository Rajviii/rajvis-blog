import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service of Rajvi's Blog to understand the terms, conditions, and guidelines for using our website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold font-heading mb-8 text-gradient">Terms of Service</h1>
      <div className="prose prose-lg mx-auto">
        <p className="text-muted-foreground"><strong>Last Updated: June 24, 2026</strong></p>
        
        <p>
          Welcome to Rajvi's Blog. By accessing and using this website, you agree to comply with and be bound by the following Terms of Service. If you do not agree with any part of these terms, please discontinue use of the website.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms of Service govern your use of Rajvi's Blog and all content, features, and services available through the website.
        </p>
        <p>
          By visiting, browsing, or interacting with this website, you acknowledge that you have read, understood, and agreed to these terms.
        </p>

        <h2>2. Website Purpose</h2>
        <p>
          Rajvi's Blog is an educational and informational platform that shares content related to:
        </p>
        <ul>
          <li>Software Development</li>
          <li>React.js</li>
          <li>Next.js</li>
          <li>Prisma ORM</li>
          <li>Blockchain Technology</li>
          <li>Automation Tools</li>
          <li>Enterprise Asset Management (EAM)</li>
          <li>Music and Creative Learning</li>
          <li>Personal Projects and Experiences</li>
          <li>Curated Online Resources</li>
        </ul>
        <p>
          The content provided is intended for informational and educational purposes only.
        </p>

        <h2>3. Content Accuracy</h2>
        <p>
          While every effort is made to ensure that information published on this website is accurate and up to date, Rajvi's Blog makes no guarantees regarding the completeness, reliability, or accuracy of any information.
        </p>
        <p>
          Technology, software, APIs, frameworks, and online services evolve over time, and information may become outdated.
        </p>
        <p>
          Users are encouraged to independently verify information before making decisions based on website content.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          Unless otherwise stated, all articles, text content, designs, graphics, images, logos, screenshots, and other materials published on Rajvi's Blog are the intellectual property of the website owner.
        </p>
        <p>
          You may:
        </p>
        <ul>
          <li>Share links to articles.</li>
          <li>Quote small portions of content with proper attribution.</li>
          <li>Reference content for educational purposes.</li>
        </ul>
        <p>
          You may not:
        </p>
        <ul>
          <li>Republish entire articles without permission.</li>
          <li>Copy content for commercial purposes.</li>
          <li>Modify and redistribute website content as your own.</li>
          <li>Remove attribution or ownership references.</li>
        </ul>

        <h2>5. Curated Content and External Resources</h2>
        <p>
          The Fun Break section and other areas of the website may include links to third-party websites, applications, tools, games, services, or online resources.
        </p>
        <p>
          These resources are shared for informational, educational, or entertainment purposes only.
        </p>
        <p>
          Rajvi's Blog does not own, operate, control, endorse, or guarantee any third-party website or service.
        </p>
        <p>
          Users access external websites at their own discretion and risk.
        </p>
        <p>
          Rajvi's Blog is not responsible for:
        </p>
        <ul>
          <li>Content published on external websites.</li>
          <li>Security practices of third-party services.</li>
          <li>Availability or uptime of external resources.</li>
          <li>Changes made by external website owners.</li>
        </ul>
        <p>
          The inclusion of a link does not imply endorsement, partnership, sponsorship, or recommendation unless explicitly stated.
        </p>

        <h2>6. User Conduct</h2>
        <p>
          When interacting with the website or contacting the website owner, users agree not to:
        </p>
        <ul>
          <li>Submit unlawful, harmful, abusive, or misleading content.</li>
          <li>Attempt to gain unauthorized access to website systems.</li>
          <li>Interfere with website functionality.</li>
          <li>Use the website for malicious purposes.</li>
        </ul>
        <p>
          Any misuse of the website may result in restricted access or other appropriate actions.
        </p>

        <h2>7. Contact Form Usage</h2>
        <p>
          Information submitted through the Contact page is used solely for communication purposes.
        </p>
        <p>
          Users should avoid submitting confidential, sensitive, or private information through public forms.
        </p>
        <p>
          While reasonable measures are taken to protect submitted information, no internet-based transmission method can be guaranteed to be completely secure.
        </p>

        <h2>8. Third-Party Services</h2>
        <p>
          The website may utilize third-party services including but not limited to:
        </p>
        <ul>
          <li>Website hosting providers</li>
          <li>Analytics services</li>
          <li>Advertising networks</li>
          <li>Search and indexing services</li>
          <li>Performance monitoring tools</li>
        </ul>
        <p>
          These services may collect technical information necessary for their operation according to their own privacy policies and terms.
        </p>

        <h2>9. Advertising</h2>
        <p>
          Rajvi's Blog may display advertisements through advertising partners such as Google AdSense.
        </p>
        <p>
          Advertisements displayed on the website may be provided by third-party advertising networks.
        </p>
        <p>
          Rajvi's Blog is not responsible for the products, services, claims, or content presented within third-party advertisements.
        </p>
        <p>
          Users should exercise their own judgment before engaging with advertisers.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          All content and services are provided on an "as is" and "as available" basis.
        </p>
        <p>
          Rajvi's Blog shall not be held liable for:
        </p>
        <ul>
          <li>Direct or indirect damages.</li>
          <li>Loss of data.</li>
          <li>Loss of profits.</li>
          <li>Technical issues.</li>
          <li>Website downtime.</li>
          <li>Errors or omissions in content.</li>
          <li>Decisions made based on information provided by the website.</li>
        </ul>
        <p>
          Your use of the website is at your own risk.
        </p>

        <h2>11. Changes to Website Content</h2>
        <p>
          Rajvi's Blog reserves the right to modify, update, remove, or discontinue any content, features, pages, or services at any time without prior notice.
        </p>

        <h2>12. Changes to These Terms</h2>
        <p>
          These Terms of Service may be updated periodically to reflect changes in website functionality, legal requirements, or operational practices.
        </p>
        <p>
          Any revisions will be published on this page along with the updated revision date.
        </p>
        <p>
          Continued use of the website after updates constitutes acceptance of the revised Terms of Service.
        </p>

        <h2>13. Contact Information</h2>
        <p>
          If you have any questions regarding these Terms of Service, please visit the Contact page available on this website.
        </p>
        <p>
          Thank you for visiting Rajvi's Blog.
        </p>
      </div>
    </div>
  );
}
