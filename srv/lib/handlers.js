const cds = require('@sap/cds');

let managerService = null;
let userService = null;
let userPhotoService = null;

let sf_managers_array = [];
let userIDs=[];
let updatedResults=[];

(async function () {
    // Connect to external SFSF OData services
    managerService = await cds.connect.to('ECEmploymentInformation');
    userService = await cds.connect.to('PLTUserManagement');
    userPhotoService = await cds.connect.to('photo');
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

//Get manager id from manager user name and return this manager id
 async function getManagerId(managerUserName) {
    console.log(managerUserName);

    let selectStatement = "$select=userId";
    console.log(selectStatement);

    const whereClause = `username eq '${managerUserName}'`;
    console.log(whereClause);

    let urlPath = `?${selectStatement}&$filter=${whereClause}`;
    console.log(urlPath);

    try {
        let managerId = await userService.send({
            method: "GET",
            path: urlPath
        });

        if (managerId.length > 0) {
            console.log("Success");
            console.log(managerId);
            const managerId_int = parseInt(managerId[0].userId, 10);
            console.log(managerId_int);
            return managerId_int;
        } else {
            console.log("Fail");
            return undefined; // or handle the absence of managerId as needed
        }
    } catch (error) {
        console.error("Error fetching managerId:", error);
        return undefined; // or handle the error as needed
    }
}

// Read Managers
async function readSFSF_Manager(req) {
    try {
        // Handover to the SF OData Service to fetch the requested data
        const dynamicManagerId = await getManagerId(req.user.id); // Use await here
        console.log(dynamicManagerId);
        if(dynamicManagerId==undefined){
            return;
        }

        const tx = managerService.tx(req);
        req.query.where({ managerId: dynamicManagerId });

        let sf_managers = await tx.run(req.query);

        if (Array.isArray(sf_managers)) {
            sf_managers_array = sf_managers;
        } else {
            sf_managers_array[0] = sf_managers;
        }

        userIDs = sf_managers_array.map((user) => user.userId);
        return sf_managers_array;
    } catch (err) {
        req.error(err.code, err.message);
    }
}

// Read SFSF users photos
async function readSFSF_User_Photo(req) {
    try {
        
        // Handover to the SF OData Service to fecth the requested data
        const tx = userPhotoService.tx(req);
        req.query.where({ userId: { in: userIDs},photoType: 1});
        let array = await tx.run(req.query);
        // Use map to create a new array with replaced "photo" properties
        updatedResults = array.map(entry => ({
       ...entry,
       photo: entry.photo.replace(/\r\n/g, ''),
      }));
        return updatedResults;
        
    } catch (err) {
        req.error(err.code, err.message);
    }
}

// Read SFSF users
async function readSFSF_User(req) {
    try {
        // Columns that are not sortable must be removed from "order by"
        req.query = removeColumnsFromOrderBy(req.query, ['defaultFullName']);

        // Handover to the SF OData Service to fetch the requested data
        const tx = userService.tx(req);
        req.query.where({ userId: { in: userIDs } });
        let sfsfUserData = await tx.run(req.query);

        // Merge with updatedResults based on user ID
        let mergedUserData = sfsfUserData.map(sfsfUser => {
           let updatedResult = updatedResults.find(updatedUser => updatedUser.userId === sfsfUser.userId);

            if (updatedResult) {
                return {
                    ...sfsfUser,
                    photo: updatedResult.photo,      // Assuming updatedResults has "photo" field
                    mimeType: updatedResult.mimeType  // Assuming updatedResults has "mimeType" field
                };
            } else {
                // Handle the case where no matching user is found in updatedResults
                return sfsfUser;
            }
        });

        return mergedUserData;

    } catch (err) {
        req.error(err.code, err.message);
    }
}



module.exports = {
    readSFSF_Manager,
    readSFSF_User_Photo,
    readSFSF_User
}
