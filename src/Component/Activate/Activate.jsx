import React, { useState, useEffect } from "react";
// import authSvg from '../assests/welcome.svg';
import authSvg from "../../assests/Images/welcome.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwt from "jsonwebtoken";
// import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from "react-router-dom";

export default class Activate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      token: "",
      show: true,
    };
  }

  //    componentWillReceiveProps = () => {
  //        let token = this.props.match.params.token;
  //        let name = jwt.decode(token)
  //         console.log(name)
  //        if(token)
  //        {
  //            this.setState({
  //                name : name,
  //                token : token
  //            })
  //        }
  //    }

  componentDidMount = () => {
    let token = this.props.match.params.token;
    let { name } = jwt.decode(token);
    // console.log(name)
    if (token) {
      this.setState({
        name: name,
        token: token,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //    console.log(this.state)
    //    console.log("token", this.state.token)

    let request = {};
    request.token = this.state.token;

    // .post("http://localhost:5000/api/activation", request)
    axios
      .post(
        "https://node-assignemtn-talha.herokuapp.com/api/activation",
        // "http://localhost:5000/api/activation",
        request

        // {
        //   headers :{
        //     "Access-Control-Allow-Origin" : "*"
        //   }
        // }
      )
      .then((res) => {
        console.log("in then", res);
        this.setState({
          show: false,
        });
        toast.success(res.data.message, { type: "success" });
      })
      .catch((err) => {
        console.log("in catch", err);
        toast(err.response.data.error, { type: "error" });
      });
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        {/* {isAuth() ? <Redirect to='/' /> : null} */}
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Welcome {this.state.name}
              </h1>

              <form
                className="w-full flex-1 mt-8 text-indigo-500"
                onSubmit={this.handleSubmit}
              >
                <div className="mx-auto max-w-xs relative ">
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                    <span className="ml-3">Activate your Account</span>
                  </button>
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up again
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                    href="/login"
                    target="_self"
                  >
                    {/* <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" /> */}
                    <span className="ml-4">Sign In</span>
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
