const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort('-date')
    .populate('userId')
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  console.log(req.body);

  const post = new Post({
    userId: req.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    text: req.body.text,
    // likes: 0,
    // dislikes: 0,
    // usersLiked: [' '],
    // usersDisliked: [' '],
  });
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post enregistrée' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          const postObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          };
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: 'Post modifiée' }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    const postObject = { ...req.body };

    //If File
    // -Supprimer l'ancienne image
    // -Ajouter images
    // -Update

    Post.updateOne(
      { _id: req.params.id },
      { ...postObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: 'Post modifiée' }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.deletePost = (req, res, next) => {
  // -Supprimer l'image
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      //Post.userId == req.userId || req.isAdmin
      //TRAITEMENT
      //else (ERROR)

      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimée' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
  let like = req.body.like;
  console.log(req.body);
  let userId = req.userId;
  let postId = req.params.id;

  Post.findOne({ _id: postId })
    .then((post) => {
      if (post.usersLiked.includes(userId)) {
        Post.updateOne(
          { _id: postId },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        )
          .then(() => res.status(200).json({ message: `Neutre` }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        Post.updateOne(
          { _id: postId },
          { $push: { usersLiked: userId }, $inc: { likes: +1 } }
        )
          .then(() => res.status(200).json({ message: `J'aime` }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => sessionStorage.status(404).json({ error }));

  // switch (like) {
  //   case 1:
  //     Post.updateOne(
  //       { _id: postId },
  //       { $push: { usersLiked: userId }, $inc: { likes: +1 } }
  //     )
  //       .then(() => res.status(200).json({ message: `J'aime` }))
  //       .catch((error) => res.status(400).json({ error }));

  //     break;

  //   case 0:
  //     Post.findOne({ _id: postId })
  //       .then((post) => {
  //         if (post.usersLiked.includes(userId)) {
  //           Post.updateOne(
  //             { _id: postId },
  //             { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
  //           )
  //             .then(() => res.status(200).json({ message: `Neutre` }))
  //             .catch((error) => res.status(400).json({ error }));
  //         }
  //       })
  //       .catch((error) => sessionStorage.status(404).json({ error }));
  //     break;

  //   default:
  //   // console.log(error);
  // }
};
