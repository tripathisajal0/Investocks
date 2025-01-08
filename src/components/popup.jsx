import React, { useState } from 'react';
import img from '../Screenshot 2025-01-08 164448.png';

const Popup = ({ onClose }) => {
  const [action, setAction] = useState('');
  const [raiseRequest, setRaiseRequest] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
    transactionId: '',
    upiId: '',
    accountNo: '',
    ifscCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDepositClick = () => {
    setAction('deposit');
  };

  const handleWithdrawClick = () => {
    setAction('withdraw');
  };

  const handleRaiseRequestClick = () => {
    setRaiseRequest(true);
  };

  const handleSubmitRequest = () => {
    const { username, amount, transactionId } = formData;
    if (!username || !amount || !transactionId) {
      alert('Please fill all the required fields.');
      return;
    }
    alert('Request is raised. Money will be added in about 24 hours.');
    handleClose();
  };

  const handleWithdraw = () => {
    const { username, amount, accountNo, ifscCode } = formData;
    if (!username || !amount || !accountNo || !ifscCode) {
      alert('Please fill all the required fields.');
      return;
    }
    alert('Your money will be withdrawn within 24 hours.');
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setAction('');
    setRaiseRequest(false);
    setFormData({
      username: '',
      amount: '',
      transactionId: '',
      upiId: '',
      accountNo: '',
      ifscCode: '',
    });
  };

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <button onClick={handleClose} style={popupStyles.closeBtn}>X</button>
        <h3 style={popupStyles.title}>Wallet</h3>
        {action === '' && (
          <div style={popupStyles.buttonContainer}>
            <button onClick={handleDepositClick} style={buttonStyles}>Deposit Money</button>
            <button onClick={handleWithdrawClick} style={buttonStyles}>Withdraw Money</button>
          </div>
        )}
        {action === 'deposit' && !raiseRequest && (
          <div style={popupStyles.depositSection}>
            <h4>Deposit Money</h4>
            <img
              src={img}
              alt="QR Code"
              style={popupStyles.qrImage}
            />
            <button onClick={handleRaiseRequestClick} style={centeredButtonStyles}>
              Raise a Request
            </button>
          </div>
        )}
        {action === 'deposit' && raiseRequest && (
          <div style={popupStyles.raiseRequestSection}>
            <h4>Raise a Request</h4>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              value={formData.transactionId}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID (Optional)"
              value={formData.upiId}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <button onClick={handleSubmitRequest} style={centeredButtonStyles}>
              Submit
            </button>
          </div>
        )}
        {action === 'withdraw' && (
          <div style={popupStyles.withdrawSection}>
            <h4>Withdraw Money</h4>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="accountNo"
              placeholder="Account Number"
              value={formData.accountNo}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              value={formData.ifscCode}
              onChange={handleInputChange}
              style={inputStyles}
            />
            <button onClick={handleWithdraw} style={centeredButtonStyles}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for Popup component
const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#ff0000',
  },
  title: {
    marginBottom: '15px',
    color: '#007bff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  qrImage: {
    width: '180px',
    height: '180px',
    margin: '20px auto',
    display: 'block',
  },
  depositSection: {
    marginTop: '20px',
  },
  raiseRequestSection: {
    marginTop: '20px',
  },
  withdrawSection: {
    marginTop: '20px',
  },
};

// Styles for buttons
const buttonStyles = {
  padding: '12px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const centeredButtonStyles = {
  padding: '12px 20px',
  margin: '10px auto',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '80%',
};

const inputStyles = {
  padding: '12px',
  margin: '10px 0',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

export default Popup;
