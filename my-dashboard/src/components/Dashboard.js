// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // You can create a CSS file for styling

const Dashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Applications Dashboard</h2>
      <ul className="application-list">
        {applications.map(application => (
          <li key={application.id} className="application-item">
            <div className="application-details">
              <h3>{application.course_name}</h3>
              <p>Status: {application.status}</p>
              {application.status === 'approved' ? (
                <button>Proceed to Payment</button>
              ) : (
                <p>Application Rejected</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;









