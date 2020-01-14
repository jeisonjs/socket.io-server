import axios from "axios";

async function getAllCreditsByAavvId(aavvId: string | number) {
    return await axios.post('http://localhost:8000/payment/credits', { aavvId: 1 })
        .then(response => response.data)
}

export { getAllCreditsByAavvId }