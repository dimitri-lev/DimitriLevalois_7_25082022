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
  if (req.file) {
    const post = new Post({
      userId: req.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
      text: req.body.text,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: 'Post enregistrée' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    const post = new Post({
      userId: req.userId,
      text: req.body.text,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: 'Post enregistrée' }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject.userId;

  console.log(req.isAdmin);
  Post.findOne({ _id: req.params.id })

    .then((post) => {
      if (post.userId == req.userId || req.isAdmin) {
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      } else {
        res.status(401).json({ message: 'Not authorized' });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  console.log(req.userId);
  console.log(req.isAdmin);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      console.log(post);
      if (post.userId == req.userId || req.isAdmin) {
        if (post.imageUrl) {
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Post supprimée' }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimée' }))
            .catch((error) => res.status(400).json({ error }));
        }
      } else {
        res.status(401).json({ message: 'Not authorized' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
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
    .catch((error) => res.status(404).json({ error }));
};
