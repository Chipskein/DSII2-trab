const { dbcon } = require("../database/connection");
class GroupSolicitationModel {
    constructor(userid,groupid,txt,status='waiting') {
        this.userid = userid;
        this.groupid = groupid;
        this.txt=txt,
        this.status = status; // waiting || accepted || refused
    }
}

// DAO = DATA ACCESS OBJECT
class GroupSolicitationDAO {
    static async sendGroupSolitation(groupsolicitation){
        const sql=`
            INSERT INTO group_solicitations(userid,groupid,txt,status) VALUES ($1,$2,$3,$4)
            ON CONFLICT (userid,groupid) 
            DO 
            UPDATE 
            SET 
                status='waiting',
                txt=EXCLUDED.txt,
                sended_at=NOW(),
                answered_at=null
            ;  
        `;
        const values = [groupsolicitation.userid,groupsolicitation.groupid,groupsolicitation.txt,groupsolicitation.status];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error GroupSolicitationDAO.sendGroupSolicitation',{ error });
        }
    };
    static async acceptSolicitation(userid,groupid){
        const sql=`
            UPDATE 
            group_solicitations gs
            SET 
                status='accepted',
                answered_at=NOW()
            WHERE 
                gs.userid=$1 and
                gs.groupid=$2
            ;  
        `;
        const values = [userid,groupid];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error GroupSolicitationDAO.acceptSolicitation',{ error });
        }
    }
    static async refuseSolicitation(userid,groupid){
        const sql=`
        UPDATE 
        group_solicitations gs
        SET 
            status='refused',
            answered_at=NOW()
        WHERE 
            gs.userid=$1 and
            gs.groupid=$2
        ;  
        `;
        const values = [userid,groupid];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error GroupSolicitationDAO.refuseSolicitation',{ error });
        }
    }
    static async getAllSolicitations(groupid){
        const sql=`
        SELECT 
            gs.*,
            u.img,
            u.name,
            u.email
        FROM
        group_solicitations gs
        JOIN users u on u.id=gs.userid and u.activated=true
        WHERE 
            gs.groupid=$1 and
            gs.status='waiting'
        ;  
        `;
        const values = [groupid];
        try {
            const result=await dbcon.query(sql, values);
            return result.rows;
        } catch (error) {
            console.log('Error GroupSolicitationDAO.getAllSolicitations',{ error });
        }
    }

}

module.exports = {
    GroupSolicitationModel,
    GroupSolicitationDAO
};