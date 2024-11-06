import connection from "../services/SqlConnection";

function findAll() {
    return connection.query('SELECT * FROM user');
}

function findById(id) {
    return connection.query('SELECT * FROM user WHERE id = ?', [id]);
}

function findOneByEmail(email) {
    return connection.query('SELECT * FROM user WHERE email = ?', [email]);
}

export default {
    findAll,
    findById,
    findOneByEmail
};