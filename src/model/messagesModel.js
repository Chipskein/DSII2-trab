const { dbcon } = require("../database/connection");
class MessagesModel {
    constructor(id,txt,userid,groupid) {
        this.id = id;
        this.txt = txt;
        this.userid = userid;
        this.groupid = groupid;
    }
}
// DAO = DATA ACCESS OBJECT
class MessagesDAO {
    static async registerMessage(message) {  
        const sql = 'INSERT INTO public.messages (txt,userid,groupid) VALUES ($1, $2, $3) RETURNING id;';
        const values = [message.txt, message.userid, message.groupid];
        try {
            const response=await dbcon.query(sql, values);
            return response.rows[0];
        } catch (error) {
            console.log('Error MessageDAO.registerMessage',{ error });
        }
    }
    static async deleteMessage(messageid) {  
        const sql = `
                UPDATE messages 
                SET
                    deleted_at=now(),
                    activated=false
                WHERE 
                    id=$1
                ;
        `;
        const values = [messageid];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error MessageDAO.deleteMessage',{ error });
        }
    }
    static async removeAllMessagesFromGroupbyUser(userid,groupid) {  
        const sql = `
                UPDATE messages 
                SET
                    deleted_at=now(),
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
            console.log('Error MessageDAO.removeAllMessagesFromGroupbyUser',{ error });
        }
    }
    static async removeAllMessagesFromGroup(groupid) {  
        const sql = `
                UPDATE messages 
                SET
                    deleted_at=now(),
                    activated=false
                WHERE 
                    groupid=$2
                ;
        `;
        const values = [groupid];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error MessageDAO.removeAllMessagesFromGroup',{ error });
        }
    }
    static async getAllMessagesByGroup(groupid,offset=0,limit=10) {  
        const sql = `
            SELECT 
                u.id as userid,
                u.email as useremail,
                u.img as userimg,
                u.name as username,
                m.id as messageid,
                m.txt as message,
                m.updated_at as messagedata
            FROM 
                messages m
                join users u on u.id=m.userid and u.activated=true
            WHERE  
                m.groupid=$1 and
                m.activated=true
            ORDER BY m.updated_at desc
            LIMIT    ${limit}
            OFFSET   ${offset}
            ;
        `;
        const values = [groupid];
        try {
            const response=await dbcon.query(sql, values);
            return response.rows;
        } catch (error) {
            console.log('Error MessageDAO.getAllMessagesByGroup',{ error });
        }
    }
    static async countTotalMessagesByGroup(groupid){
        const sql = `select count(*) as qt from messages m where m.groupid=$1 and m.activated=true;`;
        const result = await dbcon.query(sql,[groupid]);
        return result.rows[0].qt;
    }

}

module.exports = {
    MessagesModel,
    MessagesDAO
};