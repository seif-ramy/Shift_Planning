const cds = require('@sap/cds');
const {
    readSFSF_Manager,
    readSFSF_User ,
    readSFSF_User_Photo
} = require('./lib/handlers');


module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        SFSF_Manager,
        SFSF_User,
        user_photo
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    this.on('READ', SFSF_Manager, readSFSF_Manager);
    this.on('READ', user_photo, readSFSF_User_Photo);
    this.on('READ', SFSF_User, readSFSF_User);
    



    // BEFORE events

    // AFTER events
});
