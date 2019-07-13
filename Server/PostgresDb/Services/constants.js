import ApiErrors from './errorClass';

export const Constants = {

  invalidToken(err) {
    const { message } = err;
    throw new ApiErrors(message, 500);
  },

  notAuthorizedMessage() {
    const message = 'You are not authorized to access this endpoint.';
    throw new ApiErrors(message, 401);
  },

  supplyAuthHeader() {
    const message = 'Please supply an authorization header.';
    throw new ApiErrors(message, 400);
  },

  supplyBodyValue(message) {
    throw new ApiErrors(message, 400);
  },

  cannotUpdateAd(owner) {
    const message = `User with id = ${owner} cannot carryout the update.`;
    throw new ApiErrors(message, 400);
  },

  cannotFind(message) {
    throw new ApiErrors(message, 404);
  },

};
