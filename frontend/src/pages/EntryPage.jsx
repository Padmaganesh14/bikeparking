import React, { useState } from 'react';
import { parkVehicle } from '../services/api';

const EntryPage = () => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleNo.trim()) {
      setError('Please enter a vehicle number');
      return;
    }
    
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      const res = await parkVehicle(vehicleNo);
      if (res.success) {
        setSuccess(res.message);
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
      <h2 className="card-title">Vehicle Entry</h2>
      
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
          {loading ? 'Processing...' : 'Record Entry'}
        </button>
      </form>
    </div>
  );
};

export default EntryPage;
