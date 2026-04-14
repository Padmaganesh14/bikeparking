import { useState } from "react";

function EntryPage() {
  const [vehicleNo, setVehicleNo] = useState("");

  const handleEntry = () => {
    fetch("https://bikeparking.kesug.com/backend/entry.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vehicle_no: vehicleNo })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setVehicleNo("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Vehicle Entry</h1>

      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNo}
        onChange={e => setVehicleNo(e.target.value)}
      />

      <button onClick={handleEntry}>Add Vehicle</button>
    </div>
  );
}

export default EntryPage;
