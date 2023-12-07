const cds = require('@sap/cds');
const {
    readSFSF_Manager
    // ,read_Specific_Manager
} = require('./lib/handlers');


module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        SFSF_Manager
        // ,SFSF_Specific_Manager_Employees
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    this.on('READ', SFSF_Manager, readSFSF_Manager);
    // this.on('READ', SFSF_Specific_Manager_Employees, read_Specific_Manager);



    // BEFORE events

    // AFTER events
});
