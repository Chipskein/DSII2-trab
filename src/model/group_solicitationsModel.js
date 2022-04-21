const { dbcon } = require("../database/connection");
class GroupSolicitationModel {
    constructor(userid,groupid,status='waiting') {
        this.userid = userid;
        this.groupid = groupid;
        this.status = status; // waiting || accepted || refused
    }
}

// DAO = DATA ACCESS OBJECT
class GroupSolicitationDAO {
    
}

module.exports = {
    GroupSolicitationModel,
    GroupSolicitationDAO
};