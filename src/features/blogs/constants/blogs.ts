export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogItem {
  id: number;
  slug: string;
  types: string[];
  title: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  author: BlogAuthor;
}

export interface BlogArticleDetail {
  slug: string;
  breadcrumbLabel: string;
  title: string;
  date: string;
  categories: string[];
  readingTime: string;
  imageSrc: string;
  imageAlt: string;
  author: BlogAuthor;
  detailBlocks: BlogArticleDetailBlock[];
}

export interface BlogArticleDetailBlock {
  type: "heading" | "paragraph" | "unordered-list" | "ordered-list";
  content?: string;
  items?: string[];
}

export const blogsSectionTitle = "Blogs";
export const blogsCursorLabel = "Read Article";

export const blogItems: BlogItem[] = [
  {
    id: 1,
    slug: "beyond-the-buzzword",
    types: ["Digital transformation", "Tech startups Cairo"],
    title: "Beyond the Buzzword: How Digital Transformation is Reshaping Egypt’s Business Ecosystem in 2026",
    date: "May 9, 2026",
    imageSrc: "/images/blogs/Blog%201.png",
    imageAlt: "Blog cover image for digital transformation in Egypt",
    author: {
      name: "Cherif Badawi",
      avatar: "https://framerusercontent.com/images/OqmBJs4LnMzJmbYhG5HndEKehc.png?width=180&height=180",
    },
  },
  {
    id: 2,
    slug: "ai-driven-ux",
    types: ["Website design and development", "Mobile"],
    title: "AI-Driven UX: The Next Frontier in Website Design and Development for Egyptian E-Commerce",
    date: "Jun 5, 2026",
    imageSrc: "https://framerusercontent.com/images/XkaLP9zpjvVIxEDD8MLpFR53XjU.png?width=1080&height=1920",
    imageAlt: "Fountain pen on a spiral notebook",
    author: {
      name: "Sandra Atef",
      avatar: "https://framerusercontent.com/images/pOgaHLpnGwl7uwLVaYUpuYtv2Go.png?width=180&height=180",
    },
  },
  {
    id: 3,
    slug: "native-vs-flutter-in-2026",
    types: ["Mobile apps design and development", "App developers Cairo"],
    title: "Native vs. Flutter in 2026: Choosing the Right Mobile Apps Design and Development Strategy in Egypt",
    date: "Mar 23, 2026",
    imageSrc: "https://framerusercontent.com/images/d8Kqe8XJERWN5rExqOzjhSq22Ik.png?width=1080&height=1920",
    imageAlt: "Fountain pen on a spiral notebook",
    author: {
      name: "Ahmed Tawfek",
      avatar: "https://framerusercontent.com/images/ekRrUowZtZrw3532QcZyRLXtAfU.png?width=180&height=180",
    },
  },
  {
    id: 4,
    slug: "designing-for-the-egyptian-user",
    types: ["Website design and development", "Arabic UI design"],
    title: "Designing for the Egyptian User: Best Practices in Arabic UI/UX and Localized Development",
    date: "Apr 14, 2026",
    imageSrc: "https://framerusercontent.com/images/QKij1EqAHUUAg7rIxqSvDdqSsxw.png?width=1080&height=1920",
    imageAlt: "Fountain pen on a spiral notebook",
    author: {
      name: "Gasser Amr",
      avatar: "https://framerusercontent.com/images/pQpsevDWLJSHLRLu9ood9waSezc.png?width=180&height=180",
    },
  },
  {
    id: 5,
    slug: "the-instapay-effect",
    types: ["Digital transformation", "Mobile apps design and development"],
    title: "The InstaPay Effect: Integrating Next-Gen Payment Gateways into Egypt’s E-Commerce Platforms",
    date: "Feb 12, 2026",
    imageSrc: "https://framerusercontent.com/images/wVQbxVQvV8RAhHs7PXTFePH8v2U.png?width=1080&height=1920",
    imageAlt: "Fountain pen on a spiral notebook",
    author: {
      name: "Anas Ali",
      avatar: "https://framerusercontent.com/images/VP6LywrB3rGPGTJfFaHX5tt8qG0.png?width=180&height=180",
    },
  },
  {
    id: 6,
    slug: "from-concept-to-app-store",
    types: ["Website design and development", "Digital transformation"],
    title: "From Concept to App Store: The Tech Stack Egyptian Startups Need to Scale Fast",
    date: "Jan 18, 2026",
    imageSrc: "https://framerusercontent.com/images/Rud0ruwk37SmkWOJ2bqlh9eGVM.png?width=1080&height=1920",
    imageAlt: "Fountain pen on a spiral notebook",
    author: {
      name: "Muhannad Ehab",
      avatar: "https://framerusercontent.com/images/shpqDphKeomMCTrKA0lYvhF3hxM.png?width=180&height=180",
    },
  },
];

