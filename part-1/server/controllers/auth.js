const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
     const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {

        if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].password)
          if(existing){
            let userToReturn = {...users[i]}
            delete userToReturn.pwdHash
             res.status(200).send(userToReturn)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const{username, email, firstName, lastName, password} = req.body
      const salt = bcrypt.genSaltSync(10)
      const pwdHash = bcrypt.hashSync(password, salt)

      newUser = {
        username:username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: pwdHash
      }

      users.push(newUser)
      let userToReturn = {...newUser}
      delete userToReturn.pwdHash
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
      res.status(200).send(userToReturn)
    }
}