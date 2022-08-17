import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    setTours(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const removeTour = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (tours.length === 0) {
    return (
      <main>
        <div>
          <h2>No tours left</h2>
          <button onClick={getData} className="btn">
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="section">
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
