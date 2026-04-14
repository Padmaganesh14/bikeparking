import { useState } from "react";

function ExitPage() {
  const [vehicleNo, setVehicleNo] = useState("");

  const handleExit = () => {
    fetch("https://bikeparking.kesug.com/backend/exit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vehicle_no: vehicleNo })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(`Fee: ₹${data.fee}`);
        } else {
          alert(data.message);
        }
        setVehicleNo("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Vehicle Exit</h1>

      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNo}
        onChange={e => setVehicleNo(e.target.value)}
      />

      <button onClick={handleExit}>Exit Vehicle</button>
    </div>
  );
}

export default ExitPage;
