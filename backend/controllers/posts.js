const Post = require('../models/post');
const UserCard = require('../models/userCard');

const fs = require('fs');

exports.createPost = (req,res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let test = req.body.content;
  let bool = test == "null";
  if (bool) {
    test = "";
  } else {
    test = req.body.content;
  }
  const post = new Post({
    title: req.body.title,
    content: test,
    date: req.body.date.split(" ",4).join(" "),
    dep: req.body.dep,
    des: req.body.des,
    dephour: req.body.dephour,
    arrhour: req.body.arrhour,
    capacity: parseInt(req.body.capacity),
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
    participation: []
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "creating a post failed!"
    });
  });
  }

exports.updatePost = (req, res, next) => {
  let imagePath =  req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + '/images/' + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    dep: req.body.dep,
    des: req.body.des,
    dephour: req.body.dephour,
    arrhour: req.body.arrhour,
    capacity: req.body.capacity,
    imagePath: imagePath,
    creator: req.userData.userId
  });

Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
  if (result.n > 0) {
    res.status(200).json({ message: "Update successful!" });
  } else {
    res.status(401).json({ message: "Not authorized!" });
  }
})
.catch(error => {
  res.status(500).json({
    message: "couldn't update post!"
  });
});
}

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  })
  .then(count => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: fetchedPosts,
      maxPosts: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  })
}

exports.getSinglePost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });
}



exports.deletePost = (req,res,next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });
}

exports.addUserCard = (req,res, next) => {
  const userCard = new UserCard ({
    date: req.body.date.split("T",1).join(""),
    dep: req.body.dep,
    des: req.body.des,
    dephour: req.body.dephour,
    arrhour: req.body.arrhour,
    capacity: parseInt(req.body.capacity),
    creator: req.body.creator,
  });
  userCard.save()
  .catch(error => {
    res.status(500).json({
      message: "creating a user card failed!"
    });
  });

}

