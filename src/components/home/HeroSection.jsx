import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TOTAL_FRAMES = 300;

const WHATSAPP_NUMBER = "919000000000"; 
const WHATSAPP_MESSAGE = "ഹലോ, Sidr Honey-യെ കുറിച്ച് അറിയാൻ ആഗ്രഹമുണ്ട്.";

const CONTENT_DATA = {
  1: {
    subtitle: "100% RAW & UNPROCESSED",
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

  // Canvas Renderer
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
        const isMobile = window.innerWidth <= 768;

        const scale = Math.max(
          canvasWidth / img.naturalWidth,
          canvasHeight / img.naturalHeight
        );

        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;

        let offsetX, offsetY;

        if (isMobile) {
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
        {/* Canvas Background */}
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

        {/* Dynamic Text Overlay Layer Matching Image standard */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            alignItems: "flex-start",
            paddingTop: "clamp(105px, 15vh, 135px)",
            paddingLeft: "7%",
            paddingRight: "7%",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              pointerEvents: "auto",
            }}
          >
            <div style={{ minHeight: "220px", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContentKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <p
                    style={{
                      fontSize: "clamp(11px, 3.2vw, 13px)",
                      fontWeight: "600",
                      letterSpacing: "0.14em",
                      color: "#735c4a",
                      textTransform: "uppercase",
                      marginBottom: "14px",
                    }}
                  >
                    {currentData.subtitle}
                  </p>

                  <h1
                    style={{
                      fontSize: "clamp(2.1rem, 7.5vw, 3.2rem)",
                      fontWeight: "700",
                      lineHeight: "1.12",
                      margin: "0 0 16px 0",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      color: "#302319",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {currentData.title}
                  </h1>

                  <p
                    style={{
                      fontSize: "clamp(14px, 4vw, 16.5px)",
                      color: "#4e3f34",
                      fontWeight: "400",
                      lineHeight: "1.48",
                      marginBottom: "28px",
                      maxWidth: "96%",
                    }}
                  >
                    {currentData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Vertical Stacked Buttons Matching Reference */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "260px",
                marginTop: "4px",
              }}
            >
              <button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsPrimaryHovered(true)}
                onMouseLeave={() => setIsPrimaryHovered(false)}
                style={{
                  width: "100%",
                  padding: "15px 24px",
                  borderRadius: "32px",
                  backgroundColor: isPrimaryHovered ? "#5d422f" : "#74533a",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.25s ease",
                }}
              >
                Order via WhatsApp
              </button>

              <button
                onClick={handleExploreClick}
                onMouseEnter={() => setIsSecondaryHovered(true)}
                onMouseLeave={() => setIsSecondaryHovered(false)}
                style={{
                  width: "100%",
                  padding: "15px 24px",
                  borderRadius: "32px",
                  fontSize: "15px",
                  border: "1px solid rgba(116, 83, 58, 0.25)",
                  backgroundColor: isSecondaryHovered
                    ? "rgba(247, 244, 239, 0.95)"
                    : "rgba(247, 244, 239, 0.75)",
                  color: "#5e432f",
                  fontWeight: "500",
                  backdropFilter: "blur(12px)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.25s ease",
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
