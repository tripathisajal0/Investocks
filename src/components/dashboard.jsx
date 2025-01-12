

import React, { useState, useEffect } from 'react';
import './dash.css'; // Add CSS for styling
import Popup from './popup'; // Import the Popup component

const Dashboard = ({ userName }) => {
  const [investmentData, setInvestmentData] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]); // State for storing transaction data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  // Fetch investment and transaction data based on username
  useEffect(() => {
    const fetchData = async () => {
      if (!userName) return; // Exit if username is not available

      try {
        // Fetching investment data
        const investmentResponse = await fetch(`https://api.sheetbest.com/sheets/2b8ac7bf-14b2-43ca-8a70-077ada351198/tabs/UsernamesAndPasswords`);
        const investmentData = await investmentResponse.json();

        // Find the user data based on the username (trim spaces from the keys)
        const userData = investmentData.find(user => user['Username '] === userName);

        if (userData) {
          setInvestmentData(userData);
        } else {
          console.log('User not found');
        }

        // Fetching transaction history data
        const transactionResponse = await fetch(`https://api.sheetbest.com/sheets/2b8ac7bf-14b2-43ca-8a70-077ada351198/tabs/${userName}`);
        const transactionData = await transactionResponse.json();

        // Sort the transaction history by date (assuming 'Date' is a string in the format 'YYYY-MM-DD' or can be converted)
        const sortedTransactions = transactionData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

        // Get the most recent 10 transactions
        const recentTransactions = sortedTransactions.slice(0, 10);

        setTransactionHistory(recentTransactions);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchData();
  }, [userName]); // Depend on username, so refetch when it changes

  // Function to toggle popup visibility
  const handleWalletClick = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      
      <header className="dashboard-header">
        <div className="header-message">Welcome, {userName}</div>
        <div className="header-buttons">
          <button
            className="button"
            onClick={handleWalletClick}>
            Wallet
          </button>
          <button
            className="button">
            Logout
          </button>
        </div>
      </header>


      {/* Investment Overview */}
      <section className="investment-overview">
        <div className="investment-card">
          <h2 style={{ color:'#007bff'}} className="section-title"><strong>Investment Overview</strong></h2>
          <br />
          {loading ? (
            <p>Loading user's data...</p> // Show loading state while data is being fetched
          ) : investmentData ? (
            <>
              <p>Total Investment: ₹{investmentData['Total Investment']}</p>
              <p>Total Portfolio Value: ₹{investmentData['Total Portfolio Value']}</p>
              <p>Total P&amp;L: <span style={{ color: 'green' }}>₹{investmentData['Total P&L']}</span></p>
              <p>Today's P&amp;L: ₹{investmentData['Today\'s P&L'] || 0}</p>
            </>
          ) : (
            <p>User not found!</p> // Show message if user data is not found
          )}
        </div>
      </section>
        {/* Messages */}
        <section style={{ padding: '20px', backgroundColor: '#f0f8ff' }}>
            <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <strong><h3 style={{ color:'#007bff'}}>Messages</h3></strong><br />
              <p>Note: Your portfolio is performing well. Keep growing! Portfolio entries may fluctuate as not updated properly yet.</p>
            </div>
          </section>


      {/* Transaction History */}
      <section className="transaction-history">
        <div className="transaction-card">
          <h3  style={{ color:'#007bff'}} className="section-title"><strong>Transaction History</strong></h3>
          <br />
          {loading ? (
            <p>Loading transaction history...</p> // Show loading state while transaction data is being fetched
          ) : (
            <div className="table-wrapper">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.Date}</td>
                      <td>{transaction.Time}</td>
                      <td>{transaction.Type}</td>
                      <td>₹{transaction.Amount}</td>
                      <td>{transaction.Remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Popup for Wallet */}
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default Dashboard;
