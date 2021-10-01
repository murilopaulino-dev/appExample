import { ROLES } from '../constants';

export const checkIfUserIsAdmin = user => user.role === ROLES.ADMIN;

export const checkIfUserRoleIsOwner = user => user.role === ROLES.OWNER;

export const userCanCreateRestaurants = user => checkIfUserIsAdmin(user) || checkIfUserRoleIsOwner(user);

export const checkIfUserRestaurantOwner = (user, restaurant) => user.id === restaurant.owner;

export const checkIfUserIsAdminOrOwner = (user, restaurant) => checkIfUserIsAdmin(user) || checkIfUserRestaurantOwner(user, restaurant);
