 import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("vehicles.php");
      if (res.success) {
        setVehicles(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.vehicle_no.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || v.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="card dashboard-card">
      <h1 className="card-title">📊 Admin Dashboard</h1>

      <div className="dashboard-controls">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by vehicle no..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="parked">Parked</option>
          <option value="paid">Paid</option>
        </select>
        
        <button className="btn" style={{ width: 'auto' }} onClick={fetchData} disabled={loading}>
          {loading ? "..." : "🔄 Refresh"}
        </button>
      </div>

      <div className="table-responsive">
        {filteredVehicles.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No vehicle records found.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Status</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Fee (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((v, index) => (
                <tr key={v.id || index}>
                  <td><strong>{v.vehicle_no}</strong></td>
                  <td>
                    <span className={`status-badge status-${v.status}`}>
                      {v.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(v.entry_time).toLocaleString()}</td>
                  <td>{v.exit_time ? new Date(v.exit_time).toLocaleString() : "—"}</td>
                  <td>{v.fee ? `₹${v.fee}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
