import React, { Component } from "react";
import authSvg from "../../assests/Images/reset.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      password2: "",
      token: "",
      errors: [],
    };

    // console.log("props", this.props.match.params.token);
  }

  componentDidMount = () => {
    let tokenFromURL = this.props.match.params.token;
    if (tokenFromURL) {
      this.setState({
        token: tokenFromURL,
      });
    }
  };

  handleChnage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "password1":
        if (value) {
          if (value.length < 8) {
            errors.password1 = "Password Must Be 8 Character Long";
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password1 && this.state.password2) {
      if (this.state.password1 === this.state.password2) {
        let request = {};
        request.newPassword = this.state.password1;
        request.resetPasswordLink = this.state.token;

        console.log("requestedData--->", request);
        // console.log("path--->", process.env.REACT_APP_API_URL);
        axios
          // .post("http://localhost:5000/api/password/reset", request)
          .post(
            " https://node-assignemtn-talha.herokuapp.com/api/password/reset",
            request
          )
          .then((res) => {
            this.setState({
              password1: "",
              password2: "",
            });

            toast.success(res.data.message);
          })
          .catch((err) => {
            // console.log("error-->", err.response);
            toast.error(err.response.data.error);
          });
      } else {
        toast.error("Password do not match");
      }
    } else {
      toast.error("Please Enter Details");
    }
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <ToastContainer />
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Reset Your Password
              </h1>
              <div className="w-full flex-1 mt-8 text-indigo-500">
                <form
                  className="mx-auto max-w-xs relative "
                  onSubmit={this.handleSubmit}
                >
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="password"
                    name="password1"
                    onChange={this.handleChnage}
                    value={this.state.password1}
                  />
                  <small className="form-text text-danger">
                    {this.state.errors.password1}
                  </small>
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    name="password2"
                    placeholder="Confirm password"
                    onChange={this.handleChnage}
                    value={this.state.password2}
                    // value={password2}
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                    <span className="ml-3">Submit</span>
                  </button>
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
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${authSvg})` }}
            ></div>
          </div>
        </div>
        ;
      </div>
    );
  }
}
