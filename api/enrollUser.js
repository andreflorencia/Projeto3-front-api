const axios = require("axios");

const enrollUser = async () => {
  const body = { id: "admin", secret: "adminpw" };
  const response = await axios.post("http://localhost:8801/user/enroll", body);
  if (response.data.token) {
    return response.data.token;
  }
  return null;
};

module.exports = enrollUser;
