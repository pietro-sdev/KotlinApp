import axios from "axios";
const jwtToken = localStorage.getItem('token')
export default axios.create({
    baseURL:  'https://back-production-c632.up.railway.app',
    headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
    }
})