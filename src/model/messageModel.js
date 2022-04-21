const { dbcon } = require("../database/connection");
class MessageModel {
    constructor(id,txt,userid,groupid) {
        this.id = id;
        this.txt = txt;
        this.userid = userid;
        this.groupid = groupid;
    }
}
// DAO = DATA ACCESS OBJECT
class MessageDAO {
    static async registerMessage(message) {  
        const sql = 'INSERT INTO public.messages (txt,userid,groupid) VALUES ($1, $2, $3, $4) RETURNING id;';
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
            console.log('Error MessageDAO.registerMessage',{ error });
        }
    }
    static async getAllMessagesByGroup(groupid) {  
        const sql = `
            SELECT 
                u.id as userid,
                u.email as useremail,
                u.img as userimg,
                u.name as username,
                m.id as messageid,
                m.txt as message
            FROM 
                messages m
                join users u on users.id=m.userid and u.activated=true
            WHERE  
                m.groupid=$1 and
                m.activated=true
            ;
        `;
        const values = [groupid];
        try {
            const response=await dbcon.query(sql, values);
            return response.rows;
        } catch (error) {
            console.log('Error MessageDAO.registerMessage',{ error });
        }
    }
}

module.exports = {
    MessageModel,
    MessageDAO
};