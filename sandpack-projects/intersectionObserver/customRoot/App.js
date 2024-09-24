import React from "react";
import "./styles.css";

function App() {
  const observedElemRef = React.useRef();
  const rootRef = React.useRef();
  const [isBalloonVisible, setIsBalloonVisible] = React.useState(false);

  React.useEffect(() => {
    const callback = (entries) => {
      const [entry] = entries;
      setIsBalloonVisible(entry.isIntersecting);
    };

    const options = {
      root: rootRef.current,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(observedElemRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrapper">
      <div ref={rootRef} className="scrollArea">
        <div className="scrollContent">
          <p>
            Scroll down till you see the balloon and have an eye on the balloon's
            size as you scroll!
          </p>
          <img
            ref={observedElemRef}
            src="{{HOSTNAME}}/images/balloon.png"
            width={60}
            height={60}
            className={`balloon ${isBalloonVisible ? "scaledUp" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
