import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import styles from "./ReelsSection.module.css";

const reelsData = [
  {
    id: 1,
    videoUrl: "https://res.cloudinary.com/zu7jndeq/video/upload/Reel3_ufuglo.mp4",
    title: "100% Pure Forest Honey",
    likes: "2.4k",
  },
  {
    id: 2,
    videoUrl: "https://res.cloudinary.com/zu7jndeq/video/upload/Reel2_copy_wwqnz2.mp4",
    title: "Harvesting Fresh Honeycomb",
    likes: "5.1k",
  },
  {
    id: 3,
    videoUrl: "https://res.cloudinary.com/zu7jndeq/video/upload/Reel1_kpplcc.mp4",
    title: "Behind The Scenes at Wayanad",
    likes: "3.8k",
  },
];

export default function ReelsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef({});

  useEffect(() => {
    reelsData.forEach((reel, index) => {
      const video = videoRefs.current[reel.id];
      if (video) {
        if (index === activeIndex) {
          video.currentTime = 0; 
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reelsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reelsData.length) % reelsData.length);
  };

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.reelsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>
            <FaInstagram size={14} /> @wayanad.premium
          </span>
          <h2>Taste The Purity in Motion</h2>
          <p>Experience our natural honey harvesting journey through our latest Reels.</p>
        </div>

        {/* 3D Interactive Reel Cards */}
        <div className={styles.carouselContainer}>
          <div className={styles.cardsWrapper}>
            {reelsData.map((reel, index) => {
              const offset = (index - activeIndex + reelsData.length) % reelsData.length;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={reel.id}
                  className={`${styles.reelCard} ${isActive ? styles.activeCard : ""}`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    x: offset === 0 ? 0 : offset === 1 ? 220 : -220,
                    zIndex: isActive ? 10 : 5 - offset,
                    opacity: isActive ? 1 : 0.6,
                    rotateY: offset === 1 ? -15 : offset === reelsData.length - 1 ? 15 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={styles.videoBox}>
                    <video
                      ref={(el) => (videoRefs.current[reel.id] = el)}
                      src={reel.videoUrl}
                      loop
                      muted={isMuted}
                      playsInline
                      className={styles.video}
                    />

                    <div className={styles.overlay} />

                    {isActive && (
                      <>
                        <div className={styles.topBar}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMuted(!isMuted);
                            }}
                            className={styles.iconBtn}
                          >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlay(reel.id);
                            }}
                            className={styles.iconBtn}
                          >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                        </div>

                        <div className={styles.bottomDetails}>
                          <span className={styles.likes}>❤️ {reel.likes}</span>
                          <h4>{reel.title}</h4>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className={styles.navBtns}>
            <button onClick={handlePrev} className={styles.arrowBtn}>‹</button>
            <div className={styles.dots}>
              {reelsData.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ""}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
            <button onClick={handleNext} className={styles.arrowBtn}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}