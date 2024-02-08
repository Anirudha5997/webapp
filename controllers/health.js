// curl -vvvv http://localhost:8000/api/v1healthz

const getServerStatus = require("../config/connStatus");

const getHealth = async (req, res) => {
    try {
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache', 
            //Pragma has been deprecated as of now 
            //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
            'X-Content-Type-Options': 'nosniff'
        })

        if(req.method !== "GET") return res.status(405).send();
        
        if(Object.keys(req.body).length !== 0) return res.status(400).send();   

        const isUp = await getServerStatus();  
        console.log("DATABASE CONNECTED : ",isUp);

        if(isUp) return res.status(200).send();
        
        res.status(503).send();
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getHealth
};