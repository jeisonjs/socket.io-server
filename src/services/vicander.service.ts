import axios from "axios";

async function getAllCreditsByAavvId(body: any) {
    return await axios.post(
        `${process.env.VICANDER_API}/payment/credits`, 
        body, { headers: { 'Content-Type': 'application/json' } })
    .then(response => response.data)
}

export { getAllCreditsByAavvId }