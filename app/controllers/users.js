const logger = require('../logger');
const { unauthorized } = require('../errors');
const { encryptPassword, comparePassword } = require('../helpers/wcrypt');
const {
  USER_CREATED,
  BAD_CREDENTIALS,
  SIGN_IN_SUCCESSFUL,
  GET_USERS_SUCCESSFULLY
} = require('../../config/constants');
const UserServices = require('../services/users');
const { generateToken } = require('../helpers/sessions');

exports.createUser = async (req, res, next) => {
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

exports.signIn = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    const user = await UserServices.getUserByEmail(mail);
    if (!user) return next(unauthorized(BAD_CREDENTIALS));
    const validateData = await comparePassword(password, user.password);
    if (!validateData) return next(unauthorized(BAD_CREDENTIALS));
    const { id, name, lastName } = user;
    const token = generateToken({ id, name, lastName, mail });
    return res.status(200).send({
      message: SIGN_IN_SUCCESSFUL,
      data: { token }
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { offset, limit } = await req.query;
    const users = await UserServices.getAllUsers({ offset, limit });
    res.status(200).send({
      message: GET_USERS_SUCCESSFULLY,
      data: { users }
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
