import React from "react";
import "./styles.css";

function App() {
  const observedElemRef = React.useRef();
  const [isBalloonVisible, setIsBalloonVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsBalloonVisible(entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );

    observer.observe(observedElemRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrapper">
      <p>
        Scroll down till you see the balloon and have eye on the balloon's size!
      </p>
      <img
        ref={observedElemRef}
        src="{{HOSTNAME}}/images/balloon.png"
        width={60}
        height={60}
        className={`balloon ${isBalloonVisible ? "scaledUp" : ""}`}
      />
    </div>
  );
}

export default App;
