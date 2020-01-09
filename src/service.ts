import axios from "axios";

async function getAllCreditsByAavvId(aavvId: string | number) {
    return await axios.get(`https://jsonplaceholder.typicode.com/users/${aavvId}`).then(response => response.data)
}

export { getAllCreditsByAavvId }