const cds = require('@sap/cds');
const {
    readSFSF_Manager,
    getDayModels
} = require('./lib/handlers');


module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        SFSF_Manager,
        day_Model
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    this.on('READ', SFSF_Manager, readSFSF_Manager);
    this.on('READ', day_Model, getDayModels);
    



    // BEFORE events

    // AFTER events
});
