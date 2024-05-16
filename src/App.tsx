import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/NavBar";
import DonationPointsList from "./pages/PointsList/DonationPointsList";
import DonationPointForm from "./pages/CreatePoint/DonationPointForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/donationPointsList' element={<DonationPointsList />} />
        <Route path='/createDonationPoint' element={<DonationPointForm />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
