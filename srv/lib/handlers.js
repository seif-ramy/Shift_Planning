const cds = require('@sap/cds');

let managerService = null;

(async function () {
    // Connect to external SFSF OData services
    managerService = await cds.connect.to('ECEmploymentInformation');
})();


/*** HANDLERS ***/

// Read Managers
async function readSFSF_Manager(req) {
    try {
        // Handover to the SF OData Service to fecth the requested data
        const tx = managerService.tx(req);
        let sf_managers = await tx.run(req.query);
        
        let sf_managers_array = []
        
        if (Array.isArray(sf_managers)){
            sf_managers_array = sf_managers
        }
        else {
            sf_managers_array[0] = sf_managers
        }
        return sf_managers_array
       
    } catch (err) {
        req.error(err.code, err.message);
    }
}









module.exports = {
    readSFSF_Manager
}
