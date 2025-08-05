import { useRef, useState, useEffect } from "react";
import styles from "./Popup.module.css";

export default function Popup({
  onClose,
  getNextZIndex,
  initialZIndex,
  isMuted,
}) {
  const popupRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      x: width * 0.5,
      y: height * 0.1,
    };
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(initialZIndex);
  const [isClosed, setIsClosed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // run it once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // button sound
  const soundRef = useRef(new Audio("assets/button_sound.mp3"));
  soundRef.current.volume = 0.08; // set volume to 50%

  const playSound = () => {
    const sound = soundRef.current;
    sound.currentTime = 0;
    sound.play();
  };

  // close button sound
  const closeButton = useRef(new Audio("assets/close_button.mp3"));
  closeButton.current.volume = 0.08; // set volume to 8%

  const playCloseSound = () => {
    const sound = closeButton.current;
    sound.currentTime = 0;
    sound.play();
  };

  // handle closing
  const handleClose = () => {
    isMuted ? null : playCloseSound(); // play sound when closing
    setIsClosed(true);
  };

  // handle animation end
  const handleAnimationEnd = () => {
    if (isClosed) {
      onClose(); // call the onClose prop when the animation ends
    }
  };

  // handle z-index
  const bringToFront = () => {
    const newZ = getNextZIndex();
    setZIndex(newZ);
  };

  // When dragging starts
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = popupRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // When dragging moves
  const handleMouseMove = (e) => {
    if (isDragging) {
      bringToFront(); // bring to front when dragging starts
      document.body.style.userSelect = "none"; // disable text selection

      const box = popupRef.current.getBoundingClientRect();
      const boxWidth = box.width;
      const boxHeight = box.height;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      // Clamp X position
      newX = Math.max(0, Math.min(newX, windowWidth - boxWidth));
      // Clamp Y position
      newY = Math.max(0, Math.min(newY, windowHeight - boxHeight));

      setPosition({ x: newX, y: newY });
    }
  };

  // When dragging ends
  const handleMouseUp = () => {
    document.body.style.userSelect = "auto"; // re-enable text selection
    setIsDragging(false);
  };

  // Add/remove event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <>
      <div
        className={`${styles.popupBox} ${
          isMobile
            ? isClosed
              ? styles.animatePopupOutMobile
              : styles.animatePopupMobile
            : isClosed
            ? styles.animatePopupOut
            : styles.animatePopup
        }`}
        ref={popupRef}
        onAnimationEnd={handleAnimationEnd}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: zIndex,
        }}
      >
        <div className={styles.dragBar} onMouseDown={handleMouseDown}>
          <button className={styles.closeBtn} onClick={handleClose}>
            <img
              src="/assets/close.png"
              alt="Close"
              className={styles.closeIcon}
            />
          </button>
          <h4 className={styles.title}>Tools</h4>
        </div>
        <div className={styles.content}>
          <div className={styles.tools}>
            <h4 className={styles.contentTitle}>TOOLS AND FRAMEWORKS</h4>
            <div className={styles.toolsList}>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Github
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                VS Code
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                AWS
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Docker
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Linux
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Tableau
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                IntelliJ
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                React
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Next.js
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Pandas
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                TensorFlow
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                PyTorch
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Numpy
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                MongoDB
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                MySQL
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Spring Boot
              </button>
            </div>
          </div>
          <div className={styles.progLanguages}>
            <h4 className={styles.contentTitle}>PROGRAMMING LANGUAGES</h4>
            <div className={styles.languagesList}>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Java
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Python
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                C/C++
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                JavaScript
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                TypeScript
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                HTML/CSS
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                R
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                SQL
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Rust
              </button>
              <button
                className={styles.toolsButton}
                onMouseEnter={isMuted ? null : playSound}
              >
                Assembly(x86 and MIPS)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