export const blogArticles: BlogArticleDetail[] = [
  {
    slug: "beyond-the-buzzword",
    breadcrumbLabel: "Beyond the Buzzword",
    title: "Beyond the Buzzword: How Digital Transformation is Reshaping Egypt’s Business Ecosystem in 2026",
    date: "May 9, 2026",
    categories: [
      "Digital transformation",
      "Website design and development",
      "Egypt",
      "Tech startups Cairo",
    ],
    readingTime: "5 min read",
    imageSrc: blogItems[0]?.imageSrc ?? "/images/blogs/Blog%201.png",
    imageAlt: blogItems[0]?.imageAlt ?? "Blog cover image for digital transformation in Egypt",
    author: blogItems[0]?.author ?? {
      name: "Cherif Badawi",
      avatar: "https://framerusercontent.com/images/OqmBJs4LnMzJmbYhG5HndEKehc.png?width=180&height=180",
    },
    detailBlocks: [
      {
        type: "heading",
        content: "The 2026 Shift: Driving Growth Through Digital Transformation in Egypt",
      },
      {
        type: "paragraph",
        content:
          "The conversation around technology in Egypt has completely changed. If you walk into a boardroom in New Cairo or Downtown Alexandria today, executives are no longer asking if they should migrate to the cloud or digitize their operations they are asking how fast they can do it. In 2026, **digital transformation** has moved from a forward-looking corporate buzzword to an absolute survival strategy for businesses across Egypt.",
      },
      {
        type: "paragraph",
        content:
          "With the Ministry of Communications and Information Technology (MCIT) pushing hard toward a fully automated infrastructure, and with massive investments into nationwide fiber-optic networks, the playing field has leveled. Local enterprises, legacy brands, and nimble **tech startups Cairo** hosts are finding that true digital adaptation is the only way to shield themselves from economic volatility, optimize internal costs, and capture a highly connected consumer base.",
      },
      {
        type: "heading",
        content: 'Why "Going Digital" is a Survival Strategy for Egyptian Businesses',
      },
      {
        type: "paragraph",
        content:
          "The macroeconomic pressures of recent years have forced Egyptian business owners to become masters of efficiency. Traditional workflows reliant on paper trails, fragmented communication, and isolated desktop software simply cannot scale.",
      },
      {
        type: "unordered-list",
        items: [
          "According to regional ICT benchmarks, Egypt's tech sector has maintained a sustained annual growth rate of 14-16%, powered heavily by an export-driven digital economy.",
        ],
      },
      {
        type: "paragraph",
        content:
          "True **digital transformation** isn't just about replacing an Excel sheet with a SaaS platform. It represents a fundamental overhaul of how value is delivered to the Egyptian consumer. By automating supply chains, deploying enterprise resource planning (ERP) systems, and leaning into data-driven decision-making, local companies are cutting operational overhead by up to 30%. This newfound agility allows them to pivot faster than legacy competitors when market conditions shift overnight.",
      },
      {
        type: "heading",
        content: "The Core Pillars of Modern Business Transformation",
      },
      {
        type: "paragraph",
        content:
          "Successfully steering an enterprise through a tech evolution requires a balanced approach. In Egypt's current market, two pillars stand out as non-negotiable.",
      },
      {
        type: "heading",
        content: "Shifting from Brick-and-Mortar to Cloud-First Infrastructures",
      },
      {
        type: "paragraph",
        content:
          "Relying on physical on-premise servers is a massive risk. Local businesses are rapidly migrating to localized cloud infrastructure and regional data centers. This ensures maximum uptime, protects vital consumer data under Egypt's data protection laws, and allows teams to collaborate seamlessly across multiple governorates without lag.",
      },
      {
        type: "heading",
        content: "Seamless Website Design and Development as Your Digital Front Door",
      },
      {
        type: "paragraph",
        content:
          "Your digital presence is the initial point of contact for clients, partners, and investors. Advanced **website design and development** acts as the anchor for all your digital conversion assets. A slow, unresponsive web platform or an outdated e-commerce storefront will immediately alienate users. Today's web platforms must be fast, secure, and directly integrated into internal ERP and CRM pipelines to provide real-time updates on inventory, shipping, and client accounts.",
      },
      {
        type: "heading",
        content: "Case Studies: Egyptian Brands Nailing Their Evolution",
      },
      {
        type: "paragraph",
        content:
          "Look no further than Egypt's booming logistics and retail sectors to see this transformation in action. Traditional retail chains that historically relied purely on physical foot traffic have aggressively built custom digital architectures. By launching high-performance web platforms and integrating them with localized fulfillment networks, these brands managed to capture market share in areas where they didn't even have a physical store presence.",
      },
      {
        type: "paragraph",
        content:
          "Similarly, in the B2B manufacturing space, companies in the 10th of Ramadan and 6th of October cities are utilizing automated client portals. Instead of sales reps manually collecting orders via phone or messaging apps, clients log into a dedicated portal to check live production timelines, view specialized pricing structures, and settle invoices instantaneously through integrated financial networks.",
      },
      {
        type: "heading",
        content: "Next Steps: How Your Business Can Begin Its Transformation",
      },
      {
        type: "paragraph",
        content:
          "Ready to overhaul your workflows? The transition doesn't have to happen overnight. Follow this framework to kickstart your journey:",
      },
      {
        type: "ordered-list",
        items: [
          "**Audit the Bottlenecks**: Identify the single slowest workflow in your business (e.g., manual invoicing or client onboarding) and target it first.",
          "**Prioritize Your Visual Assets**: Invest in professional **website design and development** that reflects a modern enterprise. Ensure your web presence is optimized for mobile-first users.",
          "**Bridge the Skills Gap**: Digital tools are only as good as the team using them. Allocate budget for structured, continuous training sessions for your staff.",
          "**Partner Locally:** Work with specialized engineering agencies in Cairo and Alexandria that understand the specific nuances of infrastructure, localized hosting, and target consumer behavior in Egypt.",
        ],
      },
    ],
  },
];

function buildFallbackBlogArticle(blog: BlogItem): BlogArticleDetail {
  return {
    slug: blog.slug,
    breadcrumbLabel: blog.title,
    title: blog.title,
    date: blog.date,
    categories: blog.types,
    readingTime: "5 min read",
    imageSrc: blog.imageSrc,
    imageAlt: blog.imageAlt,
    author: blog.author,
    detailBlocks: [
      {
        type: "paragraph",
        content: `${blog.title} is part of the theGeeX insights series on ${blog.types.join(", ")}. Full article details for this post will be added here soon.`,
      },
    ],
  };
}

export function getBlogArticleBySlug(slug: string) {
  const article = blogArticles.find((entry) => entry.slug === slug);

  if (article) {
    return article;
  }

  const blog = blogItems.find((entry) => entry.slug === slug);

  return blog ? buildFallbackBlogArticle(blog) : undefined;
}

export function getAllBlogSlugs() {
  return blogItems.map((blog) => blog.slug);
}