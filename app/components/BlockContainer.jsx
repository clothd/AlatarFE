import React from "react";
import { motion } from "framer-motion";
import { Bar, Line, Doughnut } from "react-chartjs-2";
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

const sizeStyles = {
  large: {
    minWidth: 370,
    maxWidth: 420,
    minHeight: 340,
    padding: 20,
    fontSize: 14
  },
  medium: {
    minWidth: 320,
    maxWidth: 370,
    minHeight: 220,
    padding: 24,
    fontSize: 14
  },
  small: {
    minWidth: 260,
    maxWidth: 320,
    minHeight: 120,
    padding: 16,
    fontSize: 10
  },
  wide: {
    minWidth: 420,
    maxWidth: 500,
    minHeight: 120,
    padding: 20,
    fontSize: 12
  }
};

// Function to generate chart data from details or text
function extractChartData(details, text) {
  const data = { labels: [], values: [] };
  if (details && details.length > 0) {
    details.forEach(line => {
      const match = line.match(/([^:()]+)[(:]?\s*(\d+(?:\.\d+)?)/);
      if (match) {
        data.labels.push(match[1].replace(/\s*\(.*/, '').trim());
        data.values.push(parseFloat(match[2]));
      }
    });
  } else if (text) {
    const lines = text.split('\n').filter(Boolean);
    lines.forEach(line => {
      const match = line.match(/([^:()]+)[(:]?\s*(\d+(?:\.\d+)?)/);
      if (match) {
        data.labels.push(match[1].replace(/\s*\(.*/, '').trim());
        data.values.push(parseFloat(match[2]));
      }
    });
  }
  return data.labels.length > 0 ? data : null;
}

function getChartType(title, text) {
  const t = (title + ' ' + (text || '')).toLowerCase();
  if (t.includes('conversion') || t.includes('rate')) return 'doughnut';
  if (t.includes('trend') || t.includes('sentiment')) return 'line';
  return 'bar';
}

function renderChartBlock({ title, details, text }) {
  const chartData = extractChartData(details, text);
  if (!chartData) return null;
  const chartType = getChartType(title, text);
  const chartConfig = {
    labels: chartData.labels,
    datasets: [{
      label: title,
      data: chartData.values,
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
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: chartType === 'bar' ? { y: { beginAtZero: true } } : {},
  };
  const style = { width: '100%', height: 80, marginBottom: 12 };
  if (chartType === 'bar') return <div style={style}><Bar data={chartConfig} options={chartOptions} /></div>;
  if (chartType === 'doughnut') return <div style={style}><Doughnut data={chartConfig} options={chartOptions} /></div>;
  return <div style={style}><Line data={chartConfig} options={chartOptions} /></div>;
}

export default function BlockContainer({ 
  title, 
  text, 
  image, 
  images, 
  details, 
  link, 
  expandedContent, 
  expanded = false, 
  onExpand, 
  onClose, 
  style, 
  borderColor = "#b388ff", 
  gradient, 
  size = "medium" 
}) {
  const s = sizeStyles[size] || sizeStyles.medium;
  
  // Modal/expanded styles
  if (expanded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        style={{
          position: "relative",
          minWidth: 420,
          maxWidth: 600,
          minHeight: 340,
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: 24,
          background: "#fff",
          boxShadow: "0 8px 48px 0 rgba(160,120,255,0.18)",
          padding: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          ...style
        }}
      >
        {/* X button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: 16,
            width: 32,
            height: 32,
            fontSize: 22,
            fontWeight: 700,
            color: "#a259ff",
            cursor: "pointer",
            boxShadow: "0 2px 8px #a259ff11"
          }}
          aria-label="Close"
        >
          ×
        </button>
        {/* Title */}
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: "#222" }}>{title}</div>
        {/* Expanded images or chart */}
        {expandedContent?.images && expandedContent.images.length > 0 && !renderChartBlock({ title, details: expandedContent.points, text: expandedContent.text }) && (
          <div style={{ display: "flex", gap: 16, marginBottom: 18, width: "100%", flexWrap: "wrap" }}>
            {expandedContent.images.map((img, i) => (
              <img key={i} src={img} alt={`expanded visual ${i + 1}`} style={{ width: 180, borderRadius: 14, objectFit: "cover", maxHeight: 120 }} />
            ))}
          </div>
        )}
        {renderChartBlock({ title, details: expandedContent?.points, text: expandedContent?.text })}
        {/* Expanded text */}
        {expandedContent?.text && (
          <div style={{ fontSize: 16, color: "#444", marginBottom: 18, lineHeight: 1.7 }}>{expandedContent.text}</div>
        )}
        {/* Expanded references/links */}
        {expandedContent?.references && expandedContent.references.length > 0 && (
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <div style={{ fontWeight: 600, color: "#a259ff", marginBottom: 6 }}>References:</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {expandedContent.references.map((ref, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: "#6ee7ff", textDecoration: "underline", fontSize: 15 }}>{ref.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    );
  }

  // Normal block (clickable to expand)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="block-container"
      style={{
        borderRadius: 20,
        background: "#fff",
        border: gradient
          ? `3px solid transparent`
          : `3px solid ${borderColor}`,
        backgroundImage: gradient
          ? `linear-gradient(#fff, #fff), ${gradient}`
          : undefined,
        backgroundOrigin: gradient ? "border-box" : undefined,
        backgroundClip: gradient ? "padding-box, border-box" : undefined,
        boxShadow: "0 4px 24px 0 rgba(160,120,255,0.08)",
        padding: s.padding,
        minWidth: s.minWidth,
        maxWidth: s.maxWidth,
        minHeight: s.minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        cursor: onExpand ? "pointer" : undefined,
        ...style
      }}
      onClick={() => {
        console.log('BlockContainer clicked:', title);
        console.log('onExpand function:', onExpand);
        console.log('expandedContent exists:', !!expandedContent);
        if (onExpand) {
          onExpand();
        }
      }}
    >
      {/* Single image support (legacy) */}
      {image && !images && (
        <img 
          src={image} 
          alt="block visual" 
          style={{ 
            width: "100%", 
            borderRadius: 16, 
            marginBottom: 18, 
            objectFit: "cover",
            height: size === "wide" ? 80 : 120
          }} 
        />
      )}
      
      {/* Multiple images or chart support */}
      {images && images.length > 0 && !renderChartBlock({ title, details, text }) && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: images.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: 8, 
          width: "100%", 
          marginBottom: 18 
        }}>
          {images.map((img, i) => (
            <img 
              key={i}
              src={img} 
              alt={`visual ${i + 1}`} 
              style={{ 
                width: "100%", 
                borderRadius: 12, 
                objectFit: "cover",
                height: 80,
                aspectRatio: "3/2"
              }} 
            />
          ))}
        </div>
      )}
      {renderChartBlock({ title, details, text })}
      
      <div style={{ 
        fontWeight: 700, 
        fontSize: s.fontSize + 2, 
        marginBottom: 10, 
        color: "#222" 
      }}>
        {title}
      </div>
      
      <div style={{ 
        fontSize: s.fontSize, 
        color: "#444", 
        marginBottom: details ? 12 : 0,
        lineHeight: 1.5
      }}>
        {text}
      </div>
      
      {/* Details list */}
      {details && (
        <ul style={{ 
          fontSize: s.fontSize - 1, 
          color: "#555", 
          margin: "0 0 16px 0",
          padding: "0 0 0 16px",
          lineHeight: 1.6
        }}>
          {details.map((detail, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {detail}
            </li>
          ))}
        </ul>
      )}
      
      {/* Learn more link */}
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            fontSize: s.fontSize,
            color: "#a259ff",
            textDecoration: "none",
            fontWeight: 600,
            marginTop: "auto",
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 16px",
            borderRadius: 20,
            background: "rgba(162, 89, 255, 0.08)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(162, 89, 255, 0.15)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(162, 89, 255, 0.08)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Learn more →
        </a>
      )}
    </motion.div>
  );
} 