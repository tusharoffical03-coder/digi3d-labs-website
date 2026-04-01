import { useState } from "react";

function renderContent(text: string): string {
  return text
    .split("\n\n")
    .map((para) => {
      const lines = para
        .split("\n")
        .map((line) =>
          line.replace(
            /\*\*([^*]+)\*\*/g,
            '<strong style="color:#EAF1FF">$1</strong>',
          ),
        )
        .join("<br/>");
      return `<p style="margin:0 0 0.75rem 0">${lines}</p>`;
    })
    .join("");
}

const blogPosts = [
  {
    category: "3D Web Design",
    categoryColor: "#00E5FF",
    categoryBg: "rgba(0,229,255,0.1)",
    categoryBorder: "rgba(0,229,255,0.3)",
    title: "What is a 3D Website? Why Your Business Needs One in 2025",
    excerpt:
      "A 3D website uses advanced Three.js technology to create immersive, interactive experiences that captivate visitors. Unlike flat websites, 3D sites have animated shapes, particle effects, and depth — making your brand unforgettable. Businesses using 3D websites see 3x more time-on-site and higher conversion rates.",
    fullContent: `A 3D website uses advanced Three.js technology to create immersive, interactive experiences that captivate visitors. Unlike flat, static websites, 3D sites feature animated shapes, floating particles, depth layers, and real-time mouse parallax — making your brand truly unforgettable.

**Why 3D Websites Work:**
- 3x more average time-on-site compared to flat websites
- Higher emotional engagement = higher conversion rates
- Stand out from 99% of competitors who use template sites
- Ideal for agencies, SaaS, luxury brands, and real estate

**Key Technologies Used:**
Three.js is the industry-standard JavaScript library for 3D graphics in the browser. It renders WebGL-based animations with smooth 60fps performance, even on mobile devices when optimized correctly.

**Is a 3D Website Right for You?**
If you want to make a powerful first impression, generate more leads, and position your brand as premium — a 3D website is the best investment you can make in 2025. Digi3D Labs specializes in building high-performance 3D websites tailored for Indian and USA businesses.`,
    readTime: "5 min read",
  },
  {
    category: "Business Growth",
    categoryColor: "#8A46FF",
    categoryBg: "rgba(138,70,255,0.1)",
    categoryBorder: "rgba(138,70,255,0.3)",
    title: "How to Grow Your Business with a Professional Website",
    excerpt:
      "Your website is your 24/7 salesperson. A professionally designed website builds trust, generates leads, and converts visitors into customers. With the right CTA placement, fast loading speed, and mobile optimization, businesses have seen 2x–5x growth in online inquiries within 3 months.",
    fullContent: `Your website is your 24/7 salesperson — working while you sleep. A professionally designed website builds instant trust, generates qualified leads, and converts visitors into paying customers around the clock.

**What Makes a Website Drive Growth:**
- **Clear CTAs (Call to Action):** Every page should guide visitors to take one specific action — call, WhatsApp, or fill a form.
- **Fast Loading Speed:** A 1-second delay reduces conversions by 7%. Optimized sites load in under 2 seconds.
- **Mobile Optimization:** 70%+ of Indian users browse on mobile. A non-mobile site loses most leads.
- **Trust Signals:** Client testimonials, case studies, awards, and brand logos build instant credibility.
- **SEO Optimization:** Ranking on Google Page 1 gives you free, high-intent traffic forever.

**Real Results:**
Businesses that invest in a professional, conversion-focused website see 2x–5x growth in online inquiries within 3 months. Digi3D Labs has helped 200+ clients achieve measurable business growth through strategic web design.

**Next Step:** Book a free consultation with Digi3D Labs and let us audit your current website for free.`,
    readTime: "4 min read",
  },
  {
    category: "Google Ads",
    categoryColor: "#FF9800",
    categoryBg: "rgba(255,152,0,0.1)",
    categoryBorder: "rgba(255,152,0,0.3)",
    title: "How Google Ads Can Skyrocket Your Business Growth",
    excerpt:
      "Google Ads puts your business in front of people actively searching for your services. With precise targeting by location, keywords, and intent, every rupee is spent on high-intent prospects. Our clients consistently achieve 300–500% ROI on Google Ads campaigns with the right strategy and optimization.",
    fullContent: `Google Ads is the most powerful paid advertising platform for businesses that want immediate results. Unlike social media ads, Google Ads targets people who are actively searching for your product or service right now.

**Why Google Ads Works So Well:**
- **High Intent:** Users are already searching for what you offer — they're ready to buy.
- **Precise Targeting:** Target by city, pincode, device, time of day, and exact keywords.
- **Measurable ROI:** Every rupee is tracked. You know exactly what's working.
- **Instant Results:** Start getting leads within 24 hours of campaign launch.

**Types of Google Ads Campaigns:**
1. **Search Ads** — Text ads shown when users Google your keywords
2. **Display Ads** — Visual banner ads across millions of websites
3. **YouTube Ads** — Video ads before YouTube content
4. **Shopping Ads** — Product listings for e-commerce businesses
5. **Local Ads** — Drive foot traffic to your physical location

**Our Results:**
Digi3D Labs clients consistently achieve 300–500% ROI on Google Ads with the right keyword strategy, compelling ad copy, and optimized landing pages. We manage campaigns from ₹10,000/month to ₹10 lakh/month.

**Ready to Start?** Contact Digi3D Labs for a free Google Ads audit and strategy session.`,
    readTime: "6 min read",
  },
  {
    category: "Facebook Marketing",
    categoryColor: "#FF4FD8",
    categoryBg: "rgba(255,79,216,0.1)",
    categoryBorder: "rgba(255,79,216,0.3)",
    title: "Facebook & Instagram Ads: The Complete Guide for Indian Businesses",
    excerpt:
      "Facebook and Instagram Ads let you target your exact ideal customer by age, interests, location, and behavior. For Indian businesses, social media ads are the most cost-effective way to reach a large audience and build brand awareness. Learn how to set up high-converting campaigns with minimal budget.",
    fullContent: `Facebook and Instagram Ads give you unmatched targeting power to reach your exact ideal customer. With over 500 million users in India across both platforms, social media advertising is essential for modern business growth.

**Why Facebook & Instagram Ads Are Powerful:**
- **Laser Targeting:** Target by age, gender, location, income level, interests, and even life events.
- **Visual Storytelling:** Show your product/service through images, videos, carousels, and reels.
- **Retargeting:** Show ads to people who visited your website but didn't convert.
- **Lookalike Audiences:** Find new customers who look exactly like your best existing customers.

**Best Ad Formats for Indian Businesses:**
1. **Reel Ads** — Highest reach, lowest cost per view in 2025
2. **Lead Generation Ads** — Collect phone numbers directly on Facebook/Instagram
3. **WhatsApp Ads** — One-click opens WhatsApp chat with your business
4. **Video Ads** — Best for brand storytelling and awareness

**Budget Guide:**
- Start with ₹500–₹1,000/day for testing
- Scale winning ads to ₹3,000–₹10,000/day
- Expect 5–15 leads/day for local service businesses at this budget

**Common Mistakes to Avoid:**
- Targeting too broadly (India-wide when you serve one city)
- Using low-quality images or no video
- Not having a proper landing page to convert traffic
- Stopping ads too early before the algorithm optimizes

Digi3D Labs manages end-to-end Facebook & Instagram campaigns — from creative to conversion. Contact us today for a free strategy call.`,
    readTime: "5 min read",
  },
];

