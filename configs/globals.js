require("dotenv").config();
// Global configurations object contains Application Level variables such as:
// client secrets, passwords, connection strings, and misc flags
const configurations = {
  ConnectionStrings: {
    MongoDB: process.env.DB_CONNECT,
  }
  ,
  Authentication: {
    GitHub: {
      ClientId: process.env.GITHUB_CLIENT_ID,
      ClientSecret: process.env.GITHUB_CLIENT_SECRET,
      CallbackUrl: process.env.GITHUB_CALLBACK_URL
    },
    Google:{
      ClientId:process.env.GOOGLE_CLIENT_ID,
      ClientSecret:process.env.GOOGLE_CLIENT_SECRET,
      CallbackUrl: process.env.GOOGLE_CALLBACK_URL
    }
  },
};
module.exports = configurations;
