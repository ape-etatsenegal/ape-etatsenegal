// scripts/hashPassword.js
import bcrypt from 'bcryptjs';

const password = '@seneg@l2050'; // change-le avec le mot de passe que tu veux
const saltRounds = 10;

bcrypt.hash(password, saltRounds)
  .then(hash => {
    console.log("Mot de passe hashé :", hash);
  })
  .catch(err => {
    console.error(err);
  });
