import { errorToast } from './toast';

const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Invalid email',
  EMAIL_INVALID: 'Invalid email',
  EMAIL_NOT_FOUND: 'Invalid email or password',
  EMAIL_EXISTS: 'This email already exists',
  MISSING_PASSWORD: 'Missing password',
  MISSING_EMAIL: 'Missing email',
  INVALID_PASSWORD: 'Invalid email or password',
  INVALID_ID_TOKEN: 'User not found',
};

const DEFAULT_ERROR_MESSAGE = 'Oops. Something went wrong. Check your internet connection or try again later.';

export default error => {
  console.log('error', error);
  const errorStatus = error?.status || error?.message;
  const errorMessage = ERROR_MESSAGES[errorStatus] || DEFAULT_ERROR_MESSAGE;
  console.log('errorMessage', errorMessage);
  errorToast(errorMessage);
};
