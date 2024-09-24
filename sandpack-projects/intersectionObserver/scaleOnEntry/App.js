import React from "react";
import "./styles.css";

function App() {
  const observedElemRef = React.useRef();
  const [isBalloonVisible, setIsBalloonVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsBalloonVisible(entry.isIntersecting);
    });

    observer.observe(observedElemRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrapper">
      <p>
        Scroll down till you see the balloon and have an eye on the balloon's size!
      </p>
      <img
        ref={observedElemRef}
        src="http://localhost:3000/images/balloon.png"
        width={60}
        height={60}
        className={isBalloonVisible ? "scaledUp" : "normal"}
      />
    </div>
  );
}

export default App;
