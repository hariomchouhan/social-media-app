import axios from "axios";

const API = axios.create({baseURL: "http://localhost:7080"})

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)