import React from "react";
import "./styles.css";
import Spinner from "./Spinner";

function App() {
  return (
    <div className="wrapper">
      <header className="header"></header>
      <Feeds />
    </div>
  );
}

function Feeds() {
  const [numFeeds, setNumFeeds] = React.useState(4);

  const [isLoading, setIsLoading] = React.useState(false);
  const endOfListElementRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMore();
      }
    });

    observer.observe(endOfListElementRef.current);

    return () => observer.disconnect();
  }, []);

  //Mimicking a network request
  function loadMore() {
    setIsLoading(true);
    window.setTimeout(() => {
      setNumFeeds((numFeeds) => numFeeds + 2);
      setIsLoading(false);
    }, Math.random() * 700 + 500);
  }

  return (
    <div className="feedsWrapper">
      {range(numFeeds).map((num) => {
        return (
          <div className="feed" key={num}>
            {num}
          </div>
        );
      })}
      <div className="spinnerWrapper">{isLoading && <Spinner />}</div>
      <div ref={endOfListElementRef}></div>
    </div>
  );
}

//Simplified version of the range function to serve the purpose of this example
const range = (end) => [...Array(end).keys()];

export default App;
