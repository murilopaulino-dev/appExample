import { ROLES } from '../constants';

export const userCanCreateRestaurants = user => [ROLES.ADMIN, ROLES.OWNER].includes(user.role);

export const checkIfUserIsAdmin = user => user.role === ROLES.ADMIN;
