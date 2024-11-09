import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');
  const [qrCode, setQRCode] = useState('');

  const genQR = async () => {
    console.log('Amount before parse:', amount);

    // ตรวจสอบว่า amount เป็นตัวเลขที่ถูกต้อง
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    try {
      const response = await axios.post('https://type001-qnan.vercel.app/api/QRcode', {
        amount: numericAmount,
      });
      console.log('Response:', response);
      setQRCode(response.data.Result);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Invalid request:', error.response.data.msg);
      } else {
        console.log('Request failed:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        id="amount"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={genQR}>Generate</button>
      {qrCode && (
        <img
          id="imgqr"
          src={qrCode}
          alt="QR Code"
          style={{ width: '500px', objectFit: 'contain' }}
        />
      )}
    </div>
  );
};

export default App
