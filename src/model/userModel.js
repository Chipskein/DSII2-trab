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
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error UserDAO.registerUser',{ error });
        }
    }
    static async getInfoByEmail(email) {
        const sql = "SELECT * FROM public.users WHERE public.users.email=$1;";
        const result = await dbcon.query(sql, [email]);
        return result.rows[0];
    }
}

module.exports = {
    UserModel,
    UserDAO
};