 import { useEffect, useState } from "react";

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);

  const fetchData = () => {
    fetch("https://bikeparking.kesug.com/api/vehicles.php?i=1")
      .then(res => res.json())
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={fetchData}>Refresh</button>

      {vehicles.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Vehicle No</th>
              <th>Status</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, index) => (
              <tr key={index}>
                <td>{v.vehicle_no}</td>
                <td>{v.status}</td>
                <td>{v.entry_time}</td>
                <td>{v.exit_time || "—"}</td>
                <td>{v.fee || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
