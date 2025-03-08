import { useState, useEffect, useRef } from "react";

interface TypewriterEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  defaultWordPause?: number;
  firstWordPause?: number;
  className?: string;
}

export default function TypewriterEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 25,
  defaultWordPause = 3000,
  firstWordPause = 10000,
  className = "",
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeout = useRef<NodeJS.Timeout>();

  // Animation logic
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const typeCharacter = () => {
      // If we're pausing, don't do anything except wait for the pause to complete
      if (isPausing) {
        // Determine pause duration based on word index
        const pauseDuration =
          currentWordIndex === 0 ? firstWordPause : defaultWordPause;

        timeout.current = setTimeout(() => {
          setIsPausing(false);
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
      } else {
        // Typing characters
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }

      // Determine timing for next action
      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      // If word is complete, set pausing state
      if (!isDeleting && displayedText === currentWord) {
        setIsPausing(true);
        return; // Exit here to prevent scheduling another timeout
      }
      // If deletion is complete, move to next word
      else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }

      timeout.current = setTimeout(typeCharacter, typeSpeed);
    };

    // Start the typing animation
    timeout.current = setTimeout(typeCharacter, typingSpeed);

    // Clean up function
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [
    words,
    currentWordIndex,
    isDeleting,
    isPausing,
    displayedText,
    typingSpeed,
    deletingSpeed,
    defaultWordPause,
    firstWordPause, // Added to dependencies
  ]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1 className={className}>
      <span>{displayedText}</span>
      <span className="cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>
        _
      </span>
    </h1>
  );
}
