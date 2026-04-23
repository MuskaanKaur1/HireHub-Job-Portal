import {BrowserRouter, Routes, Route} from "react-router-dom";
import Jobs from "./pages/Jobs.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AddJob from "./pages/AddJob.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyApplications from "./pages/MyApplications.jsx";
import ManageJobs from "./pages/ManageJobs.jsx";
import EditJob from "./pages/EditJob.jsx";



function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Jobs/>} />
        <Route path= "/register" element={<Signup/>} />
        <Route path= "/login" element={<Login/>} />
        <Route path= "/add-job" element={<AddJob/>} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/edit-job/:id" element={<EditJob />} />

        <Route path= "/jobs" element={ <ProtectedRoute> <Jobs/> </ProtectedRoute>} />
        <Route path= "/my-applications" element={ <ProtectedRoute> <MyApplications/> </ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;
