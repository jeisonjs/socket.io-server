import axios from "axios";

async function getAllCreditsByAavvId(body: any) {
    console.info(`connected ${process.env.VICANDER_API}/payment/credits`);
    
    return await axios.post(
        `${process.env.VICANDER_API}/payment/credits`, 
        body, { headers: { 'Content-Type': 'application/json' } })
    .then(response => response.data)
}

export { getAllCreditsByAavvId }