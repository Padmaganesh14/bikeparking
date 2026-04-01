import React, { useState, useEffect } from 'react';
import { getAllVehicles } from '../services/api';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getAllVehicles();
      if (res.success) {
        setVehicles(res.data);
      } else {
        setError(res.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Failed to connect to server. Is PHP running on port 8000?');
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.vehicle_no.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="card dashboard-card">
      <h2 className="card-title">Admin Dashboard</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <div className="dashboard-controls">
        <input 
          type="text" 
          placeholder="Search Vehicle No..." 
          className="form-control search-input uppercase"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="parked">Parked</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="table-responsive">
        {loading ? (
          <p style={{textAlign: 'center', padding: '2rem'}}>Loading data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((v) => (
                  <tr key={v.id}>
                    <td style={{fontWeight: 600}}>{v.vehicle_no}</td>
                    <td>{new Date(v.entry_time).toLocaleString()}</td>
                    <td>{v.exit_time ? new Date(v.exit_time).toLocaleString() : '-'}</td>
                    <td>{v.fee !== null ? `₹${v.fee}` : '-'}</td>
                    <td>
                      <span className={`status-badge status-${v.status}`}>
                        {v.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No vehicles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
