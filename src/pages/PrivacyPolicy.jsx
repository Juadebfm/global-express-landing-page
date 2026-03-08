import Header from "../components/Header";
import Footer from "../components/Footer";
import { CONTACT } from "../constants/siteData";

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold text-[color:var(--text)] mb-3">{title}</h2>
    {children}
  </div>
);

const P = ({ children }) => (
  <p className="text-base text-[color:var(--text-muted)] mt-3 leading-relaxed">
    {children}
  </p>
);

const UL = ({ items }) => (
  <ul className="list-disc list-inside mt-3 space-y-2 text-base text-[color:var(--text-muted)]">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 lg:pt-28 px-4 sm:px-8 lg:px-16 pb-12">
        <div className="max-w-4xl">
          <h1 className="text-[30px] font-bold text-[color:var(--accent)] max-md:text-3xl max-sm:text-2xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-[color:var(--text-muted)] mt-2">
            Last updated: March 1, 2026
          </p>

          <P>
            Global Express International Freight Agent (&quot;Global Express,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and logistics services.
          </P>

          <Section title="1. Information We Collect">
            <P>We may collect the following types of information:</P>
            <UL
              items={[
                "Personal identification information (name, email address, phone number, postal address)",
                "Shipment details (origin, destination, package dimensions, weight, contents description)",
                "Payment and billing information (processed securely through third-party payment providers)",
                "Business information (company name, tax identification numbers, import/export licenses)",
                "Device and usage data (IP address, browser type, pages visited, access times)",
                "Communication records (emails, support tickets, phone call logs related to your shipments)",
              ]}
            />
          </Section>

          <Section title="2. How We Use Your Information">
            <P>We use the information we collect to:</P>
            <UL
              items={[
                "Process and manage your shipments, including customs clearance and delivery coordination",
                "Provide shipment cost estimates and rate quotations",
                "Communicate with you about your shipments, account, and our services",
                "Comply with customs, tax, and trade regulations in applicable jurisdictions",
                "Improve our website, services, and customer experience",
                "Send you service updates and, where permitted, promotional communications",
                "Detect, prevent, and address fraud or security issues",
              ]}
            />
          </Section>

          <Section title="3. Information Sharing">
            <P>
              We do not sell your personal information. We may share your information with:
            </P>
            <UL
              items={[
                "Shipping carriers and freight partners necessary to fulfill your shipment",
                "Customs authorities and government agencies as required by law",
                "Third-party service providers who assist in our operations (payment processing, IT services, warehousing)",
                "Insurance providers when shipment insurance is requested",
                "Legal authorities when required by law, court order, or to protect our rights",
              ]}
            />
          </Section>

          <Section title="4. Data Security">
            <P>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission, secure server infrastructure, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </P>
          </Section>

          <Section title="5. Your Rights">
            <P>Depending on your jurisdiction, you may have the right to:</P>
            <UL
              items={[
                "Access the personal data we hold about you",
                "Request correction of inaccurate or incomplete data",
                "Request deletion of your personal data, subject to legal retention requirements",
                "Object to or restrict the processing of your data",
                "Withdraw consent where processing is based on consent",
              ]}
            />
            <P>
              To exercise any of these rights, please contact us using the details provided below.
            </P>
          </Section>

          <Section title="6. Cookies">
            <P>
              Our website uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand usage patterns. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.
            </P>
          </Section>

          <Section title="7. Data Retention">
            <P>
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations (including customs and tax record-keeping requirements), resolve disputes, and enforce our agreements. Shipment records may be retained for a minimum period as required by applicable trade and customs regulations.
            </P>
          </Section>

          <Section title="8. Changes to This Policy">
            <P>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
            </P>
          </Section>

          <Section title="9. Contact Us">
            <P>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </P>
            <UL
              items={[
                `Email: ${CONTACT.email}`,
                `South Korea: ${CONTACT.phones.korea}`,
                `Nigeria: ${CONTACT.phones.nigeria}`,
                `Korea Office: ${CONTACT.addresses.korea}`,
                `Nigeria Office: ${CONTACT.addresses.nigeria}`,
              ]}
            />
          </Section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
