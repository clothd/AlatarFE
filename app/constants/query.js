export const QUERY_DATA = [
  {
    question: "What are my biggest consumer painpoints?",
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
          "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1573166364392-d8c0c19bfed4?w=300&h=200&fit=crop"
        ],
        details: [
          "Slow shipping times (mentioned by 34% of customers)",
          "Complex return process (28% complaint rate)",
          "Limited product availability (22% of support tickets)",
          "Unclear product descriptions leading to wrong purchases"
        ],
        link: "https://example.com/pain-points-analysis",
        size: "large"
      },
      {
        title: "Customer Sentiment",
        text: "Overall satisfaction score: 3.4/5. Main concerns center around delivery and product quality.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=240&h=120&fit=crop",
        size: "medium"
      },
      {
        title: "Support Trends",
        text: "40% increase in support tickets related to shipping delays in Q4.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop",
        size: "small"
      },
      {
        title: "Quick Wins",
        text: "Implement express shipping options and improve product descriptions for immediate impact.",
        image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=320&h=80&fit=crop",
        size: "wide"
      }
    ]
  },
  {
    question: "How can I improve my products to better convert?",
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
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=300&h=200&fit=crop"
        ],
        details: [
          "Optimize product images (can increase conversions by 27%)",
          "Improve checkout flow (reduce abandonment by 18%)",
          "Add social proof (reviews increase purchases by 31%)",
          "Implement urgency indicators (limited time offers)",
          "Personalize product recommendations"
        ],
        link: "https://example.com/conversion-optimization",
        size: "large"
      },
      {
        title: "A/B Test Results",
        text: "Latest tests show new product page layout increased conversions by 15.3%.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&h=120&fit=crop",
        size: "small"
      },
      {
        title: "Performance Metrics",
        text: "Current conversion rate: 2.8%. Industry average: 3.1%. Room for 0.3% improvement.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop",
        size: "medium"
      }
    ]
  }
]; 