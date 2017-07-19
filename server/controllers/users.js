// temp for creating dummy data
// const USERS = [
//   {name: "Mike", _id: 1, createdAt: new Date(), updatedAt: new Date()},
//   {name: "Alf", _id: 2, createdAt: new Date(), updatedAt: new Date()},
//   {name: "Bill", _id: 3, createdAt: new Date(), updatedAt: new Date()},
// ]

const mongoose = require("mongoose")
const User = mongoose.model("User")

module.exports = {
  login: (req, res) => {
    User.findOne({name: req.body.name})
        .then(data => {
          if(data){
            // save to session
            req.session.user_id = data._id
            res.json(true)
          } else {
            let new_user = new User({name: req.body.name})
            new_user.save()
              .then(user => {
                //save into session
                req.session.user_id = new_user._id
                res.json(true)
              })
              .catch(err => res.status(500).json(err))
          }
        })
    // test using dummy data
    // USERS.push({name: req.body.name, _id: USERS[USERS.length-1]._id + 1,
    //   createdAt: new Date(), updatedAt: new Date()});
    // res.json(USERS)
  },

  index: (req,res) => {
    console.log(req.session)
    User.find()
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err))
  },

  get_logged_in_user: (req, res) => {
    if(req.session.user_id) {
      User.findOne({_id: req.session.user_id})
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
    } else {
      res.json(false)
    }
  },

  logout: (req,res) => {
    req.session.destroy()
    res.redirect("/")
  }
}
