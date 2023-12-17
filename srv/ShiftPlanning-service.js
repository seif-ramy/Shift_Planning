const cds = require('@sap/cds');
const {
    readSFSF_Manager
} = require('./lib/handlers');


module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        SFSF_Manager
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    this.on('READ', SFSF_Manager, readSFSF_Manager);
    



    // BEFORE events

    // AFTER events
});
