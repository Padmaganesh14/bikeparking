import React, { useState } from 'react';
import { exitVehicle } from '../services/api';

const ExitPage = () => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleNo.trim()) {
      setError('Please enter a vehicle number');
      return;
    }
    
    setLoading(true);
    setSuccess('');
    setError('');
    setReceipt(null);
    
    try {
      const res = await exitVehicle(vehicleNo);
      if (res.success) {
        setSuccess(res.message);
        setReceipt({
          fee: res.fee,
          hours: res.duration_hours,
          entryTime: res.entry_time,
          exitTime: res.exit_time
        });
        setVehicleNo('');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Failed to connect to server. Is PHP running on port 8000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Vehicle Exit</h2>
      
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vehicleNo">Vehicle Number</label>
          <input
            type="text"
            id="vehicleNo"
            className="form-control uppercase"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
            placeholder="e.g. MH12AB1234"
            disabled={loading}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Processing...' : 'Process Exit & Calculate Fee'}
        </button>
      </form>

      {receipt && (
        <div className="receipt-box">
          <h3>Payment Receipt</h3>
          <p>Duration: {receipt.hours} hour(s)</p>
          <div className="fee-display">₹{receipt.fee}</div>
          <p style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>
            Entry: {new Date(receipt.entryTime).toLocaleString()}<br/>
            Exit: {new Date(receipt.exitTime).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExitPage;
