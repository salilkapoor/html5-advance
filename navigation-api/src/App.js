import React from "react";

import Location from "./components/location/Location";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h2>Navigation API</h2>
      <h4>Geo-Location related App</h4>

      <Location />
    </div>
  );
}
