import React from "react";
// import authSvg  from '../assests/auth.svg';
import authSvg from "../../assests/Images/auth.svg";
import { toast } from "react-toastify";
import { authenticate, isAuth } from "../auth";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import axios from "axios";

toast.configure();

//GoogleVerification
const CLIENT_ID =
  "804445633111-doj9b88cckqcio1aash473bk8bc79h18.apps.googleusercontent.com";

//Email Regex
const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

//numberForPasswordChecking
const isNumberRegx = /\d/;

//capitalLeterForPasswordChecking
const isCapital = /[A-Z]/;

//specialCharacterForPasswordChecking
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      errors: [],

      //passwordstrength
      passwordFocused: false,
      passwordvalidity: {
        minChar: null,
        number: null,
        specialChar: null,
        capital: null,
      },

      isLogined: false,
      accessToken: "",

      //google
      google: [],
    };
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        if (value) {
          if (validEmailRegex.test(value)) {
            errors.email = "";
          } else {
            errors.email = "Enter Valid Email Only";
          }
        } else {
          errors.email = "Please Enter Email";
        }
        break;

      case "password1":
        if (value) {
          if (value.length < 8) {
            errors.password1 = "Minimum 8 Character Required";
          } else {
            errors.password1 = "";
          }
        } else {
          errors.password1 = "Please Enter Password";
        }
        break;

      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email === "" || this.state.password1 === "") {
      toast("Please Enter All Details", { type: "error" });
    } else {
      if (
        this.state.errors.email === "" &&
        this.state.errors.password1 === ""
      ) {
        let request = {};
        request.email = this.state.email;
        request.password = this.state.password1;

        // console.log("request-->", request);

        let userDataFromLocalStorage = JSON.parse(
          localStorage.getItem("RegisteredUser")
        );

        // console.log("userDataFromLocalStorage", userDataFromLocalStorage);

        // if (userDataFromLocalStorage) {
        //   let registerEmail = userDataFromLocalStorage.email;
        //   let registeredPassword = userDataFromLocalStorage.password;

        //   if (
        //     request.email === registerEmail &&
        //     request.password === registeredPassword
        //   ) {
        //     localStorage.setItem("UserEmail", JSON.stringify(request.email));
        //     this.props.history.push("/dashboard");
        //     toast.success(`Hey ${userDataFromLocalStorage.name}, Welcome `, {
        //       type: "success",
        //     });
        //   } else {
        //     toast("Invalid Username Or Password", { type: "error" });
        //   }
        // } else {
        //   toast("This user is not registered", { type: "error" });
        // }

        // console.log(registerEmail, registeredPassword);

        // if (registerEmail) {
        // } else {
        // }

        axios
          // .post("http://localhost:5000/api/login", request)
          .post(
            "https://node-assignemtn-talha.herokuapp.com/api/login",
            // "http://localhost:5000/api/login",
            request
          )
          .then((res) => {
            console.log("then -->", res);
            localStorage.setItem("UserEmail", this.state.email);
            authenticate(res, () => {
              this.setState({
                email: "",
                password1: "",
              });
              // toast.success("Login Successfull", { type : "success"});
            });

            isAuth() && isAuth().role === "admin"
              ? this.props.history.push("/admin")
              : this.props.history.push("/dashboard");
            toast.success(`Hey ${res.data.user.name}, Welcome Back`, {
              type: "success",
            });
          })
          .catch((err) => {
            console.log("error--->", err);
            toast(err.response.data.error, { type: "error" });
          });
      } else {
        toast("Please Enter Valid Details", { type: "error" });
      }
    }
  };

  login = (response) => {
    // console.log("google", response.profileObj);
    // console.log("email", response.profileObj.email);
    // console.log("name", response.profileObj.name);
    // console.log("googleId", response.profileObj.googleId);
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
    }

    let googleData = {};
    googleData.email = response.profileObj.email;
    googleData.name = response.profileObj.name;
    googleData.googleId = response.profileObj.googleId;
    googleData.accessToken = response.accessToken;

    localStorage.setItem("googleAuthToken", this.state.accessToken);
    localStorage.setItem(
      "UserEmail",
      JSON.stringify(response.profileObj.email)
    );
    localStorage.setItem("GoogleResponse", JSON.stringify(googleData));

    let googleToken = localStorage.getItem("googleAuthToken");

    if (googleToken) {
      this.props.history.push("/dashboard");
    }
    // axios
    //   .post("http://localhost:3004/googleProfileData", googleData)
    //   .then((res) => {
    // let googleToken = localStorage.getItem("googleAuthToken");

    // if (googleToken) {
    //   this.props.history.push("/dashboard");
    // }
    //   })
    //   .catch((error) => {
    //     console.log("error--->", error);
    //   });
  };

  logout = (response) => {
    localStorage.removeItem("googelAuthToken");

    this.setState((state) => ({
      isLogined: false,
      accessToken: "",
    }));
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        {/* {
                isAuth() ? <Redirect to="/"/> : null
            } */}
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
              <form
                className="w-full flex-1 mt-8 text-indigo-500"
                onSubmit={this.handleSubmit}
              >
                <div className="mx-auto max-w-xs relative">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-pray-100 border border-gray-200  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  />
                  <small className="form-text text-danger">
                    {this.state.errors.email}
                  </small>

                  <input
                    type="password"
                    name="password1"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                    value={this.state.password1}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-pray-100 border border-gray-200  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  />
                  <small className="form-text text-danger">
                    {this.state.errors.password1}
                  </small>

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700"
                  >
                    Login
                  </button>
                  <a
                    href="/users/password/forget"
                    className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                  >
                    Forgot Password...?
                  </a>
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      With Google
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    {this.state.isLogined ? (
                      <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                      ></GoogleLogout>
                    ) : (
                      <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.login}
                        onFailure={this.handleLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        responseType="code,token"
                      />
                    )}
                  </div>

                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign up
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <a
                    href="/"
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm  focus:shadow-outline  mt-5    "
                  >
                    Sign UP
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${authSvg})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
