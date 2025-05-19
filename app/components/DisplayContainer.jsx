import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const spring = {
  type: "spring",
  stiffness: 600,
  damping: 30,
  mass: 0.7
};

// Media resources for different query types
const mediaResources = {
  'improve products': {
    type: 'video',
    url: 'https://www.youtube.com/embed/8tPnX7OPo0Q',
    title: 'Product Optimization Tips'
  },
  'reduce cart abandonment': {
    type: 'video',
    url: 'https://www.youtube.com/embed/jIM_vNtebM8',
    title: 'Cart Abandonment Solutions'
  },
  'marketing campaign': {
    type: 'image',
    url: '/images/holiday-campaign-flow.png',
    title: 'Holiday Campaign Strategy'
  },
  'trust signals': {
    type: 'image',
    url: '/images/trust-signals-infographic.png',
    title: 'Building Trust with Customers'
  },
  'social proof': {
    type: 'image',
    url: '/images/social-proof-examples.png',
    title: 'Social Proof Examples'
  },
  'conversion rate': {
    type: 'image',
    url: '/images/conversion-funnel.png',
    title: 'Conversion Rate Optimization'
  },
  'traffic analytics': {
    type: 'image',
    url: '/images/traffic-sources.png',
    title: 'Traffic Sources Overview'
  },
  'ad spend': {
    type: 'image',
    url: '/images/ad-performance-metrics.png',
    title: 'Ad Performance Metrics'
  }
};

// Function to generate chart data based on answer content
const generateChartData = (answer) => {
  if (!answer) return null;

  // Extract numbers and categories from the answer
  const lines = answer.split('\n').filter(line => line.trim());
  const data = {
    labels: [],
    values: []
  };

  lines.forEach(line => {
    const match = line.match(/([^:•]+):\s*(\d+(?:\.\d+)?)/);
    if (match) {
      data.labels.push(match[1].trim());
      data.values.push(parseFloat(match[2]));
    }
  });

  return data;
};

// Function to determine chart type based on content
const getChartType = (answer) => {
  if (answer.toLowerCase().includes('sales') || answer.toLowerCase().includes('revenue')) {
    return 'bar';
  } else if (answer.toLowerCase().includes('conversion') || answer.toLowerCase().includes('rate')) {
    return 'doughnut';
  } else {
    return 'line';
  }
};

// Function to get appropriate media resource
const getMediaResource = (question) => {
  const questionLower = question.toLowerCase();
  for (const [key, resource] of Object.entries(mediaResources)) {
    if (questionLower.includes(key)) {
      return resource;
    }
  }
  return null;
};

export default function DisplayContainer({ qa }) {
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  
  if (!qa) return null;
  
  const chartData = generateChartData(qa.answer);
  const chartType = getChartType(qa.answer);
  const mediaResource = getMediaResource(qa.question);
  
  const chartConfig = {
    labels: chartData?.labels || [],
    datasets: [{
      label: 'Value',
      data: chartData?.values || [],
      backgroundColor: [
        'rgba(162, 89, 255, 0.6)',
        'rgba(110, 231, 255, 0.6)',
        'rgba(255, 78, 205, 0.6)',
        'rgba(255, 184, 108, 0.6)',
      ],
      borderColor: [
        'rgba(162, 89, 255, 1)',
        'rgba(110, 231, 255, 1)',
        'rgba(255, 78, 205, 1)',
        'rgba(255, 184, 108, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: qa.question,
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartConfig} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartConfig} options={chartOptions} />;
      default:
        return <Line data={chartConfig} options={chartOptions} />;
    }
  };

  const renderMedia = () => {
    if (!mediaResource) return null;

    if (mediaResource.type === 'video') {
      return (
        <div style={{ width: "100%", height: 300, borderRadius: 12, overflow: "hidden" }}>
          <iframe
            width="100%"
            height="100%"
            src={mediaResource.url}
            title={mediaResource.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: 12 }}
          />
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", height: 300, borderRadius: 12, overflow: "hidden" }}>
          <img
            src={mediaResource.url}
            alt={mediaResource.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12
            }}
          />
        </div>
      );
    }
  };

  // Function to create structured content from the answer text
  const formatContent = (text) => {
    if (!text) return [];
    
    // Split by double newlines to get sections
    const sections = text.split('\n\n').filter(Boolean);
    
    return sections.map((section, idx) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/[•:]/g, '').trim();
      const items = lines.slice(1).filter(Boolean);
      
      return { title, items };
    });
  };

  const formattedContent = formatContent(qa.answer);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={spring}
      className="w-full max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1"
      style={{
        maxHeight: 250,
        width: "100%",
        maxWidth: 1520,
        margin: "0 auto",
        borderRadius: 30,
      }}
    >
      <motion.div
        layout
        className="w-full min-h-96 rounded-3xl bg-white p-6 flex flex-col md:flex-row gap-6 overflow-hidden"
        transition={spring}
        style={{
          width: "100%",
          height: 400,
          borderRadius: 26,
          background: "#fff",
          padding: 24,
          display: "flex",
          overflow: "hidden"
        }}
      >
        {/* Left Column - Content */}
        <motion.div 
          className="flex-1 flex flex-col overflow-y-auto pr-2"
          style={{ 
            overflowY: "auto",
            flex: "1 1 60%",
            maxHeight: "100%",
            paddingRight: 16
          }}
        >
          <motion.div
            layout
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg font-semibold mb-3 text-purple-600 border-b border-purple-100 pb-2"
            style={{ 
              fontSize: 17, 
              fontWeight: 600, 
              marginBottom: 12, 
              color: "#7c3aed",
              borderBottom: "1px solid #f3e8ff",
              paddingBottom: 8
            }}
          >
            {qa.question}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={qa.id + "-content"}
              className="flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {formattedContent.map((section, idx) => (
                <motion.div
                  key={`section-${idx}`}
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="mb-2"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-medium text-gray-800 text-sm">{section.title}</h3>
                  </div>
                  
                  <ul className="pl-5 space-y-0.5">
                    {section.items.map((item, itemIdx) => (
                      <li 
                        key={`item-${idx}-${itemIdx}`}
                        className="text-sm text-gray-600 flex items-start"
                        style={{ fontSize: 13 }}
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-purple-300 mt-1.5 mr-2"></span>
                        {item.replace(/^[•\-]\s*/g, '')}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Right Column - Chart or Media */}
        <motion.div 
          className="flex flex-col items-center"
          style={{ 
            flex: "0 0 40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <div style={{ width: "100%", height: 300 }}>
            {chartData && chartData.values.length > 0 ? renderChart() : renderMedia()}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}