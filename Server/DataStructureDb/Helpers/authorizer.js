import { usersModel } from '../Models';

const { userDb } = usersModel;

const HandleUserHeader = {
  getUserToken: async (userToken) => {
    let user;
    if (userToken == null || userToken == undefined) {
      user = null;
    } else {
      await userDb.some((eachUser) => {
        if (eachUser.token == userToken) {
          user = eachUser;
        } else {
          user = null;
        }
      });
    }
    return user;
  },
};

export default HandleUserHeader;
