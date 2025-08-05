import { useRef, useState, useEffect } from "react";
import styles from "./AboutMe.module.css";

export default function AboutMe({
  onClose,
  getNextZIndex,
  initialZIndex,
  isMuted,
}) {
  const aboutMeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      x: width * 0.1,
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

  // handle dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = aboutMeRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // mouse dragging
  const handleMouseMove = (e) => {
    if (isDragging) {
      bringToFront(); // bring to front when dragging starts
      document.body.style.userSelect = "none"; // disable text selection

      const box = aboutMeRef.current.getBoundingClientRect();
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

  // mouse moving
  const handleMouseUp = () => {
    document.body.style.userSelect = "auto";
    setIsDragging(false);
  };

  // add/remove event listeners
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
        className={`${styles.aboutMeBox} ${
          isMobile
            ? isClosed
              ? styles.animatePopupOutMobile
              : styles.animatePopupMobile
            : isClosed
            ? styles.animatePopupOut
            : styles.animatePopup
        }`}
        ref={aboutMeRef}
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
          <h4 className={styles.title}>About Me</h4>
        </div>
        <div className={styles.content}>
          <div className={styles.profileHeader}>
            <img
              src="/assets/pfp.PNG"
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>Aaryan Gaur</h1>
              <div className={styles.profileRole}>
                Software Developer
                <p className={styles.upcomingRole}>
                  Upcoming intern at{" "}
                  <a
                    href="https://www.linkedin.com/company/amazon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.companyLink}
                  >
                    Amazon
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <p>
            Hi! I'm Aaryan, a passionate developer and lifelong student. I...
          </p>
          <ul className={styles.skillList}>
            <li>create new software projects from scratch</li>
            <li>work through bugs patiently</li>
            <li>write basic backend APIs like the one on this website</li>
            <li>
              recreate existing technologies to learn how they operate better
            </li>
            <li>read a lot of code...often times more than I write</li>
            <li>
              have a lot of patience and love learning even when it gets
              frustrating
            </li>
          </ul>
          <p>
            If you're interested in working with me or getting to know me, shoot
            me an email at{" "}
            <a href="mailto:agaur21@asu.edu" className={styles.companyLink}>
              agaur21@asu.edu
            </a>
          </p>
          <h2 className={styles.bodyHeader}>EDUCATION</h2>
          <div className={styles.educationPart}>
            <div className={styles.verticalBar}></div>
            <div className={styles.educationContent}>
              <h3 className={styles.educationTitle}>
                Arizona State University
              </h3>
              <h4 className={styles.educationDetails}>
                Bachelor of Science in Computer Science
                <br />
                <span className={styles.educationDate}>
                  {" "}
                  Expected Graduation: May 2026
                </span>
              </h4>
            </div>
          </div>
          <div className={styles.interestsContainer}>
            <h2 className={styles.bodyHeader}>INTERESTS</h2>
            <ul className={styles.interestList}>
              <li>learning new languages (human and coding)</li>
              <li>music, be it playing or listening</li>
              <li>playing board games or video games</li>
              <li>watching movies</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
