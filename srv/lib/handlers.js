const cds = require('@sap/cds');

let managerService = null;
let userService = null;
let userPhotoService = null;
let dayModelsService=null;

(async function () {
    // Connect to external SFSF OData services
    managerService = await cds.connect.to('ECEmploymentInformation');
    userService = await cds.connect.to('PLTUserManagement');
    userPhotoService = await cds.connect.to('photo');
    dayModelsService = await cds.connect.to('ECTimeOff');
})();

/*** HANDLERS ***/

//Get manager id from manager user name and return this manager id
 async function getManagerId(managerUserName) {
    

    let selectStatement = "$select=userId";

    const whereClause = `tolower(username) eq '${managerUserName.toLowerCase()}'`;

    let urlPath = `?${selectStatement}&$filter=${whereClause}`;

    try {
        let managerId = await userService.send({
            method: "GET",
            path: urlPath
        });

        if (managerId.length > 0) {
            const managerId_int = parseInt(managerId[0].userId, 10);
            return managerId_int;
        } else {
            return undefined; 
        }
    } catch (error) {
        console.error("Error fetching managerId:", error);
        return undefined; 
    }
}

// Read Managers and their corresponding users with users' photos
async function readSFSF_Manager(req) {
    try {
        const dynamicManagerId = await getManagerId(req.user.id); // Use await here
        // console.log(dynamicManagerId);
        if(dynamicManagerId==undefined){
            return;
        }

        //ba3d el if hena ana damen eni la2et manager
        const tx = managerService.tx(req);
        req.query.where({ managerId: dynamicManagerId });

        let sf_managers = await tx.run(req.query);

        //ba extract el user ids beto3 el users el taht el manager
        let userIDs = sf_managers.map((user) => user.userId);

        //mafeesh users taht el manager(aka hwa mesh manager ya3ni)
        if(userIDs.length==0){
           return;
        }
       
        //hena b2a ana sure eni ma3aya manager b users tahteeh
        //fa 3ayez b2a ageeb el users b kol el data beta3ethom men khelal el user ids el 3amaltelhom extract
       let selectStatement = "$select=userId,username,defaultFullName,email,division,department,title";
       
       const whereClause = userIDs.map((valObj) => `userId eq ${valObj}`).join(" or ");
       
       let urlPath = `?${selectStatement}&$filter=${whereClause}`;

    
       let users = await userService.send({
        method: "GET",
        path: urlPath
    });

    //hena b2a bageeb el User Photos 3ashan api mokhtalef el beyegebly el photos
      let selectStatementPhotos = "$select=userId,photo,mimeType";

      const whereClausePhotos = userIDs.map((valObj) => `userId eq ${valObj} and photoType eq 1`).join(" or ");
      
      let urlPathPhotos = `?${selectStatementPhotos}&$filter=${whereClausePhotos}`;
    
       let userPhotos = await userPhotoService.send({
        method: "GET",
        path: urlPathPhotos
    });
        
    //hena ba remove el \r\n from the base 64 of photo attribute
    let UserPhotosUpdated = userPhotos.map(entry => ({
        ...entry,
        photo: entry.photo.replace(/\r\n/g, ''),
            }));
        
           
    // Merge with users with their photos(merge two arrays users & UserPhotosUpdated) based on user ID
    let mergedUserData = users.map(sfsfUser => {
    let updatedResult = UserPhotosUpdated.find(updatedUser => updatedUser.userId === sfsfUser.userId);
 
             if (updatedResult) {
                 return {
                     ...sfsfUser,
                     photo: updatedResult.photo,
                     mimeType: updatedResult.mimeType
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

async function getDayModels(req) {
    try {
        const selectQuery = '$select=dayModel';
        const filterQuery = '$filter=dayModel ne null';
        const urlPathQuery = `?${selectQuery}&${filterQuery}`;

        //get all available day models with duplicates
        let dayModelsResponse = await dayModelsService.send({
            method: "GET",
            path: urlPathQuery,
        });

        // Select distinct dayModel values directly from the response using reduce
        const distinctDayModels = dayModelsResponse.reduce((accumulator, item) => {
            if (!accumulator.some(entry => entry.dayModel === item.dayModel)) {
                accumulator.push({ dayModel: item.dayModel });
            }
            return accumulator;
        }, []);

        return distinctDayModels;
    
    } catch (error) {
        console.error('Error fetching and processing day models:', error);
        throw error;
    }
}

module.exports = {
    readSFSF_Manager,
    getDayModels
}
