// src/components/Application.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Application.css';  // Import the CSS file

const Application = () => {
  const location = useLocation();
  const { course } = location.state || {};
  const [applicationData, setApplicationData] = useState({
    personalDetails: '',
    educationalBackground: '',
    statementOfPurpose: '',
    applicantEmail: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course?.id,
          ...applicationData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setFormSubmitted(true);
        setApplicationData({
          personalDetails: '',
          educationalBackground: '',
          statementOfPurpose: '',
          applicantEmail: '',
        });
        
      } else {
        const result = await response.json();
        setErrorMessage(result.error || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrorMessage('Failed to submit application. Please try again later.');
    }
  };

  return (
    <div className="application-form">
      <h3>Apply for {course?.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Personal Details:
          <textarea
            name="personalDetails"
            value={applicationData.personalDetails}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Educational Background:
          <textarea
            name="educationalBackground"
            value={applicationData.educationalBackground}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Statement of Purpose (if applicable):
          <textarea
            name="statementOfPurpose"
            value={applicationData.statementOfPurpose}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="applicantEmail"
            value={applicationData.applicantEmail}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Submit Application</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      {formSubmitted && (
        <div className="confirmation-message">
          <h3>Thank you for your application!</h3>
          <p>Your application has been submitted successfully. You will receive an email confirmation with your application reference number shortly.</p>
        </div>
      )}
    </div>
  );
};

export default Application;
