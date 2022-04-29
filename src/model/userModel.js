const { dbcon } = require("../database/connection");
class UserModel {
    constructor(id,name,email,password,img) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.img = img;
    }
}

// DAO = DATA ACCESS OBJECT
class UserDAO {

    static async registerUser(user) {
          
        const sql = 'INSERT INTO public.users (name,email,password,img) VALUES ($1, $2, $3, $4) RETURNING id;';
        const values = [user.name, user.email, user.password, user.img];
        try {
            const response=await dbcon.query(sql, values);
            return response.rows[0].id
        } catch (error) {
            console.log('Error UserDAO.registerUser',{ error });
        }
    }
    static async getInfoByEmail(email) {
        const sql = "SELECT * FROM public.users WHERE public.users.email=$1 and public.users.activated=true;";
        const result = await dbcon.query(sql, [email]);
        if(result.rows.length>0) return result.rows[0];
        else return false
    }
}

module.exports = {
    UserModel,
    UserDAO
};