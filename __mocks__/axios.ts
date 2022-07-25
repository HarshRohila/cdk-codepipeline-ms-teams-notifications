const post = jest.fn().mockResolvedValue("s");
const axios = {
  post,
};
export default axios;
