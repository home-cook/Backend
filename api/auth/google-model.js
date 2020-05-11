const db = require('../../dbConfig')

module.exports = {
    addUser,
    findUser,
    findById
}

function addUser(user){
    return db('google_auth')
        .insert(user)
        .then(ids => {
            const [id] = ids;

            return findById(id)
        })
}

function findUser(googleId){
    return db('google_auth')
        .select('*')
        .where({googleId})
        .first()
}

// function updateUser(googleId){
//     return db('google_auth')
//         .select()
// }

function findById(id){
    return db('google_auth')
        .select('*')
        .where({id})
}