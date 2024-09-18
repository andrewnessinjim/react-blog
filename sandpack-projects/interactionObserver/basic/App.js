import React from "react";
import "./styles.css";

function App() {
  const observedElemRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(() => {
        console.log("Interesting");
    });

    observer.observe(observedElemRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrapper">
      <p>Scroll down till you see the present and have eye on the console logs as you scroll!</p>
      <p ref={observedElemRef} className="observedElement">
        🎁
      </p>
    </div>
  );
}

export default App;
