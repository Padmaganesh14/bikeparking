import axios from 'axios';

const API_URL = 'http://localhost/bike-parking/backend/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parkVehicle = async (vehicle_no) => {
  const response = await api.post('/entry.php', { vehicle_no });
  return response.data;
};

export const exitVehicle = async (vehicle_no) => {
  const response = await api.post('/exit.php', { vehicle_no });
  return response.data;
};

export const getAllVehicles = async () => {
  const response = await api.get('/vehicles.php');
  return response.data;
};
