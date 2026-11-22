export const loginData = {
  validUser: {
    email: process.env.TEST_USER_EMAIL || 'lakhlifi@gmail.com',
    password: process.env.TEST_USER_PASSWORD || 'L@khlifi1997',
  },
  invalidUser: {
    email: 'la@gmail.com',
    password: 'L@khlifi1997',
  },
  invalidFormat: {
    email: 'invalid-email-format',
  },
};
