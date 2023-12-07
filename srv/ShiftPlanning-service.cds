using ECEmploymentInformation as ECEI_API from '../srv/external/ECEmploymentInformation.csn';

namespace shift.planning.service;

service ShifPlan @(path : '/shiftplanning') {
    
    @readonly
    entity SFSF_Manager as
        select from ECEI_API.EmpJob {
             managerId,
             userId
        };

    annotate SFSF_Manager with @(cds.odata.valuelist);
}
