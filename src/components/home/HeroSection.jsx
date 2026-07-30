import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TOTAL_FRAMES = 300;

const WHATSAPP_NUMBER = "918129242208"; 
const WHATSAPP_MESSAGE = "Hello, I would like to know more about your honey.";

const CONTENT_DATA = {
  1: {
    subtitle: "NATURALLY PURE. NOTHING ADDED.",
    title: <>Pure Forest Honey,<br /> From Wayanad</>,
    description: "100% Natural Sidr Honey. No sugar. No adulteration. Trusted by 10,000+ families across India."
  },
  2: {
    subtitle: "100% RAW & UNPROCESSED",
    title: <>Harvested Safely,<br /> Bottled Fresh</>,
    description: "Rich in antioxidants, vitamins, and natural medicinal benefits straight from wild bee hives."
  }
};

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Hover States
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  // Active Content Section Index (1 or 2)
  const [activeContentKey, setActiveContentKey] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Scroll Progress 0.5 (50%) എത്തുമ്പോൾ സ്മൂത്ത് ആയി Key അപ്ഡേറ്റ് ചെയ്യുന്നു
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5 && activeContentKey !== 2) {
      setActiveContentKey(2);
    } else if (latest < 0.5 && activeContentKey !== 1) {
      setActiveContentKey(1);
    }
  });

  useEffect(() => {
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const paddedIndex = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `/frames/ezgif-frame-${paddedIndex}.webp`;
      images.push(img);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    const renderFrame = (index) => {
      const img = images[index - 1];
      if (img && img.complete && img.naturalWidth !== 0) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvasWidth;
          drawHeight = canvasWidth / imgRatio;
          offsetX = 0;
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          drawWidth = canvasHeight * imgRatio;
          drawHeight = canvasHeight;
          offsetX = (canvasWidth - drawWidth) / 2;
          offsetY = 0;
        }

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    if (images[0]) {
      images[0].onload = () => renderFrame(1);
      if (images[0].complete) renderFrame(1);
    }

    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(Math.round(latest));
    });

    return () => unsubscribe();
  }, [frameIndex]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleExploreClick = () => {
    navigate("/products");
  };

  const currentData = CONTENT_DATA[activeContentKey];

  return (
    <div ref={containerRef} style={{ position: "relative", height: "400vh", width: "100%" }}>
      {/* Sticky Screen Viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#e6ded5",
        }}
      >
        {/* Fullscreen Canvas Background */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />

        {/* Text Content Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            paddingLeft: "5%",
            paddingRight: "5%",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              color: "#3a2c20",
              pointerEvents: "auto",
            }}
          >
            {/* Framer Motion AnimatePresence - Ultra Smooth Transitions */}
            <div style={{ minHeight: "220px", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContentKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      letterSpacing: "2px",
                      color: "#7a5c43",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    {currentData.subtitle}
                  </p>

                  <h1
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      fontWeight: "700",
                      lineHeight: "1.1",
                      margin: "0 0 16px 0",
                      fontFamily: "serif",
                    }}
                  >
                    {currentData.title}
                  </h1>

                  <p
                    style={{
                      fontSize: "18px",
                      color: "#4a3b32",
                      lineHeight: "1.5",
                      marginBottom: "28px",
                    }}
                  >
                    {currentData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Buttons (Fixed position, stays stable) */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px" }}>
              <button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsPrimaryHovered(true)}
                onMouseLeave={() => setIsPrimaryHovered(false)}
                style={{
                  padding: "14px 28px",
                  borderRadius: "50px",
                  backgroundColor: isPrimaryHovered ? "#5d4430" : "#7a5c43",
                  color: "#ffffff",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: isPrimaryHovered
                    ? "0 6px 18px rgba(0,0,0,0.2)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                  transform: isPrimaryHovered ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                }}
              >
                Order via WhatsApp
              </button>

              <button
                onClick={handleExploreClick}
                onMouseEnter={() => setIsSecondaryHovered(true)}
                onMouseLeave={() => setIsSecondaryHovered(false)}
                style={{
                  padding: "14px 28px",
                  borderRadius: "50px",
                  border: "1px solid rgba(122, 92, 67, 0.4)",
                  backgroundColor: isSecondaryHovered
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(255, 255, 255, 0.7)",
                  color: "#7a5c43",
                  fontWeight: "600",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer",
                  transform: isSecondaryHovered ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isSecondaryHovered
                    ? "0 6px 18px rgba(0,0,0,0.08)"
                    : "none",
                  transition: "all 0.3s ease",
                }}
              >
                Explore Products →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
