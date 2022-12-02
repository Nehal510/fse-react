/*
import axios from "axios";
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
const BASE_URL = "https://fse-fall22-a3.herokuapp.com";
//const BASE_URL = "http://localhost:4000";
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/api/users`;


export const findAllTuits = () =>
  axios.get(`${TUITS_API}`)
    .then(response => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const findTuitByUser = (uid) =>
  axios.get(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);

export const createTuit = (uid, tuit) =>
  axios.post(`${TUITS_API}`, {...tuit, postedBy: uid})
    .then(response => response.data);

export const updateTuit = (tid, tuit) =>
  axios.post(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`)
    .then(response => response.data);
*/

import axios from "axios";
import TuitStats from "../components/tuits/tuit-stats";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const findTuitsByUser = (uid) =>
    api.get(`${TUITS_API}/users/${uid}`)
        .then(response => response.data);

export const createTuitByUser = (uid, tuit) =>
    api.post(`${TUITS_API}/${uid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findAllTuits = () =>
    api.get(`${TUITS_API}`)
        .then(response => response.data);

