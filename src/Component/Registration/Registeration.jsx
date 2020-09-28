import React from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
//Imported
import PasswordValidation from "../PasswordValidation/PasswordValidation";
import authSvg from "../../assests/Images/auth.svg";
toast.configure();

//Name Regex
const validNameRegex = RegExp(/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/i);

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

export default class Registeration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      errors: [],

      //passwordstrength
      passwordFocused: false,
      passwordvalidity: {
        minChar: null,
        number: null,
        specialChar: null,
        capital: null,
      },
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        if (value) {
          if (value.length < 5) {
            errors.name = "Name Must Be 5 Character Long";
          } else {
            if (validNameRegex.test(value)) {
              errors.name = "";
            } else {
              errors.name = "Please Enter Character Only";
            }
          }
        } else {
          errors.name = "Please Enter Name";
        }
        break;
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
        this.passwordChecking(value);
        break;
      case "password2":
        if (value) {
          if (value.length < 8) {
            errors.password2 = "Password Must Be 8 Character Long";
          } else {
            errors.password2 = "";
          }
        } else {
          errors.password2 = "Please Enter Confirm Password";
        }
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  //ValidatingPassword
  passwordChecking = (value) => {
    let errors = this.state.errors;

    //length=8
    value.length >= 8
      ? (this.state.passwordvalidity.minChar = true)
      : (this.state.passwordvalidity.minChar = false);

    //IsNumber
    isNumberRegx.test(value)
      ? (this.state.passwordvalidity.number = true)
      : (this.state.passwordvalidity.number = false);

    //IsSpecialCharacter
    specialCharacterRegx.test(value)
      ? (this.state.passwordvalidity.specialChar = true)
      : (this.state.passwordvalidity.specialChar = false);

    //IsCapitalCharacter
    isCapital.test(value)
      ? (this.state.passwordvalidity.capital = true)
      : (this.state.passwordvalidity.capital = false);

    //ConditionChecking
    if (
      this.state.passwordvalidity.minChar &&
      this.state.passwordvalidity.number &&
      this.state.passwordvalidity.specialChar &&
      this.state.passwordvalidity.capital
    ) {
      this.state.passwordFocused = false;
      errors.password1 = "";
    } else {
      errors.password1 = "Please Enter Proper Password";
    }
  };

  //ForOpeningPasswordMessages
  setPasswordFocus = () => {
    this.state.passwordFocused = true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password1 === "" ||
      this.state.password2 === ""
    ) {
      toast("Please Enter All Details", { type: "error" });
    } else {
      if (
        this.state.errors.name === "" &&
        this.state.errors.email === "" &&
        this.state.errors.password1 === "" &&
        this.state.errors.password2 === ""
      ) {
        if (this.state.password1 === this.state.password2) {
          let request = {};
          request.name = this.state.name;
          request.email = this.state.email;
          request.password = this.state.password1;

          localStorage.setItem("RegisteredUser", JSON.stringify(request));

          // let userRegisterData = JSON.parse(
          //   localStorage.getItem("RegisteredUser")
          // );
          // if (userRegisterData) {
          //   swal("Good job!", "Registered Successfully", "success");
          //   this.props.history.push("/login");
          // } else {
          //   toast("Something Went Wroung", { type: "error" });
          // }

          // axios
          //   .post("http://localhost:3004/RegisteredUser", googleData)
          //   .then((res) => {
          //     let googleToken = localStorage.getItem("googleAuthToken");

          //     if (googleToken) {
          //       this.props.history.push("/dashboard");
          //     }
          //   })
          //   .catch((error) => {
          //     console.log("error--->", error);
          //   });
          // axios

          // .post("http://localhost:5000/api/register", request)

          axios
            .post(
              " https://node-assignemtn-talha.herokuapp.com/api/register",
              // "http://localhost:5000/api/register",
              request
            )
            .then((res) => {
              this.props.history.push("/login");
              this.setState({
                name: "",
                email: "",
                password1: "",
                password2: "",
              });
              swal("Good job!", "Mail Send To Given Mail Id", "success");
            })
            .catch((err) => {
              console.log("error", err);
              toast(err.response.data.message, { type: "error" });
            });
        } else {
          toast("Password don't matches", { type: "error" });
        }
      } else {
        toast("Please Enter Valid Details", { type: "error" });
      }
    }
  };
  render() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        {/* {isAuth() ? <Redirect to="/" /> : null} */}
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
              <form
                autoComplete="off"
                className="w-full flex-1 mt-8 text-indigo-500"
                onSubmit={this.handleSubmit}
              >
                <div className="mx-auto max-w-xs relative">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-pray-100 border border-gray-200  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  <small className="form-text text-danger">
                    {this.state.errors.name}
                  </small>
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
                    onFocus={() => this.setPasswordFocus()}
                    onChange={this.handleInputChange}
                    value={this.state.password1}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-pray-100 border border-gray-200  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  />

                  {this.state.passwordFocused && (
                    <PasswordValidation
                      validity={this.state.passwordvalidity}
                    />
                  )}

                  <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={this.handleInputChange}
                    value={this.state.password2}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-pray-100 border border-gray-200  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  />
                  <small className="form-text text-danger">
                    {this.state.errors.password2}
                  </small>

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700"
                  >
                    Register
                  </button>

                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign in with email or social login
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <a
                    href="/login"
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm  focus:shadow-outline  mt-5    "
                  >
                    Sign In
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
