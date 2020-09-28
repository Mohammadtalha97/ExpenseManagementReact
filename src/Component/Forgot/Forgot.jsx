import React from "react";
// import authSvg  from '../assests/auth.svg';
import authSvg from "../../assests/Images/auth.svg";
import { toast } from "react-toastify";
import { authenticate, isAuth } from "../auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

//Email Regex
const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

export default class Registeration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: [],
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
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

      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  validate = () => {};
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email) {
      let request = {};

      request.email = this.state.email;

      console.log("request", request);
      axios
        // .post("http://localhost:5000/api/password/forget", request)
        .post(
          " https://node-assignemtn-talha.herokuapp.com/api/password/forget",
          request
        )
        .then((res) => {
          this.setState({
            email: "",
          });
          toast.success("Please Check Your Email", { type: "success" });
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data.message, { type: "error" });
        });
    } else {
      toast("Please Enter Email", { type: "error" });
    }
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
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Forgot Password
              </h1>
              <form
                autoComplete="off"
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

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700"
                  >
                    Submit
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
