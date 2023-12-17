using ECEmploymentInformation as ECEI_API from '../srv/external/ECEmploymentInformation.csn';
using ECTimeOff as TOff_API from '../srv/external/ECTimeOff.csn';


namespace shift.planning.service;

service ShifPlan @(path : '/shiftplanning',requires:'authenticated-user') {
    
    @readonly
    entity SFSF_Manager as
        select from ECEI_API.EmpJob {
             managerId,
             userId,
             '' as defaultFullName:String,
             '' as email:String,
             '' as division:String,
             '' as department:String,
             '' as title:String,
             '' as photo:String,
             '' as mimeType:String
        };

        @readonly
    entity day_Model as
        select from TOff_API.WorkScheduleDayModelAssignment {
             dayModel
        };
        
    annotate SFSF_Manager with @(cds.odata.valuelist);
    annotate day_Model with @(cds.odata.valuelist);
}
