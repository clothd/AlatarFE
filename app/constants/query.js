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
          "/images/conversion-funnel.svg",
          "/images/trust-signals-infographic.svg"
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
          ],
          chainedQueries: [
            {
              question: "How can I reduce shipping times further?",
              text: "To reduce shipping times, consider partnering with local couriers and optimizing your warehouse locations.",
              points: [
                "Negotiate faster delivery SLAs with carriers.",
                "Implement distributed warehousing.",
                "Use predictive analytics for inventory placement."
              ],
              images: ["/images/faster-shipping.svg"],
              video: { url: "https://www.youtube.com/embed/1Q8fG0TtVAY", title: "Reducing Shipping Delays" },
              references: [
                { label: "Logistics Optimization", url: "https://example.com/logistics-optimization" }
              ]
            },
            {
              question: "What are best practices for clear product descriptions?",
              text: "Clear product descriptions reduce returns and increase satisfaction. Use bullet points, high-res images, and size guides.",
              points: [
                "Highlight key features in bullets.",
                "Include multiple product images.",
                "Provide sizing and compatibility info."
              ],
              images: ["/images/product-description-best.svg"],
              video: { url: "https://www.youtube.com/embed/2Vv-BfVoq4g", title: "Writing Great Product Descriptions" },
              references: [
                { label: "Ecommerce Copywriting", url: "https://example.com/copywriting" }
              ]
            },
            {
              question: "How do I automate returns processing?",
              text: "Automating returns can cut costs and improve customer experience. Use return portals and automated refund triggers.",
              points: [
                "Set up a self-service return portal.",
                "Automate refund approvals for eligible items.",
                "Integrate returns data with inventory."
              ],
              images: ["/images/automated-returns.svg"],
              video: { url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", title: "Returns Automation" },
              references: [
                { label: "Returns Automation Guide", url: "https://example.com/returns-automation" }
              ]
            }
          ]
        },
        size: "large"
      },
      {
        title: "Customer Sentiment",
        text: "Check out some of our most popular items and their current prices. A great way to boost your sales is to offer products that are in high demand. Here are some suggestions for you used by the most succssful owners. Here are some of your most popular products:",
        expandedContent: {
          text: "Discover our trending products, handpicked for quality and value. These items are loved by our customers and come with exclusive offers. Here are some suggestions for you used by the most succssful owners",
          shopItems: [
            {
              name: "Minimalist Chair",
              price: "$199.99",
              image: "https://imgs.search.brave.com/Dj5x5mwGNP1PxX0N2wEMwOuvI9ZgQEICRq0eAeRYm-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MzE2NDI2L3Bob3Rv/L3NvYXAuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPW9GQi1f/dnNFWGU4cjQyLXpv/eXhjWVljVU9wb2Jm/VWZZd2xXMUE0RW44/VHc9"
            },
            {
              name: "Modern Lamp",
              price: "$89.99",
              image: "https://imgs.search.brave.com/Dj5x5mwGNP1PxX0N2wEMwOuvI9ZgQEICRq0eAeRYm-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MzE2NDI2L3Bob3Rv/L3NvYXAuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPW9GQi1f/dnNFWGU4cjQyLXpv/eXhjWVljVU9wb2Jm/VWZZd2xXMUE0RW44/VHc9"
            },
            {
              name: "Cozy Sofa",
              price: "$499.99",
              image: "https://imgs.search.brave.com/Dj5x5mwGNP1PxX0N2wEMwOuvI9ZgQEICRq0eAeRYm-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MzE2NDI2L3Bob3Rv/L3NvYXAuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPW9GQi1f/dnNFWGU4cjQyLXpv/eXhjWVljVU9wb2Jm/VWZZd2xXMUE0RW44/VHc9"
            }
          ],
          fadedText: "Would you like to see more products?"
        },
        size: "medium"
      },
      {
        title: "Support Trends",
        text: "40% increase in support tickets in Q4. Here are some of the most common issues we've seen and how to solve them. Click here to see the full report.",
        images: [
          "/images/traffic-sources.svg",
          "/images/trust-signals-infographic.svg"
        ],
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
          },
          chainedQueries: [
            {
              question: "How can I further reduce ticket resolution time?",
              text: "Implement AI-powered chatbots and improve agent training to reduce resolution time.",
              points: [
                "Deploy chatbots for common issues.",
                "Provide regular training for support agents.",
                "Use ticket triage automation."
              ],
              images: ["/images/ai-support-bot.svg"],
              video: { url: "https://www.youtube.com/embed/7QUtEmBT_-w", title: "AI in Customer Support" }
            },
            {
              question: "What are the most common refund reasons?",
              text: "The most common refund reasons are late delivery, damaged items, and incorrect products.",
              points: [
                "Late delivery: 42% of refunds.",
                "Damaged items: 31% of refunds.",
                "Incorrect products: 18% of refunds."
              ],
              images: ["/images/refund-reasons.svg"],
              video: { url: "https://www.youtube.com/embed/8ZcmTl_1ER8", title: "Reducing Refunds" }
            },
            {
              question: "How do I increase self-service support usage?",
              text: "Promote your help center and add interactive FAQs to increase self-service support usage.",
              points: [
                "Highlight help center in navigation.",
                "Add video tutorials to FAQs.",
                "Use pop-up tips for common issues."
              ],
              images: ["/images/self-service-support.svg"],
              video: { url: "https://www.youtube.com/embed/9bZkp7q19f0", title: "Self-Service Support" }
            }
          ]
        },
        size: "small"
      },
      {
        title: "Quick Wins",
        text: "Implement express shipping options and improve product descriptions for immediate impact. Click here to see some of the most succssful owners who have implemented express shipping and their results. You can ask in the chat me to help you implement these changes.",
        images: [
          "/images/ad-performance-metrics.svg",
          "/images/holiday-campaign-flow.svg"
        ],
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
          },
          chainedQueries: [
            {
              question: "How do I implement express shipping?",
              text: "To implement express shipping, partner with fast carriers and update your checkout options. Click here to see some of the most succssful owners who have implemented express shipping and their results.",
              points: [
                "Negotiate express rates with carriers.",
                "Add express option to checkout page.",
                "Promote express shipping in marketing."
              ],
              images: ["/images/express-shipping.svg"],
              video: { url: "https://www.youtube.com/embed/1Q8fG0TtVAY", title: "Express Shipping Setup" }
            },
            {
              question: "What makes a product page more effective?",
              text: "Effective product pages use high-quality images, clear CTAs, and trust signals like reviews.",
              points: [
                "Use at least 5 product images.",
                "Add customer reviews and ratings.",
                "Highlight free returns and guarantees."
              ],
              images: ["/images/effective-product-page.svg"],
              video: { url: "https://www.youtube.com/embed/2Vv-BfVoq4g", title: "Product Page Optimization" }
            },
            {
              question: "How do I communicate return policies better?",
              text: "Communicate return policies with clear banners and FAQ sections on product pages.",
              points: [
                "Add a returns banner above the fold.",
                "Include a link to the full policy.",
                "Summarize key points in FAQs."
              ],
              images: ["/images/return-policy-banner.svg"],
              video: { url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", title: "Return Policy Communication" }
            }
          ]
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
          ],
          chainedQueries: [
            {
              question: "How do I increase add-to-cart rates?",
              text: "Increase add-to-cart rates by improving product images, adding clear CTAs, and using urgency messaging.",
              points: [
                "Use high-res, zoomable images.",
                "Highlight limited stock.",
                "Place CTAs above the fold."
              ],
              images: ["/images/add-to-cart-boost.svg"],
              video: { url: "https://www.youtube.com/embed/1Q8fG0TtVAY", title: "Boosting Add-to-Cart" }
            },
            {
              question: "What urgency tactics work best?",
              text: "Countdown timers, low-stock warnings, and flash sales are effective urgency tactics.",
              points: [
                "Add countdown timers to product pages.",
                "Show low-stock alerts.",
                "Run limited-time flash sales."
              ],
              images: ["/images/urgency-tactics.svg"],
              video: { url: "https://www.youtube.com/embed/2Vv-BfVoq4g", title: "Urgency Tactics" }
            },
            {
              question: "How do I personalize recommendations?",
              text: "Personalize recommendations using browsing history, purchase data, and AI algorithms.",
              points: [
                "Show related products based on cart.",
                "Use AI to suggest trending items.",
                "Segment recommendations by user type."
              ],
              images: ["/images/personalized-recommendations.svg"],
              video: { url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", title: "Personalization in E-commerce" }
            }
          ]
        },
        size: "large"
      },
      {
        title: "A/B Test Results",
        text: "Latest tests show new product page layout increased conversions by 15.3%. Click here to see some of the most succssful owners who have implemented express shipping and their results. Click here to see a few other tests I've run and their results.",
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
          },
          chainedQueries: [
            {
              question: "How do I design better A/B tests?",
              text: "Design better A/B tests by isolating variables and running tests for at least 2 weeks.",
              points: [
                "Test one change at a time.",
                "Ensure statistical significance.",
                "Use control and variant groups."
              ],
              images: ["/images/ab-test-design.svg"],
              video: { url: "https://www.youtube.com/embed/1Q8fG0TtVAY", title: "A/B Test Design" }
            },
            {
              question: "What metrics should I track in A/B tests?",
              text: "Track conversion rate, bounce rate, and average order value in A/B tests.",
              points: [
                "Monitor conversion rate changes.",
                "Check bounce rate for each variant.",
                "Compare average order value."
              ],
              images: ["/images/ab-test-metrics.svg"],
              video: { url: "https://www.youtube.com/embed/2Vv-BfVoq4g", title: "A/B Test Metrics" }
            },
            {
              question: "How do I interpret A/B test results?",
              text: "Interpret results by looking for statistical significance and considering external factors.",
              points: [
                "Use a significance calculator.",
                "Account for seasonality.",
                "Validate with follow-up tests."
              ],
              images: ["/images/ab-test-interpret.svg"],
              video: { url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", title: "Interpreting A/B Results" }
            }
          ]
        },
        size: "small"
      },
      {
        title: "Performance Metrics",
        text: "Current conversion rate: 2.8%. Industry average: 3.1%. Room for 0.3% improvement. Did you know that 68% of customers abandon their cart because of slow loading? Click here to see some of the most succssful owners who have implemented express shipping and their results. You can ask in the chat me to help you implement these changes.",
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
          },
          chainedQueries: [
            {
              question: "How do I improve mobile conversion rates?",
              text: "Improve mobile conversion rates by simplifying checkout and optimizing page speed.",
              points: [
                "Reduce checkout steps to 2 or fewer.",
                "Compress images for faster load times.",
                "Use mobile-friendly payment options."
              ],
              images: ["/images/mobile-conversion.svg"],
              video: { url: "https://www.youtube.com/embed/1Q8fG0TtVAY", title: "Mobile Conversion Tips" }
            },
            {
              question: "What causes high checkout abandonment?",
              text: "High checkout abandonment is often caused by unexpected costs, required account creation, and slow loading.",
              points: [
                "Show all costs upfront.",
                "Allow guest checkout.",
                "Optimize checkout for speed."
              ],
              images: ["/images/checkout-abandonment.svg"],
              video: { url: "https://www.youtube.com/embed/2Vv-BfVoq4g", title: "Checkout Abandonment" }
            },
            {
              question: "How do I benchmark against competitors?",
              text: "Benchmark by comparing your conversion rates and checkout flow to top industry competitors.",
              points: [
                "Use industry reports for comparison.",
                "Analyze competitor checkout UX.",
                "Adopt best practices from leaders."
              ],
              images: ["/images/benchmarking.svg"],
              video: { url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", title: "Benchmarking Conversion" }
            }
          ]
        },
        size: "medium"
      }
    ]
  }
]; 