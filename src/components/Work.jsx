import { useRef, useState, useEffect } from "react";
import styles from "./Work.module.css";

export default function Work({
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
      x: width * 0.4,
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
        className={`${styles.workBox} ${
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
          zIndex: zIndex, // use zIndex state
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
          <h4 className={styles.title}>Work</h4>
        </div>
        <div className={styles.content}>
          <div className={styles.career}>
            <h4 className={styles.projectTitle}>CAREER</h4>
            <div className={styles.projectBody}>
              {/*Here we will write the content for the work*/}
              <a
                href="https://www.linkedin.com/company/amazon/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                <img
                  src="/assets/amazon.png"
                  alt="Amazon"
                  className={styles.imageIcon}
                />
              </a>
              <div className={styles.projectDescription}>
                <h5 className={styles.descriptionTitle}>
                  Upcoming Software Development Engineer Intern
                </h5>
                <p className={styles.paragraph}>
                  Upcoming software development engineer intern. More details
                  regarding this role will be posted in a few months.
                </p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.projectBody}>
              {/*Here we will write the content for the work*/}
              <a
                href="https://github.com/AaryanGaur/my_project"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                <img
                  src="/assets/duckie.jpeg"
                  alt="Github"
                  className={styles.imageIcon}
                />
              </a>
              <div className={styles.projectDescription}>
                <h5 className={styles.descriptionTitle}>
                  Reinforcement Learning Research Lab
                </h5>
                <p className={styles.paragraph}>
                  I worked on a research project focused on using reinforcement
                  learning to reduce fuel usage and carbon emissions. My role
                  involved running extensive simulations and designing a reward
                  function to train autonomous driving agents to adopt more
                  energy-efficient behaviors. It was a challenging but rewarding
                  experience, and our final results showed real promise for
                  applying reinforcement learning to sustainability.
                </p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.projectBody}>
              {/*Here we will write the content for the work*/}
              <a
                href="https://pi.education.asu.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                <img
                  src="/assets/pia.png"
                  alt="Principled Innovation Academy"
                  className={styles.imageIcon}
                />
              </a>
              <div className={styles.projectDescription}>
                <h5 className={styles.descriptionTitle}>
                  Current Student Facilitator
                </h5>
                <p className={styles.paragraph}>
                  Serve in a leadership role organizing large-scale events with
                  200–300 participants, including hackathons and community
                  workshops. Responsible for planning activities, coordinating
                  logistics, and training new facilitators to support future
                  events.
                </p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.projectBody}>
              {/*Here we will write the content for the work*/}
              <a
                href="https://www.nobroker.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                <img
                  src="/assets/nobroker.jpeg"
                  alt="NoBroker"
                  className={styles.imageIcon}
                />
              </a>
              <div className={styles.projectDescription}>
                <h5 className={styles.descriptionTitle}>
                  Former Data Analyst Intern
                </h5>
                <p className={styles.paragraph}>
                  Completed a short internship during freshman year focused on
                  analyzing the local housing market. Built basic regression
                  models and visualized trends using Python libraries like
                  Pandas. Presented key insights to the team through clear,
                  data-driven presentations.
                </p>
              </div>
            </div>
            <div className={styles.divider} />
            <h4 className={styles.projectTitle}>PERSONAL PROJECTS</h4>
            <div className={styles.projectBody}>
              {/*Here we will write the content for the work*/}
              <a
                href="https://github.com/AaryanGaur/Java-Chess-Engine"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                <img
                  src="/assets/ches_board.png"
                  alt="Chess Engine"
                  className={styles.imageIcon}
                />
              </a>
              <div className={styles.projectDescription}>
                <h5 className={styles.descriptionTitle}>
                  Java Chess Game Engine
                </h5>
                <p className={styles.paragraph}>
                  Built a fully functional chess game engine in Java,
                  implementing all standard chess rules and mechanics. Only used
                  standard libraries, no external dependencies. The engine
                  supports all chess moves, including castling and en passant,
                  castling, etc.
                </p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.projectBody}>
              {/*Here we will write the content for the work*/}
              <a
                href="https://aaryangaur.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                <img
                  src="/assets/website.png"
                  alt="Chess Engine"
                  className={styles.imageIcon}
                />
              </a>
              <div className={styles.projectDescription}>
                <h5 className={styles.descriptionTitle}>
                  This Portfolio Website!
                </h5>
                <p className={styles.paragraph}>
                  Built this portfolio website using React, CSS, and JavaScript.
                  It showcases my projects, skills, and experience in a visually
                  appealing way. The site is fully responsive and works well on
                  both desktop and mobile devices.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <h4 className={styles.projectTitle}>End Note</h4>
            <p className={styles.paragraph}>
                More projects are listed on my Github! I am always looking for new opportunities to learn and grow as a
                developer. If you have any interesting projects or ideas, feel free
                to reach out!
            </p>
        </div>
      </div>
    </>
  );
}
