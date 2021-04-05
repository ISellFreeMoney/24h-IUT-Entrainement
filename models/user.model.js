const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    maxLength: 1024,
    minLength: 6,
    trim: true
  },
  picture: {
    type: [String],
    default: "./upload/profil/random-user.png"
  },
  bio: {
    type: String,
    max: 1024
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  likes: {
    type: [String]
  }
}, {
  timestamps: true
})
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Mot de passe incorrect');
  }
  throw Error('Email incorrect')
}

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel