const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");

exports.createUser = (req, res, next) =>{
  const url = req.protocol + '://' + req.get("host");
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        notif: 0,
        type: req.body.type,
        imagePath: url + "/images/" + req.file.filename,
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message:'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
              message: err
          });
        });
    });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user =>{
      if(!user) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        'secret_this_should_be_longer',
        {expiresIn: "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.name,
        email: fetchedUser.email,
        notif: fetchedUser.notif
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.updateUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        type: req.body.type
      });
      User.updateOne({_id: req.params.id}, user).then(result => {
        console.log(result);
        res.status(200).json({message: 'Update successful!'});
      }).catch(err => {
        console.log(err);
      })
})
.catch(err => {
  console.log(err);
});
}

exports.notifParticipate = (req, res, next) => {
  if (parseInt(req.body.inc) > parseInt("0")) {
    usr = User.updateOne(
      { _id: req.body.id},
      { $inc: {notif: parseInt(req.body.inc)}}
    )
    post = Post.updateOne(
      { _id: req.body.postId},
      {$push: {participation: req.body.userId }}
    )
  .catch((err) => {
      console.log('Error: ' + err);
  })
  } else {
    usr = User.updateOne(
      { _id: req.body.id},
      { notif: 0}
    )
  .catch((err) => {
      console.log('Error: ' + err);
  })
}
}

exports.getUserInfo = (req, res, next) => {
  User.findById(req.params.id).then(card => {
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });
}


