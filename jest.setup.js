import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';

require('dotenv').config({
  path: '.env.test'
});

// TODO: Check enviroment variables
// console.log("Loading ENV VAR FOR TESTING",process.env);

jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env })
}));