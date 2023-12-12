const cds = require('@sap/cds');
const { response } = require('express');

let managerService = null;
let userService = null;

let sf_managers_array = [];
let userIDs=[];

(async function () {
    // Connect to external SFSF OData services
    managerService = await cds.connect.to('ECEmploymentInformation');
    userService = await cds.connect.to('PLTUserManagement');
})();

/*** HELPERS ***/

// Remove the specified columns from the ORDER BY clause of a SELECT statement
function removeColumnsFromOrderBy(query, columnNames) {
    if (query.SELECT && query.SELECT.orderBy) {
        columnNames.forEach(columnName => {
            // Look for column in query and its respective index
            const element = query.SELECT.orderBy.find(column => column.ref[0] === columnName);
            const idx = query.SELECT.orderBy.indexOf(element);

            if (idx > -1) {
                // Remove column from oder by list
                query.SELECT.orderBy.splice(idx, 1);
                if (!query.SELECT.orderBy.length) {
                    // If list ends up empty, remove it from query
                    delete query.SELECT.orderBy;
                }
            }
        });
    }

    return query;
}


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
        
        userIDs = sf_managers_array.map(user => user.userId);
        //console.log(userIDs);
        return sf_managers_array
       
    } catch (err) {
        req.error(err.code, err.message);
    }
}

// Read SFSF users
async function readSFSF_User(req) {
    try {
        // Columns that are not sortable must be removed from "order by"
        req.query = removeColumnsFromOrderBy(req.query, ['defaultFullName']);

        // Handover to the SF OData Service to fecth the requested data
        const tx = userService.tx(req);
        req.query.where({ userId: { in: userIDs}});
        let array = await tx.run(req.query);
        //console.log(array);
        return await tx.run(req.query);
        
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
    readSFSF_Manager,
    readSFSF_User
    // read_Specific_Manager
}
