export const QUERY_DATA = [
  {
    question: "What are my biggest consumer painpoints?",
    dummyAnswer: "Your biggest consumer pain points are slow shipping, complex returns, and unclear product descriptions.",
    loaderText: [
      "Analyzing customer reviews...",
      "Processing support tickets...",
      "Identifying pain points..."
    ],
    layout: [
      { x: 0, y: 0 },         // Pain Points Analysis (large, left)
      { x: 420, y: 0 },       // Customer Feedback (medium, right)
      { x: 800, y: 0 },       // Support Analysis (small, bottom-right)
      { x: 800, y: 260 }      // Solutions Overview (wide, center)
    ],
    blocks: [
      {
        title: "Top Consumer Pain Points",
        text: "Based on 10,000+ reviews and support tickets, here are the main issues customers face:",
        images: [
          "/images/pain-points-chart.svg",
          "/images/customer-feedback-trend.svg",
          "/images/support-tickets-analysis.svg"
        ],
        details: [
          "Slow shipping times (mentioned by 34% of customers)",
          "Complex return process (28% complaint rate)",
          "Limited product availability (22% of support tickets)",
          "Unclear product descriptions leading to wrong purchases"
        ],
        link: "https://example.com/pain-points-analysis",
        expandedContent: {
          text: "In-depth analysis reveals that slow shipping is most acute in rural areas. Customers also cited lack of real-time tracking as a frustration. Return process complaints often mention confusing instructions and slow refunds. Product availability issues are most common during seasonal sales.",
          points: [
            "Rural customers experience 2x longer shipping times.",
            "Top complaint: unclear return instructions.",
            "Product stockouts spike during holiday sales.",
            "Customers want more accurate product descriptions."
          ],
          images: [
            "/images/shipping-analysis-map.svg",
            "/images/returns-process-flow.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/8tPnX7OPo0Q",
            title: "Understanding Customer Pain Points"
          },
          references: [
            { label: "Shipping Report 2024", url: "https://example.com/shipping-report" },
            { label: "Returns Whitepaper", url: "https://example.com/returns-whitepaper" }
          ]
        },
        size: "large"
      },
      {
        title: "Customer Sentiment",
        text: "Overall satisfaction score: 3.4/5. Main concerns center around delivery and product quality.",
        image: "/images/sentiment-trend-chart.svg",
        expandedContent: {
          text: "Customer sentiment analysis shows a dip in satisfaction during peak shipping periods. Product quality issues are often related to packaging and missing parts.",
          points: [
            "Satisfaction drops by 0.5 points during holidays.",
            "Most negative reviews mention late deliveries.",
            "Positive reviews highlight easy website navigation."
          ],
          images: [
            "/images/satisfaction-breakdown.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/kLneJKAqRtk",
            title: "Improving Customer Satisfaction"
          }
        },
        size: "medium"
      },
      {
        title: "Support Trends",
        text: "40% increase in support tickets related to shipping delays in Q4.",
        image: "/images/support-trends-chart.svg",
        expandedContent: {
          text: "Support tickets peaked in December, with most inquiries about delayed shipments and refund requests. Automation of common responses reduced average resolution time by 20%.",
          points: [
            "December saw a 60% increase in shipping-related tickets.",
            "Automated replies now handle 35% of common queries.",
            "Average ticket resolution time: 18 hours (down from 23)."
          ],
          images: [
            "/images/ticket-resolution-timeline.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/jIM_vNtebM8",
            title: "Optimizing Customer Support"
          }
        },
        size: "small"
      },
      {
        title: "Quick Wins",
        text: "Implement express shipping options and improve product descriptions for immediate impact.",
        image: "/images/quick-wins-timeline.svg",
        expandedContent: {
          text: "Quick wins include enabling express shipping at checkout and updating product pages with more detailed descriptions and photos. These changes can reduce complaints and boost satisfaction within weeks.",
          points: [
            "Add express shipping for top-selling products.",
            "Update product descriptions with more images.",
            "Highlight return policy on product pages."
          ],
          images: [
            "/images/implementation-roadmap.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/ywk4eV6X1Ik",
            title: "Quick Wins Implementation Guide"
          }
        },
        size: "wide"
      }
    ]
  },
  {
    question: "How can I improve my products to better convert?",
    dummyAnswer: "Optimize product images, improve checkout flow, and add social proof to boost conversions.",
    loaderText: [
      "Analyzing conversion funnels...",
      "Processing A/B test results...",
      "Generating recommendations..."
    ],
    layout: [
      { x: 0, y: 0 },         // Conversion Analysis (large, left)
      { x: 440, y: 0 },       // Product Optimization (small, center)
      { x: 800, y: 0 },       // Performance Metrics (medium, right)
    ],
    blocks: [
      {
        title: "Conversion Optimization Strategy",
        text: "Data-driven recommendations to boost your conversion rates:",
        images: [
          "/images/conversion-funnel.svg",
          "/images/optimization-impact-chart.svg"
        ],
        details: [
          "Optimize product images (can increase conversions by 27%)",
          "Improve checkout flow (reduce abandonment by 18%)",
          "Add social proof (reviews increase purchases by 31%)",
          "Implement urgency indicators (limited time offers)",
          "Personalize product recommendations"
        ],
        link: "https://example.com/conversion-optimization",
        expandedContent: {
          text: "A/B testing and analytics show that improving product images and adding urgency indicators can significantly boost conversions. Personalized recommendations and recent reviews are also highly effective.",
          points: [
            "High-res images increase add-to-cart by 22%.",
            "Urgency banners boost conversion by 11%.",
            "Personalized recommendations drive repeat purchases."
          ],
          images: [
            "/images/ab-test-results.svg",
            "/images/conversion-impact-chart.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/8tPnX7OPo0Q",
            title: "Product Optimization Strategies"
          },
          references: [
            { label: "Conversion Study 2024", url: "https://example.com/conversion-study" },
            { label: "A/B Testing Guide", url: "https://example.com/ab-testing-guide" }
          ]
        },
        size: "large"
      },
      {
        title: "A/B Test Results",
        text: "Latest tests show new product page layout increased conversions by 15.3%.",
        image: "/images/ab-test-comparison.svg",
        expandedContent: {
          text: "Recent A/B tests compared the old and new product page layouts. The new layout, with larger images and clearer CTAs, led to a significant increase in conversion rate.",
          points: [
            "New layout: +15.3% conversions vs old.",
            "Larger images and reviews above the fold.",
            "Clearer call-to-action buttons."
          ],
          images: [
            "/images/layout-comparison.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/kLneJKAqRtk",
            title: "A/B Testing Best Practices"
          }
        },
        size: "small"
      },
      {
        title: "Performance Metrics",
        text: "Current conversion rate: 2.8%. Industry average: 3.1%. Room for 0.3% improvement.",
        image: "/images/performance-metrics-chart.svg",
        expandedContent: {
          text: "Your store's conversion rate is slightly below the industry average. Focus on optimizing mobile experience and reducing checkout steps to close the gap.",
          points: [
            "Mobile conversion rate: 1.9% (vs 2.3% avg)",
            "Desktop conversion rate: 3.7% (vs 3.9% avg)",
            "Checkout abandonment: 68% (industry avg: 62%)"
          ],
          images: [
            "/images/device-comparison-chart.svg"
          ],
          video: {
            url: "https://www.youtube.com/embed/jIM_vNtebM8",
            title: "Improving Mobile Conversion Rates"
          }
        },
        size: "medium"
      }
    ]
  }
]; 