// App.js
import React from "react";
import "./App.css";
import Adminpanel from "./pages/AdminPanel";
import Header from "./components/Header";


function App() {
  return (
    <div>
      <Header/>
      <Adminpanel />
    </div>
  );
}

export default App;
