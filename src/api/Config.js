const urls = {
  heroku: {
    baseUrl: 'https://youtube-listen-1.herokuapp.com/api',
    loginUrl: 'https://youtube-listen-1.herokuapp.com/api',
  },
  gae: {
    baseUrl: 'https://drive-manager-api-dot-drive-manager-a3954.df.r.appspot.com/api',
    loginUrl: 'https://login-service-dot-drive-manager-a3954.df.r.appspot.com/api',
  },
  local: {
    // baseUrl: 'https://youtube-listen-1.herokuapp.com/api',
    baseUrl: 'http://localhost:9988/api',
    loginUrl: 'https://login-service-dot-drive-manager-a3954.df.r.appspot.com/api',
  },
}

let target = process.env.REACT_APP_BUILD_TARGET;
const {baseUrl, loginUrl} = urls[target] ? urls[target] : urls.local;

const apiConfig = {
  buildTarget: process.env.REACT_APP_BUILD_TARGET,
  baseUrl: baseUrl,
  loginUrl: loginUrl,
  unauthorizedPath: '/#/user/login',
  notFoundPath: '/#/error/notFound',
};

export default Object.assign({}, apiConfig);