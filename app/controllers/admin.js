const { encryptPassword } = require('../helpers/wcrypt');
const logger = require('../logger');
const UserServices = require('../services/users');
const { USER_CREATED, USER_UPDATED, ROLES } = require('../../config/constants');

exports.createOrUpdateAdminUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    logger.info(userData);
    const user = await UserServices.getUserByEmail(userData.mail);
    if (!user) {
      const passwordEncrypted = await encryptPassword(userData.password);
      userData.password = passwordEncrypted;
      Object.assign(userData, { role: ROLES.ADMIN });
      const newAdmin = await UserServices.createUser(userData);
      return res.status(201).send({
        message: USER_CREATED,
        data: { name: newAdmin.name }
      });
    }
    user.role = ROLES.ADMIN;
    await user.save();
    return res.status(200).send({
      message: USER_UPDATED,
      data: { name: user.name }
    });
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};
