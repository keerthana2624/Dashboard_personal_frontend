
// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // You can create a CSS file for styling

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [paymentOption, setPaymentOption] = useState('full');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    const fetchApplications = async () => {
        const email = localStorage.getItem('email'); // Get the stored email
        console.log(email);
      try {
        const response = await fetch('http://localhost:5000/api/applications', {
            headers: { 'x-student-email': email } // Send the email in request headers
          });
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


  const handlePayment = async () => {
    if (!selectedApplication) return;

    const { cardNumber, expiryDate, cvv } = paymentDetails;

    // Validate payment details
    if (!cardNumber || !expiryDate || !cvv) {
      alert('Please fill in all payment details.');
      return;
    }

    // Here, instead of processing payments, just simulate payment confirmation
    alert('Payment processed successfully!');
    // Optionally, you might want to update the application status or redirect the user
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  return (
    <div className="dashboard-container">
      <h2>Applications Dashboard</h2>
      <ul className="application-list">
        {applications.map((application) => (
          <li key={application.id} className="application-item">
            <div className="application-details">
              <h3>{application.course_name}</h3>
              <p>Status: {application.status}</p>
              {application.status === 'approved' ? (
                <button onClick={() => setSelectedApplication(application)}>
                  Proceed to Payment
                </button>
              ) : (
                <p>Application Rejected</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedApplication && (
        <div className="payment-section">
          <h3>Payment Section</h3>
          <div>
            <label>
              <input
                type="radio"
                name="paymentOption"
                value="full"
                checked={paymentOption === 'full'}
                onChange={() => setPaymentOption('full')}
              />
              Full Payment
            </label>
            <label>
              <input
                type="radio"
                name="paymentOption"
                value="plan"
                checked={paymentOption === 'plan'}
                onChange={() => setPaymentOption('plan')}
              />
              Payment Plan
            </label>
          </div>
          <div>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button onClick={handlePayment}>Submit Payment</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

