import React from "react";
import "./styles.css";

function App() {
  const observedElemRef = React.useRef();
  const [isPresentVisible, setIsPresentVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsPresentVisible(entry.isIntersecting);
    });

    observer.observe(observedElemRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrapper">
      {isPresentVisible && <p className="reactEmoji">😍</p>}
      <p>
        Scroll down till you see the present and have eye on the top-left
        corner!
      </p>
      <p ref={observedElemRef} className="observedElement">
        🎁
      </p>
    </div>
  );
}

export default App;
