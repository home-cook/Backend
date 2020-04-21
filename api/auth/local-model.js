const db = require('../../dbConfig')

module.exports = {
    SignUp,
    SignIn
}

function SignUp(user){
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;

            return findById(id)
        })
}

function SignIn(user){
    return db('users')
        .select('*')
        .where({email:user.email})
        .first()
}

function findById(id){
    return db('users')
        .select('*')
        .where({id})
}