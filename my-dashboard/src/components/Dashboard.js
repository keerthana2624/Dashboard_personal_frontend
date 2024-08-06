import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Make sure to update your CSS file

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
      const email = localStorage.getItem('email');
      console.log(email);
      try {
        const response = await fetch('http://localhost:5000/api/applications', {
          headers: { 'x-student-email': email }
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

    // Simulate payment confirmation
    alert('Payment processed successfully!');
    // Optionally, update the application status or redirect the user
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <div className="dashboard-container">
      <h2>Applications Dashboard</h2>

      <div className="application-lists">
        <div className="approved-applications">
          <h3>Approved Applications</h3>
          <ul>
            {approvedApplications.map((application) => (
              <li key={application.id} className="application-item">
                <div className="application-details">
                  <h4 className="course-name">{application.course_name}</h4>
                  <p className="status"><strong>Status:</strong> {application.status}</p>
                  <button onClick={() => setSelectedApplication(application)}>
                    Proceed to Payment
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rejected-applications">
          <h3>Rejected Applications</h3>
          <ul>
            {rejectedApplications.map((application) => (
              <li key={application.id} className="application-item">
                <div className="application-details">
                  <h4 className="course-name">{application.course_name}</h4>
                  <p className="status"><strong>Status:</strong> {application.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedApplication && (
        <div className="payment-section">
          <h3>Payment Section</h3>
          <div className="payment-options">
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
          <div className="payment-details">
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
          <button onClick={handlePayment} className="submit-payment">Submit Payment</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
