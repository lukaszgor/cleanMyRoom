import { BrowserRouter, Routes, Route, Link,useParams } from "react-router-dom"

// pages

import Login from "../pages/Login"
import Home from "../pages/Home"
import AddRoom from "../pages/AddRoom"
import Settings from "../pages/Settings"
import TaskManagerView from "../pages/TaskManagerView"
import Administration from "../pages/Administration"
import Dictionaries from "../pages/Dictionaries"
import WorkerHome from "../pages/WorkerHome"
import WorkerRoomView from "../pages/WorkerRoomView"
function Routing() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Add" element={<AddRoom />} />
        <Route path="/Dictionaries" element={<Dictionaries />} />
        <Route path="/Administration" element={<Administration />} />
        <Route path="/AdministWorkerHomeration" element={<WorkerHome />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/taskView/:id" element={<TaskManagerView />} />
        <Route path="/roomWorker/:id" element={<WorkerRoomView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
