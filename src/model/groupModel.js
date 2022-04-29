const { dbcon } = require("../database/connection");
class GroupModel {
    constructor(id,name,adminid,img) {
        this.id = id;
        this.name = name;
        this.adminid = adminid;
        this.img = img;
    }
}

// DAO = DATA ACCESS OBJECT
class GroupDAO {
    static async deleteGroup(groupid){
        const sql = `
            UPDATE 
                "group"
            SET
                activated=false
            WHERE 
                id=$1
            ;
        `;
        const values = [groupid];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error groupDAO.deleteGroup',{ error });
        }
    }
    static async createGroup(group) {
    
        let sql = `
        INSERT INTO groups (name,adminid,img) VALUES ($1,$2,$3) RETURNING id;`;
        const values = [group.name, group.adminid,group.img];
        try {
            const result=await dbcon.query(sql, values);
            return result.rows[0].id;
        } catch (error) {
            console.log('Error groupDAO.createGroup',{ error });
        }
    }
    static async getAllGroups(offset=0,limit=5) {
        const sql = `
            select 
                g.id,
                g.img,
                g.name,
                g.adminid,
                g.created_at,
                g.updated_at,
                g.activated,
                (select count(*) from group_members gm where gm.groupid=g.id and gm.activated=true) as memberqt,
                array_agg(gm2.userid) as users
            from "groups" g
            left join group_members gm2 on gm2.groupid=g.id and gm2.activated=true
            where 
                g.activated=true
            group by g.id
            limit ${limit}
            offset ${offset};
        `;
        const result = await dbcon.query(sql);
        return result.rows;
    }
    static async countTotalGroups(){
        const sql = `select count(*) as qt from "groups" g where g.activated=true;`;
        const result = await dbcon.query(sql);
        return result.rows[0].qt;
    }
    static async getAllGroupsByUser(userid,offset=0,limit=5) {
        const sql = `
            select 
                g.id,
                g.img,
                g.name,
                g.adminid,
                g.created_at,
                g.updated_at,
                g.activated,
                (select count(*) from group_members gm where gm.groupid=g.id and gm.activated=true) as memberqt,
                array_agg(gm2.userid) as users
            from "groups" g
                left join group_members gm2 on gm2.groupid=g.id and gm2.activated=true
            where 
                $1 in (select gm.userid from group_members gm where gm.groupid=g.id and gm.activated=true)
            group by g.id
            limit ${limit}
            offset ${offset}
        `;
        const result = await dbcon.query(sql,[userid]);
        return result.rows;
    }
    static async countTotalGroupsByUser(userid) {
        const sql = `
            select 
                count(*) as total
            from (
                select 
                    *
                    from "groups" g
                where 
                    $1 in (select gm.userid from group_members gm where gm.groupid=g.id and gm.activated=true)
                group by g.id
            )as tmp
            ;
        `;
        const result = await dbcon.query(sql,[userid]);
        const rows=result.rows
        if(rows.length!=0) return rows[0].total;
        else return 0;
    }
    static async getGroup(groupid) {
        const sql = `
            select 
                g.id,
                g.img,
                g.name,
                g.adminid,
                g.created_at,
                g.updated_at,
                g.activated
            from "groups" g
            where 
                g.id=$1 and
                g.activated=true
            ;
        `;
        const result = await dbcon.query(sql,[groupid]);
        return result.rows[0];
    }
}

module.exports = {
    GroupModel,
    GroupDAO
};