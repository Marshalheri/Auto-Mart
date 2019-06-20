import ApiErrors from './errorClass';

export const Constants = {

  notAuthorizedMessage () {
    const message = 'You are not authorized to access this endpoint.';
    throw new ApiErrors(message, 401)
  },

  supplyAuthHeader() {
    const message = `Please supply an authorization header.`;
    throw new ApiErrors(message, 400);
  }
}
