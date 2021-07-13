const logger = require('../logger');
const { unauthorized } = require('../errors');
const { encryptPassword, comparePassword } = require('../helpers/wcrypt');
const {
  USER_CREATED,
  USER_UPDATED,
  BAD_CREDENTIALS,
  SIGN_IN_SUCCESSFUL,
  GET_USERS_SUCCESSFULLY,
  ROLES
} = require('../../config/constants');
const UserServices = require('../services/users');
const { generateToken } = require('../helpers/sessions');

exports.createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    logger.info(
      `Create regular user start: 
      method: ${req.method},
      endpointt: ${req.path},
      user: ${userData}`
    );
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
    logger.info(
      `SignIn user start: 
      method: ${req.method},
      endpointt: ${req.path},
      mail: ${mail}`
    );
    const user = await UserServices.getUserByEmail(mail);
    if (!user) return next(unauthorized(BAD_CREDENTIALS));
    const validateData = await comparePassword(password, user.password);
    if (!validateData) return next(unauthorized(BAD_CREDENTIALS));
    const { id, name, lastName, role } = user;
    const token = generateToken({ id, name, lastName, mail, role });
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
    logger.info(
      `GetUsers start: 
      method: ${req.method},
      endpointt: ${req.path},
      pagination: [${offset} - ${limit}]`
    );
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

exports.createOrUpdateAdminUser = async (req, res, next) => {
  try {
    const { body: adminUser } = req;
    logger.info(
      `Create/Update admin user start: 
      method: ${req.method},
      endpointt: ${req.path},
      user: ${adminUser}`
    );
    adminUser.role = ROLES.ADMIN;
    adminUser.password = await encryptPassword(adminUser.password);
    const [user, created] = await UserServices.createAdmin(adminUser);
    if (!created) {
      return res.status(200).send({
        message: USER_UPDATED,
        data: { name: user.name }
      });
    }
    return res.status(201).send({
      message: USER_CREATED,
      data: { name: user.name }
    });
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};
