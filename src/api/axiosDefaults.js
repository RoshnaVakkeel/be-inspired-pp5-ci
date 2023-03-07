import axios from "axios";

axios.defaults.baseURL = 'https://be-inspired-drf-api.herokuapp.com';
// axios.defaults.baseURL = 'https://8000-roshnavakke-beinspiredd-wcpa9838shu.ws-eu89.gitpod.io';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();