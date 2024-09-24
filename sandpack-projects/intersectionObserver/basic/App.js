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
      <p>
        Scroll down till you see the balloon and have an eye on the console logs as
        you scroll!
      </p>
      <img
        ref={observedElemRef}
        src="{{HOSTNAME}}/images/balloon.png"
        width={60}
        height={60}
      />
    </div>
  );
}

export default App;
