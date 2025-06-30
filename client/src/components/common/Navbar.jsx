import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ 
      backgroundColor: '#20643e',
      padding: '1em',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">ClubHub</span>
        </Link>
      </div>
      <div>
        {user?.role === "student" && (
          <>
            <Link to="/student/dashboard" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              Dashboard
            </Link>
            {/* <Link to="/student/events" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              Events
            </Link> */}
            <Link to="/student/history" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              History
            </Link>
            <Link to="/student/profile" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              Profile
            </Link>
          </>
        )}
        {user?.role === "host" && (
          <>
            <Link to="/host/dashboard" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              Dashboard
            </Link>
            {/* <Link to="/host/events" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              My Events
            </Link> */}
            <Link to="/host/events/create" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              Create Event
            </Link>
            <Link to="/host/profile" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '1em' }}>
              Profile
            </Link>
          </>
        )}
        {user && (
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#ffffff',
              color: '#20643e',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
