const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(64)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

module.exports = passwordSchema;

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        'Le mdp doit faire au moins 8 caractères avec une majuscule et un chiffre',
    });
  } else {
    next();
  }
};
