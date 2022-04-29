const { dbcon } = require("../database/connection");
class GroupMembersModel {
    constructor(userid,groupid,permissions) {
        this.userid = userid;
        this.groupid = groupid;
        this.permissions = permissions; // RW or R
    }
}

// DAO = DATA ACCESS OBJECT
class GroupMembersDAO {
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
            console.log('Error GroupMembersDAO.removeGroupMember',{ error });
        }
    }
    static async insertGroupMember(groupmember){
        const sql = `
            INSERT INTO group_members (userid,groupid,permissions) VALUES ($1,$2,$3)
            ON CONFLICT (userid,groupid) 
            DO 
            UPDATE 
            SET 
                participated_at=NOW(),
                exit_at=null,
                permissions=EXCLUDED.permissions,
                activated=true
            ;`
        ;
        
        
        
        const values = [groupmember.userid, groupmember.groupid,groupmember.permissions];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error GroupMembersDAO.insertGroupMember',{ error });
        }
    }
    static async getGroupMembers(groupid){
        const sql = `
            SELECT 
                gm.participated_at as userparticipated_at,
                gm.permissions as userpermissions,
                u.id as userid,
                u.name as username,
                u.img as userimg,
                u.email as useremail
            FROM 
                group_members gm 
                join users u on gm.userid=u.id and u.activated=true
            where 
                gm.groupid=$1 and
                gm.activated=true
        `;
        const values = [groupid];
        try {
            const response=await dbcon.query(sql, values);
            return response.rows;
        } catch (error) {
            console.log('Error GroupMembersDAO.getGroupMembers',{ error });
        }
    }
    static async getMemberPermissions(userid,groupid){
        const sql = "SELECT * FROM group_members gm WHERE gm.userid=$1 and gm.groupid=$2 and gm.activated=true;";
        const values = [userid,groupid];
        try {
            const response=await dbcon.query(sql, values);
            return response.rows[0];
        } catch (error) {
            console.log('Error GroupMembersDAO.verifyIfUserIsMember',{ error });
        }
    }
    static async verifyIfUserIsMember(userid,groupid){
        const sql = "SELECT * FROM group_members gm WHERE gm.userid=$1 and gm.groupid=$2 and gm.activated=true;";
        const values = [userid,groupid];
        try {
            const response=await dbcon.query(sql, values);
            if(response.rows.length>0) return true;
            else return false;
        } catch (error) {
            console.log('Error GroupMembersDAO.verifyIfUserIsMember',{ error });
        }
    }
}

module.exports = {
    GroupMembersModel,
    GroupMembersDAO
};