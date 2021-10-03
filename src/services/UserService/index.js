import Firebase from '../firebase';
import firestoreApi from '../axios/firestore';
import AuthUserService from '../AuthUserService';

const END_POINT = 'users';

const FirebaseFirestoreService = new Firebase(firestoreApi);

class UserService {
  static async getUser(userId) {
    return FirebaseFirestoreService.get(`${END_POINT}/${userId}`);
  }

  static async getUsers(filter, sort) {
    return FirebaseFirestoreService.query(END_POINT, filter, sort);
  }

  static async saveUser(user) {
    return FirebaseFirestoreService.save(END_POINT, user);
  }

  static async deleteUser(userId) {
    await FirebaseFirestoreService.deleteDoc(END_POINT, userId);
    return AuthUserService.deleteUser(userId);
  }
}

export default UserService;