exports.getUserCard = (req, res, next) => {
  //var array = [];
  UserCard.findOne({ creator: req.params.id }).then(card => {
    if (card) {

      /*array = Object.values(userCard);
      console.log(array);
      var file = fs.createWriteStream('array.txt');
      file.on('error', function(err) { /* error handling */ //});
      //array.forEach(function(v) { file.write(v+' '); });
      /*file.write('\n');
      file.end(); */
      res.status(200).json(card);
    } else {
      res.status(404).json({message: 'Card not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching card failed!"
    });
  });
}

exports.getSmartSol = (req, res, next) => {
    UserCard.find({}, function(err, users) {
      var userMap = {};
      var i = 25;

      users.forEach(function(user) {
        userMap[i] = user;
        i++;
      });

      var file = fs.createWriteStream('test.txt');
      file.on('error', function(err) { /* error handling */ });
      array = Object.values(userMap);
      console.log(array[0]);
      for (i=0; i<array.length; i++) {
        ch = JSON.stringify(array[i])
        array2 = ch.split("\n",7);
        array2.forEach(function(v) {
          v = v.split(",",7).join(" ")
          v = v.substring(1);
          v = v.split(":").join(" ");
          v = v.split("\"").join();
          v = v.split(", ,").join(" ");
          arr3 = v.split(" ");
          ch = "";
          ch += (i+25).toString() + " ";
          for (j = 0; j<arr3.length; j++ ) {
            if (j > 4 && j!=6 && j!=8 && j!=10 && j!=11 && j!=13 && j!=14) {
              if (j !=15 && j!= 7 && j!= 5) {
                ch += arr3[j] + " ";
              } else if( j == 15) {
                ch+= arr3[j][0];
              } else if (j == 5) {
                console.log(arr3[j]);
                switch (arr3[j]) {
                  case 'Ariana':
                    ch += '1 368665 101647 ';
                    break;
                  case 'Beja':
                    ch += '2 367333 91844 ';
                    break;
                  case 'Ben Arous':
                    ch += '3 367435 102320 ';
                    break;
                  case 'Bizerte':
                    ch+= '4 372768 98642 ';
                    break;
                  case 'Gabes':
                    ch += '5 338881 100975 ';
                    break;
                  case 'Gafsa':
                    ch+= '6 344311 87757 ';
                    break;
                  case 'Jandouba':
                    ch += '7 365072 87757 ';
                    break;
                  case 'Kairouan':
                    ch += '8 356712 101005 ';
                    break;
                  case 'Kasserine':
                    ch += '9 351723 88308 ';
                    break;
                  case 'Kebili':
                    ch += '10 337072 89715 ';
                    break;
                  case 'Kef':
                    ch += '11 361680 87096 ';
                    break;
                  case 'Mahdia':
                    ch += '12 355024 110457 ';
                    break;
                  case 'Manouba':
                    ch += '13 368093 100863 ';
                    break;
                  case 'Mednine':
                    ch += '14 333399 104959 ';
                    break;
                  case 'Monastir':
                    ch += '17 358245 106346 ';
                    break;
                  case 'Nabeul':
                    ch += '16 364513 107357 ';
                    break;
                  case 'Sousse':
                    ch += '17 358245 106346 ';
                    break;
                  case 'Seliana':
                    ch += '18 359903 92786 ';
                    break;
                  case 'Sfax':
                    ch += '19 347398 107600 ';
                    break;
                  case 'Sidi Bouzid':
                    ch += '20 350354 94839 ';
                    break;
                  case 'Tataouine':
                    ch += '21 329211 104509 ';
                    break;
                  case 'Tozeur':
                    ch += '22 339185 81229 ';
                    break;
                  case 'Tunis':
                    ch += '23 368065 101815 ';
                    break;
                  case 'Zaghouan':
                    ch += '24 364091 101423 ';
                    break;

                  default:
                    console.log('Sorry1');
                };
              } else {
                switch (arr3[j]) {
                  case 'Ariana':
                    ch += '368665 101647 ';
                    break;
                  case 'Beja':
                    ch += '367333 91844 ';
                    break;
                  case 'Ben Arous':
                    ch += '367435 102320 ';
                    break;
                  case 'Bizerte':
                    ch+= '372768 98642 ';
                    break;
                  case 'Gabes':
                    ch += '338881 100975 ';
                    break;
                  case 'Gafsa':
                    ch+= '344311 87757 ';
                    break;
                  case 'Jandouba':
                    ch += '365072 87757 ';
                    break;
                  case 'Kairouan':
                    ch += '356712 101005 ';
                    break;
                  case 'Kasserine':
                    ch += '351723 88308 ';
                    break;
                  case 'Kebili':
                    ch += '337072 89715 ';
                    break;
                  case 'Kef':
                    ch += '361680 87096 ';
                    break;
                  case 'Mahdia':
                    ch += '355024 110457 ';
                    break;
                  case 'Manouba':
                    ch += '368093 100863 ';
                    break;
                  case 'Mednine':
                    ch += '333399 104959 ';
                    break;
                  case 'Monastir':
                    ch += '357643 108113 ';
                    break;
                  case 'Nabeul':
                    ch += '364513 107357 ';
                    break;
                  case 'Sousse':
                    ch += '358245 106346 ';
                    break;
                  case 'Seliana':
                    ch += '359903 92786 ';
                    break;
                  case 'Sfax':
                    ch += '347398 107600 ';
                    break;
                  case 'Sidi Bouzid':
                    ch += '350354 94839 ';
                    break;
                  case 'Tataouine':
                    ch += '329211 104509 ';
                    break;
                  case 'Tozeur':
                    ch += '339185 81229 ';
                    break;
                  case 'Tunis':
                    ch += '368065 101815 ';
                    break;
                  case 'Zaghouan':
                    ch += '364091 101423 ';
                    break;

                  default:
                    console.log('Sorry');
                };
              }
            }
          }
          console.log(ch);
          file.write(ch + " "); console.log(v);
        });
        file.write('\n');
      }

      file.end();

      res.status(200).json(userMap);
    });
}
