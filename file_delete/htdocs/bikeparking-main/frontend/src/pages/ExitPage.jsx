 import { useState } from "react";
import { apiFetch } from "../services/api";

function ExitPage() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleExit = async () => {
    if (!vehicleNo.trim()) return alert("Please enter a vehicle number.");
    
    setLoading(true);
    setReceipt(null);
    try {
      const data = await apiFetch("exit.php", {
        method: "POST",
        body: JSON.stringify({ vehicle_no: vehicleNo }),
      });
      
      if (data.success) {
        setReceipt(data);
        setVehicleNo("");
      } else {
        alert(data.message);
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
      <h1 className="card-title">💳 Vehicle Exit</h1>

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

      <button className="btn" onClick={handleExit} disabled={loading}>
        {loading ? "Calculating..." : "Exit Vehicle"}
      </button>

      {receipt && (
        <div className="receipt-box fade-in">
          <h3>Exit Summary</h3>
          <div className="fee-display">₹{receipt.fee}</div>
          <p>Total Duration: <strong>{receipt.duration_hours} hour(s)</strong></p>
          <p>Entry: {receipt.entry_time}</p>
          <p>Exit: {receipt.exit_time}</p>
          <div className="alert alert-success">Payment Received</div>
        </div>
      )}
    </div>
  );
}

export default ExitPage;
