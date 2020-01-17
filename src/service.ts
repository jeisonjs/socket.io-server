import axios from "axios";

async function getAllCreditsByAavvId(body: any) {
    return await axios.post(
        'http://api.vicander.local/payment/credits', 
        body, { 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
}

export { getAllCreditsByAavvId }