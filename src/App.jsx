import { useState, useRef } from "react";
import styles from "./App.module.css";
import Project from "./components/Popup.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Work from "./components/Work.jsx";
import Clock from "./components/RetroClock.jsx";
import Wave from "react-wavify";

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [highestZIndex, setHighestZIndex] = useState(1000);
  const [isMuted, setIsMuted] = useState(false);

  const soundRef = useRef(new Audio("assets/mute_button.mp3"));
  soundRef.current.volume = 0.08; // set volume to 8%

  const playSound = () => {
    const sound = soundRef.current;
    sound.currentTime = 0;
    sound.play();
  };

  const openSection = useRef(new Audio("assets/openSection.mp3"));
  openSection.current.volume = 0.08; // set volume to 8%

  const playOpenSectionSound = () => {
    const sound = openSection.current;
    sound.currentTime = 0;
    sound.play();
  };

  const getNextZIndex = () => {
    const next = highestZIndex + 1;
    setHighestZIndex(next);
    return next;
  };

  const openPopup = () => {
    isMuted ? null : playOpenSectionSound(); // Play sound when opening popup
    setShowPopup(true);
    const z = getNextZIndex(); // Ensure the popup gets the next z-index
    setHighestZIndex(z);
  };

  const openAboutMe = () => {
    isMuted ? null : playOpenSectionSound(); // Play sound when opening popup
    setShowAboutMe(true);
    const z = getNextZIndex(); // Ensure the about me gets the next z-index
    setHighestZIndex(z);
  };

  const openWork = () => {
    isMuted ? null : playOpenSectionSound(); // Play sound when opening popup
    setShowWork(true);
    const z = getNextZIndex(); // Ensure the about me gets the next z-index
    setHighestZIndex(z);
  };

  return (
    <div className={styles.appWrapper}>
      <label className={styles.soundToggle}>
        <input
          type="checkbox"
          checked={!isMuted}
          onChange={() => setIsMuted((prev) => !prev)}
          onClick={isMuted ? playSound : null}
        />
        <span className={styles.toggleText}>
          {isMuted ? " Sound Off" : " Sound On"}
        </span>
      </label>
      <div className={styles.waveContainer}>
        <Wave
          className={styles.wave}
          fill="url(#gradient)"
          paused={false}
          options={{
            height: 50,
            amplitude: 20,
            speed: 0.3,
            points: 2,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#87CEEB" />
              <stop offset="100%" stopColor="#4682B4" />
            </linearGradient>
          </defs>
        </Wave>
      </div>
      {/*
      <div className={styles.dogVideo}>
        <video autoPlay loop muted className={styles.videoBackground}>
          <source src="/assets/dog_animation.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>*/}

      <div className={styles.homePage}>
        <div className={styles.header}>
          <h4 className={styles.headerTitle}>home</h4>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.clockContainer}>
            <Clock />
          </div>
          <h2 className={styles.introText}>
            Hi, <span className={styles.highlightName}>this is Aaryan.</span>
            <br />
            I'm a developer.
          </h2>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={() => openAboutMe()}>
              <img
                src="/assets/about.png"
                alt="About Me"
                className={styles.imageIcon}
              />
              <span className={styles.buttonText}>About Me</span>
            </button>
            <button className={styles.button} onClick={() => openWork()}>
              <img
                src="/assets/work.png"
                alt="Work"
                className={styles.imageIcon}
              />
              <span className={styles.buttonText}>Work</span>
            </button>
            <button className={styles.button} onClick={() => openPopup()}>
              <img
                src="/assets/tools.png"
                alt="Projects"
                className={styles.imageIcon}
              />
              <span className={styles.buttonText}>Tools</span>
            </button>
            <a
              href="/assets/industry_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.button}>
                <img
                  src="/assets/resume.png"
                  alt="Resume"
                  className={styles.imageIcon}
                />
                <span className={styles.buttonText}>Resume</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Popups outside the homePage box */}
      {showPopup && (
        <Project
          onClose={() => setShowPopup(false)}
          getNextZIndex={getNextZIndex}
          initialZIndex={highestZIndex}
          isMuted={isMuted}
        />
      )}
      {showAboutMe && (
        <AboutMe
          onClose={() => setShowAboutMe(false)}
          getNextZIndex={getNextZIndex}
          initialZIndex={highestZIndex}
          isMuted={isMuted}
        />
      )}
      {showWork && (
        <Work
          onClose={() => setShowWork(false)}
          getNextZIndex={getNextZIndex}
          initialZIndex={highestZIndex}
          isMuted={isMuted}
        />
      )}

      {/*This is for the contacts on the bottom*/}
      <div className={styles.contactContainer}>
        <a
          href="https://www.linkedin.com/in/aaryan-g-a75457280/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.button}>
            <img
              src="/assets/linkedin_circle.png"
              alt="Linkedin"
              className={styles.imageIcon}
            />
          </button>
        </a>
        <a href="mailto:agaur21@asu.edu">
          <button className={styles.button}>
            <img
              src="/assets/gmail.png"
              alt="Gmail"
              className={styles.imageIcon}
            />
          </button>
        </a>
        <a
          href="https://github.com/AaryanGaur"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.button}>
            <img
              src="/assets/github.png"
              alt="Github"
              className={styles.imageIcon}
            />
          </button>
        </a>
      </div>
    </div>
  );
}
