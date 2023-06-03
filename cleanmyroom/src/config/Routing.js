import { BrowserRouter, Routes, Route, Link,useParams } from "react-router-dom"

// pages

import Login from "../pages/Login"
import Home from "../pages/Home"
import AddRoom from "../pages/AddRoom"
import Settings from "../pages/Settings"


function Routing() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Add" element={<AddRoom />} />
        <Route path="/settings/:id" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
