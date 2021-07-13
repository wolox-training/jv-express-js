exports.signinCredentials = {
  mail: 'jhon.velasquez@wolox.co',
  password: 'abcd1234'
};

exports.getUserByEmailMock = mail =>
  Promise.resolve({
    id: 1,
    name: 'Jhon',
    lastName: 'Velasquez',
    password: '$2a$10$xACyWYbW8uJxydccdoKYq.Iq5O7yHaOoPPlq4oPNMQT304QWqbBhy',
    mail,
    role: 'regular'
  });

exports.getUserByPkMock = id =>
  Promise.resolve({
    id,
    name: 'Jhon',
    lastName: 'Velasquez',
    password: '$2a$10$xACyWYbW8uJxydccdoKYq.Iq5O7yHaOoPPlq4oPNMQT304QWqbBhy',
    mail: 'jhon.velasquez@wolox.co',
    role: 'regular'
  });

exports.getUserNullEmailMock = mail => Promise.resolve(null && mail);
