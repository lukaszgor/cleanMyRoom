import { BrowserRouter, Routes, Route, Link,useParams } from "react-router-dom"

// pages

import Login from "../pages/Login"
import Home from "../pages/Home"
import AddRoom from "../pages/AddRoom"
import Settings from "../pages/Settings"
import TaskManagerView from "../pages/TaskManagerView"
import Administration from "../pages/Administration"
import Services from "../pages/Services"
import WorkerHome from "../pages/WorkerHome"
import WorkerRoomView from "../pages/WorkerRoomView"
import WorkerClosedRoomContainer from "../pages/WorkerClosedRoomContainer"
import WorkerUserProfile from "../pages/WorkerUserProfile"
import AdminNewUser from "../pages/AdminNewUser"
import AdminUserDetails from "../pages/AdminUserDetails"

function Routing() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Add" element={<AddRoom />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Administration" element={<Administration />} />
        <Route path="/AdministWorkerHomeration" element={<WorkerHome />} />
        <Route path="/WorkerClosedRoomContainer" element={<WorkerClosedRoomContainer />} />
        <Route path="/WorkerUserProfile" element={<WorkerUserProfile />} />
        <Route path="/AdminNewUser" element={<AdminNewUser />} />
        <Route path="/UserDetails/:id" element={<AdminUserDetails />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/taskView/:id" element={<TaskManagerView />} />
        <Route path="/roomWorker/:id" element={<WorkerRoomView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
