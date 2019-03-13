import axios from "axios";

const instance = axios.create({
 baseURL: "https://newburgerapp.firebaseio.com"
});

export default instance;
