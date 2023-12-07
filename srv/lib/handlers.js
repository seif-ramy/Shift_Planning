const cds = require('@sap/cds');

let managerService = null;

let sf_managers_array = [];

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
        req.query.where({ managerId:"42000001"})
        let sf_managers = await tx.run(req.query);
        
        if (Array.isArray(sf_managers)){
            sf_managers_array = sf_managers
        }
        else {
            sf_managers_array[0] = sf_managers
        }
        
        const userIDs = sf_managers_array.map(user => user.userId);
        console.log(userIDs);
        return sf_managers_array
       
    } catch (err) {
        req.error(err.code, err.message);
    }
}

// async function read_Specific_Manager_Helper(desiredManagerId) {
//     try {
        
//         // Filter the results based on the desired managerId
//         const filteredUsers = sf_managers_array.filter(user => user.managerId === desiredManagerId);

//         // Extract user IDs from the filtered results
//         const userIDs = filteredUsers.map(user => user.userId);

//         return userIDs;

//     } catch (err) {
//         req.error(err.code, err.message);
//     }
// }


// async function read_Specific_Manager(req) {
//     const usersWithManagerId42000001 = await read_Specific_Manager_Helper("42000001");
//     console.log(usersWithManagerId42000001);
//     return usersWithManagerId42000001;
// }

module.exports = {
    readSFSF_Manager
    // read_Specific_Manager
}
