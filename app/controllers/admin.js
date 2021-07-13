const { encryptPassword } = require('../helpers/wcrypt');
const logger = require('../logger');
const { User } = require('../models');
const { USER_CREATED, USER_UPDATED, ROLES } = require('../../config/constants');

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
    const passwordEncrypted = await encryptPassword(adminUser.password);
    adminUser.password = passwordEncrypted;
    const [user, created] = await User.upsert(adminUser, { returning: true });
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
