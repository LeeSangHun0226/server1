const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise; // 라우터에서 save 사용하기 위함

const Schema = mongoose.Schema;

const User = new Schema({
// -------------회원가입-----------------
  id: String,
  password: String,
  mail: String,
  token: String,
// -------------프로필-----------------
  username: String,
  team: String,
  leader: String,
  // img: { data: Buffer, contentTypes: String },
  position: String,
  height: String,
  foot: String,
  created: {
    type: Date,
    default: Date.now,
  },
// -------------Game Register-----------------
  place: String,
  playground: String,
  palydate: Date,
  // team_img: { data: Buffer, contentTypes: String },
});

// use bcryptjs :  https://www.npmjs.com/package/bcryptjs#usage—sync

User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

User.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', User);
