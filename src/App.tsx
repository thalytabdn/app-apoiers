import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import DonationPointsList from "./pages/DonationPoints/DonationPointsList";
import Navbar from "./components/Navbar/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/donationPointsList' element={<DonationPointsList />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
