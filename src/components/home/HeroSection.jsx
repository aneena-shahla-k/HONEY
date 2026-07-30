import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TOTAL_FRAMES = 300;

const WHATSAPP_NUMBER = "918129242208"; 
const WHATSAPP_MESSAGE = "Hi, I would like to know more about your honey.";

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
  const imagesRef = useRef([]);
  const animFrameId = useRef(null);
  const navigate = useNavigate();

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
  const [activeContentKey, setActiveContentKey] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Screen resolution check for adaptive placement
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5 && activeContentKey !== 2) {
      setActiveContentKey(2);
    } else if (latest < 0.5 && activeContentKey !== 1) {
      setActiveContentKey(1);
    }
  });

  // Mobile & Desktop Adaptive Canvas Renderer
  const renderFrame = (index) => {
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

    animFrameId.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      const img = imagesRef.current[index - 1];

      if (img && img.complete && img.naturalWidth !== 0) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const mobileView = window.innerWidth <= 768;

        const scale = Math.max(
          canvasWidth / img.naturalWidth,
          canvasHeight / img.naturalHeight
        );

        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;

        let offsetX, offsetY;

        if (mobileView) {
          offsetX = -(drawWidth - canvasWidth) * 0.85; 
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          offsetX = (canvasWidth - drawWidth) / 2;
          offsetY = (canvasHeight - drawHeight) / 2;
        }

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    });
  };

  useEffect(() => {
    const loadedImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const paddedIndex = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `/frames/ezgif-frame-${paddedIndex}.webp`;

      if (i === 1) {
        img.onload = () => renderFrame(1);
      }
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(Math.round(latest));
    });

    const handleResize = () => {
      renderFrame(Math.round(frameIndex.get()));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
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
    <div ref={containerRef} style={{ position: "relative", height: "300vh", width: "100%" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#e6ded5",
          WebkitTransform: "translateZ(0)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "block",
            zIndex: 1,
          }}
        />

        {/* Responsive Content Overlay Container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            // Desktop-ൽ vertical center, Mobile-ൽ top layout
            alignItems: isMobile ? "flex-start" : "center",
            paddingTop: isMobile ? "125px" : "0",
            paddingLeft: isMobile ? "6%" : "8%",
            paddingRight: isMobile ? "6%" : "8%",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              maxWidth: isMobile ? "100%" : "520px",
              color: "#3a2c20",
              pointerEvents: "auto",
            }}
          >
            <div style={{ minHeight: isMobile ? "auto" : "150px", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContentKey}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    style={{
                      fontSize: "clamp(10px, 2.5vw, 12px)",
                      fontWeight: "600",
                      letterSpacing: "2px",
                      color: "#6b4f38",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      marginTop: "0px",
                    }}
                  >
                    {currentData.subtitle}
                  </p>

                  <h1
                    style={{
                      fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                      fontWeight: "800",
                      lineHeight: "1.15",
                      margin: "0 0 10px 0",
                      fontFamily: "serif",
                      textShadow: "0 2px 10px rgba(255,255,255,0.4)",
                    }}
                  >
                    {currentData.title}
                  </h1>

                  <p
                    style={{
                      fontSize: "clamp(13px, 3.2vw, 15px)",
                      color: "#4a3b32",
                      lineHeight: "1.4",
                      marginBottom: "18px",
                      maxWidth: isMobile ? "100%" : "92%",
                      textShadow: "0 1px 5px rgba(255,255,255,0.5)",
                    }}
                  >
                    {currentData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "8px",
              }}
            >
              <button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsPrimaryHovered(true)}
                onMouseLeave={() => setIsPrimaryHovered(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "50px",
                  backgroundColor: isPrimaryHovered ? "#5d4430" : "#7a5c43",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
                  padding: "10px 20px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  border: "1px solid rgba(122, 92, 67, 0.4)",
                  backgroundColor: isSecondaryHovered
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(255, 255, 255, 0.8)",
                  color: "#7a5c43",
                  fontWeight: "600",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer",
                  transform: isSecondaryHovered ? "translateY(-2px)" : "translateY(0)",
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
