 import { useState } from "react";
import { apiFetch } from "../services/api";

function EntryPage() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEntry = async () => {
    if (!vehicleNo.trim()) return alert("Please enter a vehicle number.");
    
    setLoading(true);
    try {
      const data = await apiFetch("entry.php", {
        method: "POST",
        body: JSON.stringify({ vehicle_no: vehicleNo }),
      });
      alert(data.message);
      if (data.success) {
        setVehicleNo("");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">🚀 Vehicle Entry</h1>

      <div className="form-group">
        <label>Vehicle Number</label>
        <input
          type="text"
          className="form-control uppercase"
          placeholder="e.g. MH 12 AB 1234"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
        />
      </div>

      <button className="btn" onClick={handleEntry} disabled={loading}>
        {loading ? "Processing..." : "Add Vehicle"}
      </button>
    </div>
  );
}

export default EntryPage;
