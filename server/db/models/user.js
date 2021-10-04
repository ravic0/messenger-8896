const { DataTypes } = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    alloWNull: false,
    validate: {
      isEmail: true,
    },
  },
  photoUrl: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      min: 6,
    },
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: DataTypes.STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
});

User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password();
};

User.createSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainPassword, salt) {
  return crypto.createHash('RSA-SHA256').update(plainPassword).update(salt).digest('hex');
};

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;
