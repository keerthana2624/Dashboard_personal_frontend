import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/pending-applications');
      if (response.ok) {
        const result = await response.json();
        setApplications(result);
      } else {
        setErrorMessage('Failed to fetch pending applications.');
      }
    } catch (error) {
      console.error('Error fetching pending applications:', error);
      setErrorMessage('Failed to fetch pending applications. Please try again later.');
    }
  };

  const handleApplication = async (applicationId, applicantEmail, action) => {
    try {
      console.log(applicationId);
      console.log(action);
      const response = await fetch('http://localhost:5000/api/admin/handle-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationId, applicantEmail, action }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Application processed:', result.message);
        fetchPendingApplications(); // Refresh the list after handling the application
      } else {
        const result = await response.json();
        console.error('Error processing application:', result.error);
        alert(result.error); // Show error message to the user
      }
    } catch (error) {
      console.error('Error in fetch request:', error);
      alert('Failed to process application. Please try again later.');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h3>Pending Applications</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="applications-list">
        {applications.map(application => (
          <div key={application.id} className="application-card">
            <p><span>Email:</span> {application.applicant_email}</p>
            <p><span>Personal Details:</span> {application.personal_details}</p>
            <p><span>Educational Background:</span> {application.educational_background}</p>
            <p><span>Statement of Purpose:</span> {application.statement_of_purpose}</p>
            <div className="buttons-container">
              <button 
                className="approve-button" 
                onClick={() => handleApplication(application.id, application.applicant_email, 'approve')}
              >
                Approve
              </button>
              <button 
                className="reject-button" 
                onClick={() => handleApplication(application.id, application.applicant_email, 'reject')}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
