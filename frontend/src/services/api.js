import axios from 'axios';

const API_URL = 'https://bikeparking.kesug.com/backend';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Entry
export const parkVehicle = async (vehicle_no) => {
  const response = await api.post('/entry.php', { vehicle_no });
  return response.data;
};

// ✅ Exit
export const exitVehicle = async (vehicle_no) => {
  const response = await api.post('/exit.php', { vehicle_no });
  return response.data;
};

// ✅ Get Vehicles
export const getAllVehicles = async () => {
  const response = await api.get('/vehicles.php');
  return response.data;
};
