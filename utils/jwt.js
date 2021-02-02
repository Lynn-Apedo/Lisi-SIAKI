const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SIGN_SECRET = process.env.SIGN_SECRET;


module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userID: userData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '10h',
      }
    );
  },
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_SIGN_SECRET, (err, user) => {
        if (err) {
          console.log('/!\ Erreur token')
          throw new ForbiddenError(
            "Mauvaise requête - erreur client",
            "erreur token"
          );
        }
        req.user = user;
        next();
      });
    } else {
      console.log('Vous devez être connecté pour accéder à cette ressource')
      throw new UnauthorizedError(
        "Mauvaise requête - erreur client",
        "Vous devez être connecté pour accéder à cette ressource"
      );
    }
  },
};