export default function BlogSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="blog"
      style={{
        padding: "5rem 1.5rem",
        background: "rgba(5,9,30,0.6)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 20,
              background: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.3)",
              color: "#00E5FF",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            BLOG
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#EAF1FF",
              margin: 0,
            }}
          >
            Latest Insights &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5FF, #8A46FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Resources
            </span>
          </h2>
          <p
            style={{
              color: "#9AA8C7",
              marginTop: "0.75rem",
              fontSize: "1rem",
              maxWidth: 560,
              margin: "0.75rem auto 0",
            }}
          >
            Expert guides on 3D web design, digital marketing, and business
            growth strategies.
          </p>
        </div>

        {/* Blog Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {blogPosts.map((post, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <article
                key={post.title}
                data-ocid={`blog.item.${i + 1}`}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    isExpanded ? post.categoryBorder : "rgba(255,255,255,0.08)"
                  }`,
                  borderRadius: 16,
                  backdropFilter: "blur(12px)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition:
                    "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s",
                  cursor: "default",
                  boxShadow: isExpanded
                    ? `0 8px 32px ${post.categoryBg}`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-6px)";
                    el.style.borderColor = "rgba(0,229,255,0.35)";
                    el.style.boxShadow = "0 8px 32px rgba(0,229,255,0.10)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                  }
                }}
              >
                {/* Category Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "0.25rem 0.75rem",
                    borderRadius: 20,
                    background: post.categoryBg,
                    border: `1px solid ${post.categoryBorder}`,
                    color: post.categoryColor,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {post.category}
                </div>

                {/* Title */}
                <h3
                  style={{
                    color: "#EAF1FF",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt or Full Content */}
                {!isExpanded ? (
                  <p
                    style={{
                      color: "#9AA8C7",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>
                ) : (
                  <div
                    style={{
                      color: "#9AA8C7",
                      fontSize: "0.875rem",
                      lineHeight: 1.8,
                      flex: 1,
                    }}
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: static blog content only
                    dangerouslySetInnerHTML={{
                      __html: renderContent(post.fullContent),
                    }}
                  />
                )}

                {/* Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: 8,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      color: "#6B7A99",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                    }}
                  >
                    🕐 {post.readTime}
                  </span>
                  <button
                    type="button"
                    data-ocid={`blog.secondary_button.${i + 1}`}
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    style={{
                      background: isExpanded ? post.categoryBg : "none",
                      border: `1px solid ${
                        isExpanded ? post.categoryBorder : "rgba(0,229,255,0.4)"
                      }`,
                      borderRadius: 8,
                      color: isExpanded ? post.categoryColor : "#00E5FF",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      padding: "0.35rem 0.85rem",
                      cursor: "pointer",
                      transition:
                        "background 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = isExpanded
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,229,255,0.12)";
                      el.style.boxShadow = "0 0 12px rgba(0,229,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = isExpanded
                        ? post.categoryBg
                        : "none";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {isExpanded ? "Show Less ↑" : "Read More →"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
