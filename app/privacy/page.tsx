export const metadata = {
  title: 'Privacy Policy — Motkan',
  description: 'Privacy policy for Motkan AI Systems',
};

export default function PrivacyPolicy() {
  return (
    <article className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="legal-date">Last updated: June 22, 2026</p>
        </div>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Motkan ("we," "us," or "our") operates the Motkan.ai website and related services. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our website and use
            our services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <p>
            When you fill out our contact form or interact with our website, we collect:
          </p>
          <ul>
            <li>Name and email address</li>
            <li>Phone number</li>
            <li>Company/agency name</li>
            <li>Any messages or inquiries you submit</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on site</li>
            <li>Referral source</li>
          </ul>
          <p>
            This information is collected via Google Analytics and similar analytics tools to help us understand how
            visitors use our website and improve our services.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Schedule strategy calls and provide our services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Analyze website usage and improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist us in operating our website and providing services</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          <p>
            To exercise these rights, please contact us at <a href="mailto:hello@motkan.ai">hello@motkan.ai</a>.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. By using our website, you consent to our use
            of cookies in accordance with this Privacy Policy.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:hello@motkan.ai">hello@motkan.ai</a>.
          </p>
        </section>
      </div>
    </article>
  );
}
