import axios from 'axios';

// const baseurl = "http://192.168.137.1:5000";
const baseurl = 'http://localhost:8087';

// Creating backend config
const Api = axios.create({
  baseURL: baseurl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data',
  },
};

const jsonConfig = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

export const imagePath = baseurl + '/images/';

// register user
export const registerUser = async (data) => {
  return Api.post('/user/register', data);
};

// login user
export const loginUser = async (data) => {
  return Api.post('/user/login', data);
};

// add instrument
export const addInstrument = async (data) => {
  return Api.post('/instrument/add', data, jsonConfig);
};

// save image
export const saveImage = async (data) => {
  return Api.post('/instrument/save', data, config);
};

// get all instruments
export const getInstruments = async () => {
  return Api.get('/instrument/all', jsonConfig);
};

// get instrument by id
export const getInstrumentById = async (id) => {
  return Api.get(`/instrument/get/${id}`, jsonConfig);
};

// add rent
export const addRent = async (data) => {
  return Api.post('/rental/rent', data, jsonConfig);
};

// get rent buy user id
export const getRentByUserId = async (id) => {
  return Api.get(`/rental/user/${id}`, jsonConfig);
};

// get all rent
export const getAllRent = async () => {
  return Api.get('/rental/all', jsonConfig);
};

// get user added instruments
export const getUserInstruments = async () => {
  return Api.get('/instrument/added', jsonConfig);
};

// change instrument added status
export const changeInstrumentStatus = async (id) => {
  return Api.put(`/instrument/change/${id}`, jsonConfig);
};

// return instrument
export const returnInstrument = async (id) => {
  return Api.put(`/rental/return/${id}`, jsonConfig);
};

// payment
export const addPayment = async (data) => {
  return Api.post(`/payment/add`, data, jsonConfig);
};

// verify
export const verifyPayment = async (data, id) => {
  return Api.put(`/payment/verify/${id}`, data, jsonConfig);
};

//  notification
export const addNotification = async (data) => {
  return Api.get('/send-notification', data, jsonConfig);
};
