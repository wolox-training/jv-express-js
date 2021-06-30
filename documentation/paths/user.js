const { USER_CREATED, USER_ALREADY_EXIST } = require('../../config/constants');

module.exports = {
  '/users': {
    post: {
      tags: ['User operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userInput'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: USER_CREATED,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userCreated'
              }
            }
          }
        },
        409: {
          description: USER_ALREADY_EXIST,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/alreadyExist'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userInvalidParameter'
              }
            }
          }
        }
      }
    }
  }
};
