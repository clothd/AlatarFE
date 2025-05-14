import React from "react";
import { motion } from "framer-motion";

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

export default function BlockContainer({ 
  title, 
  text, 
  image, 
  images, 
  details, 
  link, 
  style, 
  borderColor = "#b388ff", 
  gradient, 
  size = "medium" 
}) {
  const s = sizeStyles[size] || sizeStyles.medium;
  
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
        ...style
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
      
      {/* Multiple images support */}
      {images && images.length > 0 && (
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