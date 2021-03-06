// todo: https://stackoverflow.com/questions/73017619/axios-not-respecting-content-type-header

import axios from "axios"
import Account from "./Account";
import app from "./App";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const requestInterceptor = config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  config.headers['X-Client'] = 'React';
  if (localStorage.getItem('locale')) {
    config.headers['Locale'] = localStorage.getItem('locale');
  }
  return Account.updateToken(() => {
    config.headers.Authorization = `Bearer ${app.token()}`;
    return Promise.resolve(config);
  })
}

const errorInterceptor = error => {
  if (error.response === undefined) {
    throw new Error(error.message ? error.toString() : 'Unknown error');
  }
  if (error.response.status === 401 || (error.response.status === 500 && error.response.data === "An error occured processing your authentication.")) {
    var url = new URL(app.createLogoutUrl());
    url.search = app.createLoginUrl();
    window.newUrl = url;
    app.checkLogin();
    throw new Error('You need to login again.');
  }
  if (error.response.status === 403) {
    throw new Error('you are logged in, but you do not have access to this section');
    // todo: redirect user to "403" page.
  }
  if (error.response.status === 404) {
    throw new Error('404\nService does not exist');
  }
  if (error.response.status === 400 || error.response.status === 500) {
    var messages = '';
    var data = error.response.data;
    if (typeof data !== "string") {
      for (var item in error.response.data) {
        if (item.toLocaseCase && item.toLocaseCase() === 'type') {
          continue;
        }
        if (Array.isArray(data[item])) {
          for (var i = 0; i < data[item].length; i++) {
            messages += data[item][i] + "\n";
          }
        }
        else if (typeof data[item] === 'object') {
          console.log(data[item]);
        }
        else {
          messages += data[item] + "\n";
        }
      }
    }
    else {
      messages = data;
    }
    if (messages.indexOf('IDX10223') > -1) {
      app.checkLogin();
      throw new Error('You need to login again.');
      //app.updateToken();
    }
    console.log(messages);
    throw new Error(messages);
  }
}

axiosApi.interceptors.request.use(requestInterceptor);

axiosApi.interceptors.response.use(response => response, errorInterceptor)

const get = async (url) => {
  return await
    axiosApi.get(url, {
      crossDomain: true
    }).then(response => {
      return response?.data;
    })
}

const post = async (url, data) => {
  return await axiosApi
    .post(url, Array.isArray(data) ? [...data] : { ...data })
    .then(response => response?.data)
}

const form = async (url, data) => {
  return await axiosApi
    .post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => response?.data)
}

const upload = async (url, data) => {
  return await axiosApi
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response?.data)
}

const file = async (url) => {
  return await
    axiosApi.get(url, {
      crossDomain: true,
      responseType: 'blob'
    })
      .then(response => new File([response?.data], 'File'))
}

export { axios }
export { errorInterceptor }
export { file }
export { form }
export { get }
export { post }
export { requestInterceptor }
export { upload }