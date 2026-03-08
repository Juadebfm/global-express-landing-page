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

const TermsConditions = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 lg:pt-28 px-4 sm:px-8 lg:px-16 pb-12">
        <div className="max-w-4xl">
          <h1 className="text-[30px] font-bold text-[color:var(--accent)] max-md:text-3xl max-sm:text-2xl">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-[color:var(--text-muted)] mt-2">
            Last updated: March 1, 2026
          </p>

          <P>
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the Global Express International Freight Agent (&quot;Global Express,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) website and logistics services. By using our services, you agree to be bound by these Terms.
          </P>

          <Section title="1. Acceptance of Terms">
            <P>
              By accessing our website, requesting a quote, or engaging our freight and logistics services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services.
            </P>
          </Section>

          <Section title="2. Services">
            <P>Global Express provides the following logistics services:</P>
            <UL
              items={[
                "Air freight forwarding (international and domestic)",
                "Ocean freight shipping (FCL and LCL)",
                "Packaging and crating services",
                "Warehousing and storage solutions",
                "Product sourcing and procurement assistance",
                "Customs brokerage and clearance",
              ]}
            />
            <P>
              The availability of specific services may vary by route, destination, and regulatory requirements. We reserve the right to modify or discontinue any service at any time.
            </P>
          </Section>

          <Section title="3. Shipment & Delivery">
            <P>
              All transit times, delivery dates, and cost estimates provided through our website or by our staff are approximate and do not constitute a guarantee. Actual delivery times may be affected by:
            </P>
            <UL
              items={[
                "Customs inspection and clearance procedures",
                "Weather conditions and natural events",
                "Carrier schedule changes or delays",
                "Incomplete or inaccurate shipment documentation",
                "Regulatory holds or government inspections",
                "Public holidays in origin, transit, or destination countries",
              ]}
            />
            <P>
              You are responsible for ensuring that all shipment information, including recipient details, contents declarations, and customs documentation, is accurate and complete. Global Express is not liable for delays or losses arising from inaccurate information provided by the shipper.
            </P>
          </Section>

          <Section title="4. Pricing & Payment">
            <P>
              Shipment rates displayed on our website or provided via quotation are subject to change without prior notice. Final pricing is confirmed at the time of booking and may be affected by:
            </P>
            <UL
              items={[
                "Actual weight or volumetric weight (whichever is greater)",
                "Fuel surcharges and carrier rate adjustments",
                "Customs duties, taxes, and import/export fees",
                "Special handling requirements (hazardous materials, oversized cargo, temperature control)",
                "Insurance premiums (if applicable)",
                "Storage fees for uncollected shipments",
              ]}
            />
            <P>
              Payment is due as specified in your service agreement or invoice. Late payments may incur additional charges. Global Express reserves the right to hold shipments until outstanding payments are settled.
            </P>
          </Section>

          <Section title="5. Liability & Insurance">
            <P>
              Global Express liability for loss or damage to shipments is limited in accordance with applicable international conventions, including but not limited to the Montreal Convention (air freight) and the Hague-Visby Rules (ocean freight).
            </P>
            <P>
              We strongly recommend that customers obtain adequate cargo insurance for all shipments. Global Express can arrange insurance coverage upon request for an additional premium. Without insurance, our liability is limited to the lesser of the declared value or the applicable convention limits.
            </P>
            <P>
              Global Express shall not be liable for any indirect, consequential, or special damages, including but not limited to loss of profits, business interruption, or loss of data.
            </P>
          </Section>

          <Section title="6. Force Majeure">
            <P>
              Global Express shall not be held liable for any failure or delay in performance resulting from circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, wars, government actions, strikes, port congestion, carrier insolvency, or disruptions to transportation infrastructure.
            </P>
          </Section>

          <Section title="7. Prohibited Items">
            <P>
              The following items are prohibited from shipment through our services:
            </P>
            <UL
              items={[
                "Illegal drugs and narcotics",
                "Weapons, ammunition, and explosives",
                "Counterfeit goods and items that infringe intellectual property rights",
                "Hazardous materials not properly declared and packaged per IATA/IMDG regulations",
                "Live animals (unless specifically arranged and permitted)",
                "Human remains",
                "Currency, bearer instruments, and precious metals (unless specifically arranged)",
                "Any items prohibited by the laws of the origin, transit, or destination country",
              ]}
            />
            <P>
              Shipments found to contain prohibited items may be seized, destroyed, or returned at the shipper&apos;s expense. The shipper assumes full liability for any penalties or damages arising from undeclared or prohibited contents.
            </P>
          </Section>

          <Section title="8. Claims & Disputes">
            <P>
              Claims for loss, damage, or delay must be submitted in writing within the following timeframes:
            </P>
            <UL
              items={[
                "Visible damage: within 3 days of delivery",
                "Concealed damage: within 7 days of delivery",
                "Non-delivery: within 21 days of the expected delivery date",
              ]}
            />
            <P>
              Claims must include shipment reference numbers, description of loss or damage, supporting photographs, and proof of value. Failure to file a claim within the specified timeframes may result in forfeiture of the right to compensation.
            </P>
          </Section>

          <Section title="9. Intellectual Property">
            <P>
              All content on the Global Express website, including text, graphics, logos, images, and software, is the property of Global Express or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written consent.
            </P>
          </Section>

          <Section title="10. Termination">
            <P>
              We reserve the right to refuse or terminate service to any customer at our discretion, including but not limited to cases of non-payment, violation of these Terms, or suspected fraudulent activity. Any outstanding obligations, including payment for services rendered, survive termination.
            </P>
          </Section>

          <Section title="11. Governing Law">
            <P>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea. Any disputes arising from or in connection with these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Seoul, Republic of Korea, unless otherwise agreed in writing.
            </P>
          </Section>

          <Section title="12. Contact Us">
            <P>
              If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsConditions;
