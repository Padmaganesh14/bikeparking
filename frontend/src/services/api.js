import axios from 'axios';

const API_URL = 'https://bikeparking.kesug.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parkVehicle = async (vehicle_no) => {
  const response = await api.post('/entry.php?i=1', { vehicle_no });
  return response.data;
};

export const exitVehicle = async (vehicle_no) => {
  const response = await api.post('/exit.php?i=1', { vehicle_no });
  return response.data;
};

export const getAllVehicles = async () => {
  const response = await api.get('/vehicles.php?i=1');
  return response.data;
};
