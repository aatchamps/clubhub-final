import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const Registrations = () => {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`/attendance/${id}`);
        setRegistrations(response.data);
      } catch (err) {
        setError("Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, [id]);

  const handleToggle = async (regId) => {
    try {
      await axios.patch(`/attendance/toggle/${regId}`);
      const updated = await axios.get(`/attendance/${id}`);
      setRegistrations(updated.data);
    } catch (err) {
      setError("Failed to update attendance");
    }
  };

  const filtered = registrations.filter(
    (r) =>
      r.student.name.toLowerCase().includes(search.toLowerCase()) ||
      r.student.usn.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff'
    }}>Loading...</div>
  );

  return (
    <div style={{ backgroundColor: '#000000', padding: '20px', color: '#ffffff' }}>
      <h2 style={{ 
        color: '#20643e',
        animation: 'slideIn 0.5s ease',
        marginBottom: '30px'
      }}>Registrations & Attendance</h2>

      {error && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <input
          placeholder="Search by name or USN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '20px'
          }}
        />

        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "clamp(15px, 3vw, 30px)",
          width: "90%"
        }}>
          <div className="table-responsive">
            <table style={{
              width: '100%',
              overflowX: 'auto',
              borderCollapse: 'collapse',
              backgroundColor: '#ffffff',
              color: '#000000'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #20643e' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #20643e' }}>USN</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #20643e' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #20643e' }}>Attendance</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #20643e' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) => (
                  <tr key={reg._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{reg.student.name}</td>
                    <td style={{ padding: '12px' }}>{reg.student.usn}</td>
                    <td style={{ padding: '12px' }}>{reg.student.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        color: reg.attendance === 'P' ? '#20643e' : '#ff4444',
                        fontWeight: 'bold'
                      }}>
                        {reg.attendance === 'P' ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button 
                        onClick={() => handleToggle(reg._id)}
                        className="ripple"
                        style={{
                          backgroundColor: '#20643e',
                          color: '#ffffff',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Mark {reg.attendance === 'A' ? 'Present' : 'Absent'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#666'
          }}>
            No registrations found
          </div>
        )}
      </div>
    </div>
  );
};

export default Registrations;
