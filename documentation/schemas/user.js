const { USER_ALREADY_EXIST, USER_CREATED } = require('../../config/constants');
const { DUPLICATED_REGISTER_ERROR, BAD_REQUEST } = require('../../app/errors');

module.exports = {
  userInput: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'John'
      },
      lastName: {
        type: 'string',
        example: 'Doe'
      },
      mail: {
        type: 'string',
        example: 'john.doe@wolox.com.ar'
      },
      password: {
        type: 'string',
        example: 'MyP4ssWor%'
      }
    }
  },
  userCreated: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: USER_CREATED
      },
      data: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'John'
          }
        }
      }
    }
  },
  alreadyExist: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: USER_ALREADY_EXIST
      },
      internal_code: {
        type: 'string',
        example: DUPLICATED_REGISTER_ERROR
      }
    }
  },
  userInvalidParameter: {
    type: 'object',
    properties: {
      message: {
        type: 'object',
        properties: {
          value: {
            type: 'string',
            example: 4
          },
          msg: {
            type: 'string',
            example: "'name' must be a string"
          },
          param: {
            type: 'string',
            example: 'name'
          },
          location: {
            type: 'string',
            example: 'body'
          }
        }
      },
      internal_code: {
        type: 'string',
        example: BAD_REQUEST
      }
    }
  }
};
