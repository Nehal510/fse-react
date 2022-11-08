import axios from "axios";
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
const BASE_URL = "https://fse-fall22-a3.herokuapp.com";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
//const BASE_URL = "http://localhost:4000";

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

export const createUser = (user) =>
  axios.post(`${BASE_URL}/users`, user)
    .then(response => response.data);

export const findAllUsers = () =>
  axios.get(`${BASE_URL}/users`)
    .then(response => response.data);

export const findUserById = (uid) =>
  axios.get(`${BASE_URL}/users/${uid}`)
    .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (uname) =>
  axios.delete(`${BASE_URL}/users/username/${uname}`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;