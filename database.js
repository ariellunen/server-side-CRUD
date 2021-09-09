const mysql = require('mysql2/promise')

let con = null;
async function getCon() {
    if (con) return con;
    con = await mysql.createConnection(
        { database: 'users-crud', host: 'localhost', user: 'root', password: 'Aa12345' }
    );
    return con;
}

module.exports = {
    getUsers: async () => {
        const conn = await getCon()
        const [rows] = await conn.execute('SELECT * FROM `users-crud`.users');
        return rows
    },
    getUserById: async (id) => {
        const conn = await getCon()
        const [rows] = await conn.execute(`SELECT * FROM users where id=${id}`);
        return rows[0]
    },
    createUser: async (user) => {
        const { id, name, email } = user;
        const conn = await getCon()
        const result = await conn.execute(`
            INSERT INTO users (id,name, email)
            VALUES (${id}, '${name}', '${email}');
        `);
        return result
    },
    updateUser: async (id, data) => {
        let update = Object.entries(data).map(([key, value]) => `${key}='${value}'`)
        const conn = await getCon()
        const result = await conn.execute(`
            UPDATE users
            SET ${update.join(', ')}
            WHERE id = ${id};
         `);
        return result
    },
    deleteUser: async (id) => {
        const conn = await getCon()
        const result = await conn.execute(`
            DELETE FROM users WHERE id = ${id}
         `);
        return result
    },
}