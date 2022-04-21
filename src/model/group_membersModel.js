const { dbcon } = require("../database/connection");
class GroupMemberModel {
    constructor(userid,groupid,permissions) {
        this.userid = userid;
        this.groupid = groupid;
        this.permissions = permissions; // RW or R
    }
}

// DAO = DATA ACCESS OBJECT
class GroupMemberDAO {
    static async removeGroupMember(userid,groupid){
        const sql = `
            UPDATE 
                group_members 
            SET
                exit_at=now(),
                activated=false
            WHERE 
                userid=$1 and
                groupid=$2
            ;
        `;
        const values = [userid,groupid];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error groupDAO.removeGroupMember',{ error });
        }
    }
    static async insertGroupMember(groupmember){
        const sql = "INSERT INTO public.group_members (userid,groupid,permissions) VALUES ($1,$2,$3);";
        const values = [groupmember.userid, groupmember.groupid,groupmember.permissions];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error groupDAO.insertGroupMember',{ error });
        }
    }
}

module.exports = {
    GroupMemberModel,
    GroupMemberDAO
};