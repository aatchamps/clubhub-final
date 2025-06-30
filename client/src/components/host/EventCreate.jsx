import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const EventCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    rules: "",
    venue: "",
    poster: null,
  });
  const [msg, setMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "poster") {
      const file = e.target.files[0];
      setForm({ ...form, poster: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    try {
      await axios.post("/events/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("Event created successfully!");
      setTimeout(() => navigate("/host/dashboard"), 1500);
    } catch (err) {
      setMsg("Creation failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#000000', 
      padding: '20px', 
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <h2 style={{ 
        color: '#20643e',
        animation: 'slideIn 0.5s ease',
        marginBottom: '30px',
        textAlign: 'center'
      }}>Create New Event</h2>

      {msg && (
        <div 
          className={msg.includes("failed") ? "error-message" : "success-message"}
          style={{ animation: 'fadeIn 0.3s ease', marginBottom: '20px' }}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.5s ease'
      }}>
        <div style={{ marginBottom: '20px' }}>
          {previewUrl && (
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'contain',
                borderRadius: '4px',
                marginBottom: '15px'
              }}
            />
          )}
          <label style={{ color: '#20643e', display: 'block', marginBottom: '5px' }}>
            Event Poster
          </label>
          <input
            name="poster"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#20643e', display: 'block', marginBottom: '5px' }}>
            Event Name
          </label>
          <input
            name="name"
            placeholder="Event Name"
            onChange={handleChange}
            required
            className="form-input"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#20643e', display: 'block', marginBottom: '5px' }}>
            Description
          </label>
          <textarea
            name="description"
            placeholder="Event Description"
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ color: '#20643e', display: 'block', marginBottom: '5px' }}>
              Date
            </label>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#20643e', display: 'block', marginBottom: '5px' }}>
              Venue
            </label>
            <input
              name="venue"
              placeholder="Event Venue"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={{ color: '#20643e', display: 'block', marginBottom: '5px' }}>
            Rules
          </label>
          <textarea
            name="rules"
            placeholder="Event Rules"
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <button 
          type="submit"
          className="ripple"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#20643e',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreate;
