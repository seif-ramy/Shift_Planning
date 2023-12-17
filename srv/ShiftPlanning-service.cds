using ECEmploymentInformation as ECEI_API from '../srv/external/ECEmploymentInformation.csn';
using PLTUserManagement as UM_API from '../srv/external/PLTUserManagement.csn';
using photo as photos_API from '../srv/external/photo.csn';

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
        
    annotate SFSF_Manager with @(cds.odata.valuelist);
}
