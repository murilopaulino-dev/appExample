import { ERROR_CODES } from '../constants';
import { errorToast } from './toast';

const ERROR_MESSAGES = {
  [ERROR_CODES.EMPTY_EMAIL]: "Email can't be empty",
  [ERROR_CODES.EMPTY_PASSWORD]: "Password can't be empty",
  [ERROR_CODES.INVALID_EMAIL]: 'Invalid email',
  [ERROR_CODES.EMAIL_INVALID]: 'Invalid email',
  [ERROR_CODES.EMAIL_NOT_FOUND]: 'Invalid email or password',
  [ERROR_CODES.EMAIL_EXISTS]: 'This email already exists',
  [ERROR_CODES.MISSING_PASSWORD]: 'Missing password',
  [ERROR_CODES.MISSING_EMAIL]: 'Missing email',
  [ERROR_CODES.INVALID_PASSWORD]: 'Invalid email or password',
  [ERROR_CODES.INVALID_ID_TOKEN]: 'User not found',
  [ERROR_CODES.INSERT_COMMENT]: "Comment can't be empty",
  [ERROR_CODES.INSERT_REPLY]: "Reply message can't be empty",
  [ERROR_CODES.INSERT_RESTAURANT_NAME]: "Restaurant name can't be empty",
  'WEAK_PASSWORD : Password should be at least 6 characters': 'Password should be at least 6 characters',
};

const DEFAULT_ERROR_MESSAGE = 'Oops. Something went wrong. Check your internet connection or try again later.';

export default error => {
  let innerError = error?.response?.data?.error || error?.message;
  console.log('innerError', innerError);
  const errorStatus = innerError?.status || innerError?.message || innerError;
  const errorMessage = ERROR_MESSAGES[errorStatus] || DEFAULT_ERROR_MESSAGE;
  errorToast(errorMessage);
};
