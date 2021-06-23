const { User } = require('../models');

exports.createUser = user => User.create(user);
