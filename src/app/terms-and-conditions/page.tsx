import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/features/footer";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using theGeeX website, digital products, and services.",
  path: "/terms-and-conditions",
});

type TermsSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const introduction = [
  "Welcome to TheGeeX. These Terms & Conditions (\"Terms\") govern your access to and use of all services, platforms, products, and digital assets provided by TheGeeX (\"Company\", \"we\", \"our\", or \"us\"). By accessing, browsing, or engaging with any of our services, you agree to be bound by these Terms in full.",
  "If you do not agree with any part of these Terms, you must refrain from using our services.",
] as const;

const sections: TermsSection[] = [
  {
    title: "1. Company Overview",
    paragraphs: [
      "TheGeeX is a digital transformation studio providing end-to-end solutions including, but not limited to, branding, digital product development, e-commerce solutions, AI-powered automation, and growth marketing systems.",
      "Our services are designed to deliver scalable, data-driven, and production-grade digital systems tailored to each client's needs.",
    ],
  },
  {
    title: "2. Scope of Services",
    paragraphs: [
      "TheGeeX provides services across multiple domains, including:",
      "Each service is delivered based on a mutually agreed proposal, scope of work (SOW), or contract.",
      "We reserve the right to modify, enhance, or discontinue any service at any time without prior notice.",
    ],
    bullets: [
      "Brand & Digital Identity",
      "Custom Websites & Platforms",
      "E-Commerce Solutions",
      "AI-Powered Automation",
      "Growth Marketing & Analytics",
      "Integrated Resource Platforms (IRP)",
      "Digital Strategy & Consulting",
    ],
  },
  {
    title: "3. Eligibility",
    paragraphs: ["By using our services, you confirm that:"],
    bullets: [
      "You are at least 18 years old or legally authorized to enter contracts",
      "You have full authority to represent yourself or your organization",
      "All information provided is accurate, complete, and up-to-date",
    ],
  },
  {
    title: "4. Engagement & Project Agreements",
    paragraphs: [
      "All projects undertaken by TheGeeX are subject to:",
      "Any additional work outside the agreed scope may be subject to additional fees.",
    ],
    bullets: [
      "A signed agreement, proposal, or written confirmation",
      "Defined scope, deliverables, timelines, and pricing",
      "Payment terms and milestones",
    ],
  },
  {
    title: "5. Payments & Pricing",
    paragraphs: [
      "5.1 Fees: All fees are quoted based on project requirements and may vary depending on complexity.",
      "5.2 Payment Terms: Payments may be required upfront, in milestones, or upon completion. Failure to make payments may result in suspension or termination of services.",
      "5.3 Refund Policy: Payments are generally non-refundable once work has commenced. Exceptions may be considered at our sole discretion.",
    ],
  },
  {
    title: "6. Intellectual Property Rights",
    paragraphs: [
      "6.1 Ownership: Upon full payment, clients are granted ownership or licensed rights to final deliverables, unless otherwise specified. TheGeeX retains rights to underlying tools, frameworks, methodologies, and reusable components.",
      "6.2 Portfolio Use: We reserve the right to showcase completed work in our portfolio, marketing materials, and case studies unless explicitly agreed otherwise in writing.",
    ],
  },
  {
    title: "7. Client Responsibilities",
    paragraphs: [
      "Clients agree to:",
      "Delays caused by the client may impact delivery timelines.",
    ],
    bullets: [
      "Provide accurate and timely information",
      "Respond to approvals, feedback, and requests within reasonable timelines",
      "Ensure that all provided content (text, images, data) does not violate any laws or third-party rights",
    ],
  },
  {
    title: "8. Confidentiality",
    paragraphs: [
      "Both parties agree to maintain strict confidentiality regarding:",
      "This obligation survives termination of the agreement.",
    ],
    bullets: [
      "Business strategies",
      "Technical systems",
      "Proprietary information",
      "Any non-public data shared during the engagement",
    ],
  },
  {
    title: "9. Data Protection & Privacy",
    paragraphs: [
      "We implement reasonable security measures to protect client data, including:",
      "However, no system is completely secure, and we do not guarantee absolute data protection.",
      "Clients are responsible for ensuring compliance with applicable data protection laws when using our solutions.",
    ],
    bullets: [
      "Encryption where applicable",
      "Access control systems",
      "Secure infrastructure",
    ],
  },
  {
    title: "10. Third-Party Services & Integrations",
    paragraphs: [
      "Our solutions may include integrations with third-party platforms such as:",
      "We are not responsible for:",
    ],
    bullets: [
      "Payment gateways",
      "Hosting providers",
      "CRM systems",
      "Marketing tools",
      "Downtime or failures of third-party services",
      "Changes in third-party policies or pricing",
      "Data loss caused by external platforms",
    ],
  },
  {
    title: "11. Service Performance & Disclaimer",
    paragraphs: [
      "TheGeeX provides services based on best practices, data insights, and industry standards. However:",
      "All services are provided \"as is\" and \"as available.\"",
    ],
    bullets: [
      "We do not guarantee specific business outcomes (e.g., revenue growth, traffic, conversions)",
      "Performance may vary depending on market conditions, user behavior, and external factors",
    ],
  },
  {
    title: "12. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law:",
      "This includes, but is not limited to:",
    ],
    bullets: [
      "TheGeeX shall not be liable for indirect, incidental, or consequential damages",
      "Our total liability shall not exceed the total fees paid for the specific service",
      "Loss of profits",
      "Business interruption",
      "Data loss",
    ],
  },
  {
    title: "13. Timelines & Delivery",
    paragraphs: [
      "We aim to deliver projects within agreed timelines. However:",
    ],
    bullets: [
      "Timelines may be affected by client delays, scope changes, or unforeseen circumstances",
      "Agile workflows may involve iterative releases rather than a single final delivery",
    ],
  },
  {
    title: "14. Revisions & Changes",
    paragraphs: [
      "A reasonable number of revisions may be included per project.",
      "Additional revisions or major scope changes may incur extra charges.",
    ],
  },
  {
    title: "15. Termination",
    paragraphs: [
      "Either party may terminate the agreement under the following conditions:",
      "Upon termination:",
    ],
    bullets: [
      "Material breach of terms",
      "Failure to make payments",
      "Mutual agreement",
      "All outstanding payments become due immediately",
      "Work completed up to the termination date will be delivered where applicable",
    ],
  },
  {
    title: "16. Ongoing Support & Maintenance",
    paragraphs: [
      "Post-launch services such as maintenance, updates, and optimization may be provided under:",
      "Without an active support agreement, TheGeeX is not obligated to provide ongoing updates or fixes.",
    ],
    bullets: [
      "Separate agreements",
      "Subscription-based support plans (SLA)",
    ],
  },
  {
    title: "17. AI & Automation Disclaimer",
    paragraphs: [
      "As an AI-native and automation-first company, TheGeeX may implement AI-driven systems. Clients acknowledge that:",
    ],
    bullets: [
      "AI outputs may not always be 100% accurate",
      "Human oversight is recommended",
      "TheGeeX is not liable for decisions made solely based on automated outputs",
    ],
  },
  {
    title: "18. Compliance & Acceptable Use",
    paragraphs: [
      "Clients agree not to use TheGeeX services for:",
      "We reserve the right to terminate services if misuse is detected.",
    ],
    bullets: [
      "Illegal activities",
      "Fraudulent or deceptive practices",
      "Harmful, abusive, or unethical purposes",
    ],
  },
  {
    title: "19. Force Majeure",
    paragraphs: [
      "We are not liable for delays or failures caused by events beyond our control, including:",
    ],
    bullets: [
      "Natural disasters",
      "Internet outages",
      "Government actions",
      "Technical disruptions",
    ],
  },
  {
    title: "20. Governing Law",
    paragraphs: [
      "These Terms shall be governed by and interpreted in accordance with the laws of Egypt.",
    ],
  },
  {
    title: "21. Updates to Terms",
    paragraphs: [
      "We reserve the right to update these Terms at any time. Continued use of our services constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "22. Contact Information",
    paragraphs: [
      "For any questions regarding these Terms:",
      "Email: hello@thegeex.org",
    ],
  },
  {
    title: "23. Final Agreement",
    paragraphs: [
      "These Terms represent the entire agreement between TheGeeX and the client, superseding any prior discussions or agreements unless explicitly stated otherwise in writing.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <main className="relative z-(--page-main-z-index) min-h-svh bg-background pt-(--terms-page-top-padding)">
        <section className="flex w-full flex-col gap-(--terms-page-layout-gap) px-(--terms-page-padding-x) pt-(--terms-page-padding-top) pb-(--terms-page-padding-bottom)">
          <nav aria-label="Breadcrumb" className="flex w-min flex-row flex-nowrap items-center gap-(--terms-page-breadcrumb-gap) whitespace-nowrap px-(--terms-page-breadcrumb-padding-x) font-poppins text-(length:--terms-page-breadcrumb-size) leading-(--terms-page-breadcrumb-line-height) font-normal text-text">
            <Link href="/" className="transition-colors duration-200 hover:text-text">
              Home
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="font-medium text-text">Terms & Conditions</span>
          </nav>

          <header className="flex flex-col gap-(--terms-page-header-gap) px-(--terms-page-header-padding-x)">
            <h1 className="font-cal-sans text-(length:--terms-page-title-size) leading-(--terms-page-title-line-height) text-text md:whitespace-nowrap">
              Terms & Conditions — TheGeeX
            </h1>
            <p className="font-poppins text-(length:--terms-page-meta-size) leading-(--terms-page-meta-line-height) font-medium text-secondary">
              <span className="font-bold text-text">Last updated:</span> 16/04/2026
            </p>
            <div className="flex w-full max-w-(--terms-page-intro-max-width) flex-col gap-(--terms-page-intro-gap) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--terms-page-body-size) leading-(--terms-page-body-line-height) font-light tracking-normal text-text">
              {introduction.map((paragraph) => (
                <p key={paragraph} className="text-inherit">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <div className="flex w-full flex-col gap-(--terms-page-sections-gap) whitespace-pre-wrap wrap-break-word font-poppins text-(length:--terms-page-body-size) leading-(--terms-page-body-line-height) font-light tracking-normal text-text">
            {sections.map((section) => (
              <article key={section.title} className="px-(--terms-page-section-padding-x) py-(--terms-page-section-padding-y)">
                <h2 className="font-poppins text-(length:--terms-page-section-title-size) font-semibold leading-(--terms-page-section-title-line-height) text-text">
                  {section.title}
                </h2>
                <div className="mt-(--terms-page-section-content-margin-top) flex flex-col gap-(--terms-page-section-content-gap)">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-inherit">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="m-0 flex list-disc flex-col gap-(--terms-page-bullets-gap) pl-(--terms-page-bullets-padding-left) text-inherit">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter compactSpacing />
    </>
  );
}