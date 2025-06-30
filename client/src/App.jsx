import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import LoginStudent from "./pages/LoginStudent";
import SignupStudent from "./pages/SignupStudent";
import LoginHost from "./pages/LoginHost";
import SignupHost from "./pages/SignupHost";
import StudentDashboard from "./components/student/Dashboard";
import StudentProfile from "./components/student/Profile";
import StudentEventsList from "./components/student/EventsList";
import StudentHistory from "./components/student/History";
import HostDashboard from "./components/host/Dashboard";
import HostProfile from "./components/host/Profile";
import HostEventsList from "./components/host/EventsList";
import HostEventCreate from "./components/host/EventCreate";
import HostEventDetails from "./components/host/EventDetails";
import HostRegistrations from "./components/host/Registrations";
import NotFound from "./pages/NotFound";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* New Homepage as root route */}
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<LoginStudent />} />
        <Route path="/student/signup" element={<SignupStudent />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/events" element={<StudentEventsList />} />
        <Route path="/student/history" element={<StudentHistory />} />

        {/* Host Routes */}
        <Route path="/host/login" element={<LoginHost />} />
        <Route path="/host/signup" element={<SignupHost />} />
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/profile" element={<HostProfile />} />
        <Route path="/host/events" element={<HostEventsList />} />
        <Route path="/host/events/create" element={<HostEventCreate />} />
        <Route path="/host/events/:id" element={<HostEventDetails />} />
        <Route
          path="/host/events/:id/registrations"
          element={<HostRegistrations />}
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
