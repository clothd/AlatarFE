import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 600,
  damping: 30,
  mass: 0.7
};

// Sample dummy images for variety
const dummyImages = [
  "/api/placeholder/320/200",
  "/api/placeholder/240/180",
  "/api/placeholder/180/180",
  "/api/placeholder/280/150",
  "/api/placeholder/200/200"
];

export default function DisplayContainer({ qa }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!qa) return null;
  
  // Create dummy images array if needed
  const images = qa.images || 
    (qa.image ? [qa.image, ...dummyImages.slice(0, 2)] : 
    dummyImages.slice(0, 3));
  
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
                    <span className="text-purple-500">{section.icon}</span>
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
              
              {qa.graph && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 w-full"
                >
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg text-xs text-gray-500 font-medium text-center">
                    Interactive Graph Available
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Right Column - Images */}
        <motion.div 
          className="flex flex-col items-center"
          style={{ 
            flex: "0 0 40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center" 
          }}
        >
          <AnimatePresence mode="wait">
            {images && images.length > 0 && (
              <motion.div 
                className="relative rounded-xl overflow-hidden"
                style={{ width: "100%", maxWidth: 320 }}
              >
                <motion.div 
                  className="relative"
                  key={`img-active-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={images[activeImageIndex] || dummyImages[0]}
                    alt={`Visual ${activeImageIndex + 1}`}
                    style={{ 
                      width: "100%", 
                      height: "auto", 
                      maxHeight: 200,
                      objectFit: "cover",
                      borderRadius: 12
                    }}
                  />
                  
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
                      borderRadius: 12
                    }}
                  ></div>
                </motion.div>
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                      }}
                    >
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                      }}
                    >
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Thumbnail row */}
          {images && images.length > 1 && (
            <motion.div 
              className="flex gap-2 mt-3 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {images.map((img, idx) => (
                <motion.button
                  key={`thumb-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`rounded-md overflow-hidden ${idx === activeImageIndex ? 'ring-2 ring-purple-500' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: 40,
                    height: 40,
                    overflow: "hidden",
                    borderRadius: 6,
                    border: idx === activeImageIndex ? "2px solid #8b5cf6" : "none"
                  }}
                >
                  <img 
                    src={img || dummyImages[idx % dummyImages.length]} 
                    alt={`thumbnail ${idx}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
          
          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 w-full bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3"
            style={{
              marginTop: 16,
              width: "100%",
              background: "linear-gradient(to right, #f5f3ff, #eef2ff)",
              borderRadius: 12,
              padding: 12
            }}
          >
            <div className="flex justify-between items-center">
              <div className="text-xs font-medium text-purple-700" style={{ fontSize: 12, fontWeight: 500 }}>
                Performance
              </div>
              <div className="text-xs text-indigo-500" style={{ fontSize: 12 }}>
                +15%
              </div>
            </div>
            <div className="w-full bg-white/50 h-1.5 rounded-full mt-2" style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.5)" }}>
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: "65%", height: "100%", borderRadius: 999 }}></div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}