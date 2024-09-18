import React from "react";
import "./styles.css";

function App() {
  const observedElemRef = React.useRef();
  const rootRef = React.useRef();
  const [isPresentVisible, setIsPresentVisible] = React.useState(false);

  React.useEffect(() => {
    const callback = (entries) => {
      const [entry] = entries;
      setIsPresentVisible(entry.isIntersecting);
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
      {isPresentVisible && <p className="reactEmoji">😍</p>}
      <div ref={rootRef} className="scrollArea">
        <div className="scrollContent">
          <p>
            Scroll down till you see the present and have eye on the console
            logs as you scroll!
          </p>
          <p ref={observedElemRef} className="observedElement">
            🎁
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
