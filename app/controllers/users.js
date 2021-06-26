const logger = require('../logger');
const { encryptPassword } = require('../helpers/wcrypt');
const { USER_CREATED } = require('../../config/constants');
const UserServices = require('../services/users');

const createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const passwordEncrypted = await encryptPassword(userData.password);
    if (passwordEncrypted) userData.password = passwordEncrypted;
    const newUser = await UserServices.createUser(userData);
    res.status(201).send({
      message: USER_CREATED,
      data: { name: newUser.name }
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

module.exports = {
  createUser
};
