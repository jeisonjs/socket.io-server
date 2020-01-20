import axios from "axios";

async function getAllCreditsByAavvId(body: any) {
    return await axios.post(
        'http://192.168.1.121:8080/payment/credits', 
        body, { headers: { 'Content-Type': 'application/json' } })
    .then(response => response.data)
}

export { getAllCreditsByAavvId }