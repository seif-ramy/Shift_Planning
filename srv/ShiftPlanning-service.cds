using ECEmploymentInformation as ECEI_API from '../srv/external/ECEmploymentInformation.csn';
using PLTUserManagement as UM_API from '../srv/external/PLTUserManagement.csn';

namespace shift.planning.service;

service ShifPlan @(path : '/shiftplanning') {
    
    @readonly
    entity SFSF_Manager as
        select from ECEI_API.EmpJob {
             managerId,
             userId
        };

    @readonly
    entity SFSF_User as
        select from UM_API.User {
            key userId,
                username,
                defaultFullName,
                email,
                division,
                department,
                title
        };

    annotate SFSF_Manager with @(cds.odata.valuelist);
    annotate SFSF_User with @(cds.odata.valuelist);
}
