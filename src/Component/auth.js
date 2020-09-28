import cookie from "js-cookie";

//set in cookie
export const setCookie = (key, value) => {
  console.log("inside setCookie");
  if (window !== "undefiend") {
    cookie.set(key, value, {
      expires: 1, //1 day
    });
  }
};

//remove from cookie
export const removeCookie = (key) => {
  console.log("inside removeCookie");
  if (window !== "undefiend") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get from cookie like token
export const getCookie = (key) => {
  console.log("inside getCookie");
  if (window !== "undefiend") {
    console.log("cookieif");
    return cookie.get(key);
  }
};

//set in localstorage
export const setLocalStorage = (key, value) => {
  console.log("inside setLocalStorage");
  if (window !== "undefiend") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage
export const removeLocalStorage = (key) => {
  console.log("inside removeLocalStorage");
  if (window !== "undefiend") {
    localStorage.removeItem(key);
  }
};

//auth user after loign
export const authenticate = (response, next) => {
  console.log("inside authenticate ");
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//signout
export const signout = (next) => {
  console.log("inside signout");
  removeCookie("token");
  removeLocalStorage("user");
};

//get user info from localstorage

export const isAuth = () => {
  console.log("isAuth------>");
  if (window !== "undefiend") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//update user data in localstorage
// export const updateUser = (response, next) => {
//   if (window !== "undefiend") {
//     let auth = JSON.parse(localStorage.getItem("user"));
//     auth = response.data;
//     localStorage.setItem("user", JSON.stringify(auth));
//   }
//   next();
// };
