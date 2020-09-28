import React from "react";
import {
  addCategory,
  getCategory,
} from "../../Redux/Actions/Action_AddGetCategoryDetails";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Profile from "../ProfileDetails/Profile";
import AddCategoryPopUp from "../AddCategoryPopUp/AddCategoryPopUp";
import Setting from "../Settinges/Setting";
import { Link } from "react-router-dom";
// const userData = JSON.parse(localStorage.getItem("user"));
// // const UserEmail = userData.email
// JSON.stringify(localStorage.setItem('UserEmail', UserEmail));

// console.log(USEREMAIL)
class navBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryManagment: {
        categoryName: "",
        categoryTotalPrice: "",
      },

      categoryManagmentErrors: {
        categoryNameError: "",
        categoryTotalPriceError: "",
      },

      modelClose: false,
      googleProfileData: {},
      UserEmail: localStorage.getItem("UserEmail"),
      AllData: JSON.parse(localStorage.getItem("RegisteredUser")),
      googleAuthToken: localStorage.getItem("googleAuthToken"),

      newName: "",
    };
  }

  handleInputChange = (event) => {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;

    this.setState((prevState) => {
      prevState.categoryManagment[name] = value;
      return {
        categoryManagment: prevState.categoryManagment,
      };
    });
  };

  // handleOnChangeForName = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  validate = () => {
    let categoryManagmentErrors = this.state.categoryManagmentErrors;
    let categoryManagment = this.state.categoryManagment;

    let validName = false;
    let validPrice = false;

    categoryManagmentErrors.categoryNameError = "";
    categoryManagmentErrors.categoryTotalPriceError = "";

    // console.log("------>",categoryManagment.categoryName)
    if (categoryManagment.categoryName) {
      validName = true;
      if (!categoryManagment.categoryName.match(/^[a-zA-Z ]*$/)) {
        validName = false;
        categoryManagmentErrors.categoryNameError =
          "Please Enter Alphabet Characters Only";
      }
    } else {
      categoryManagmentErrors.categoryNameError = "Please Enter Category Name";
      validName = false;
    }

    if (categoryManagment.categoryTotalPrice) {
      validPrice = true;
      if (categoryManagment.categoryTotalPrice.match(/^[a-zA-Z]*$/)) {
        validPrice = false;
        categoryManagmentErrors.categoryTotalPriceError =
          "Please Enter Number Only";
      }

      if (categoryManagment.categoryTotalPrice <= 0) {
        validPrice = false;
        categoryManagmentErrors.categoryTotalPriceError =
          "Please Enter Price More Than 0";
      }
    } else {
      categoryManagmentErrors.categoryTotalPriceError =
        "Please Enter Total Price";
      validPrice = false;
    }

    this.setState({
      categoryManagmentErrors,
    });

    if (validName === true && validPrice === true) {
      return true;
    }
    return false;
  };

  handlePopUpCategoryAdd = () => {
    let isValidForm = this.validate();

    if (isValidForm) {
      this.setState({
        modelClose: isValidForm,
      });

      let email = localStorage.getItem("UserEmail");

      // console.log("Email", email);
      this.props.addCategory({
        categoryName: this.state.categoryManagment.categoryName,
        categoryAmount: this.state.categoryManagment.categoryTotalPrice,
        UserEmail: email,
        // UserEmail : UserEmail ,
      });

      // this.props.getCategory({UserEmail})
    } else {
      // alert("Something Went Wrong...!! Please Check Input Value");
      toast("Please Check Details", { type: "error" });
    }
  };

  handleLogout = () => {
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("googleAuthToken");
  };

  componentDidMount = () => {
    let googleResponse = JSON.parse(localStorage.getItem("GoogleResponse"));
    this.setState({
      googleProfileData: googleResponse,
    });
    // axios
    //   .get("http://localhost:3004/googleProfileData")
    //   .then((res) => {
    //     // console.log("res", res);
    //     // console.log("data------->", this.state.AllData.name);
    // this.setState({
    //   googleProfileData: res.data,
    // });
    //   })
    //   .catch((error) => {
    //     console.log("Errors-->", error);
    //   });
  };

  deleteCategory = (singleData) => {
    let categoryId = singleData.categoryId;

    let tempArray = [];
    let categoryData = JSON.parse(localStorage.getItem("CategoryDetails"));

    categoryData.map((x) => {
      if (x.categoryId !== categoryId) {
        tempArray.push(x);
      }
    });

    let checkStatus = localStorage.setItem(
      "CategoryDetails",
      JSON.stringify(tempArray)
    );

    let obj = {
      categoryId: 0,
      categoryName: "",
      categoryAmount: "",
      RemainingAmount: 0,
      SpentList: [],
      UserEmail: "",
    };

    this.props.getCategory(this.state.UserEmail);
    this.props.goToDashboard(obj);

    // console.log(tempArray);
  };

  editName = (singleData, newName) => {
    let categoryId = singleData.categoryId;

    let tempArray = [];

    // console.log(categoryId, newName);
    let categoryData = JSON.parse(localStorage.getItem("CategoryDetails"));

    categoryData.map((x) => {
      if (x.categoryId === categoryId) {
        x.categoryName = newName;
      }
      tempArray.push(x);
    });

    let checkStatus = localStorage.setItem(
      "CategoryDetails",
      JSON.stringify(tempArray)
    );
    this.props.getCategory(this.state.UserEmail);

    // this.props.addExpense({
    //   categoryObject: this.state.categories,
    // });

    // console.log("new", this.state.categories);
    // this.props.goToDashboard(this.state.categories);
  };

  handleCategoryChange = (e) => {
    console.log("id", e.categoryId);
    let categoryId = e.categoryId;

    let tempArray = [];

    // console.log(categoryId, newName);
    let categoryData = JSON.parse(localStorage.getItem("CategoryDetails"));
    categoryData.map((x) => {
      if (x.categoryId === categoryId) {
        x.Status = !x.Status;
      }
      tempArray.push(x);
    });

    console.log("changed", tempArray);
    let checkStatus = localStorage.setItem(
      "CategoryDetails",
      JSON.stringify(tempArray)
    );
    this.props.getCategory(this.state.UserEmail);
  };

  handleSurvay = () => {
    this.props.history.push("/survay");
  };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg  navbar-dark "
          style={{ background: "#0d344b" }}
        >
          <a className="navbar-brand" href="#">
            Expense Management System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <a className="nav-link" href="#">
                  {" "}
                  <span className="sr-only"></span>
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" id="testing">
              <button
                className="btn  my-2 my-sm-0"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever="@mdo"
              >
                <span style={{ color: "white" }}>Add Category</span>
                {/* <i className="fa fa-plus-circle" /> */}
              </button>
              {/* <button
                onClick={this.handleSurvay}
                className="btn  my-2 my-sm-0"
                type="button"
              >
                <span style={{ color: "white" }}>Survay</span>
              </button> */}
              <Link
                to={{
                  pathname: "/survay",
                }}
              >
                <button
                  className="btn  my-2 my-sm-0"
                  type="button"
                  style={{ color: "white" }}
                >
                  Survay
                </button>
              </Link>

              <button
                className="btn  my-2 my-sm-0"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal2"
                data-whatever="@mdo"
                style={{ color: "white" }}
                onClick={this.checking}
              >
                Setting
              </button>
              <button
                className="btn  my-2 my-sm-0"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal1"
                data-whatever="@mdo"
                style={{ color: "white" }}
                onClick={this.checking}
              >
                Profile
              </button>

              <button className="btn btn-dark" onClick={this.handleLogout}>
                Logout
              </button>
            </form>
          </div>

          {/* Profile */}
          <Profile
            googleAuthToken={this.state.googleAuthToken}
            googleProfileData={this.state.googleProfileData}
            UserEmail={this.state.UserEmail}
            AllData={this.state.AllData}
          />
          {/* Add Category Model */}
          <AddCategoryPopUp
            categoryName={this.state.categoryName}
            handleInputChange={this.handleInputChange}
            categoryManagmentErrors={this.state.categoryManagmentErrors}
            categoryTotalPrice={this.state.categoryTotalPrice}
            handlePopUpCategoryAdd={this.handlePopUpCategoryAdd}
          />

          <Setting
            deleteCategory={this.deleteCategory}
            editName={this.editName}
            isActive={this.state.isActive}
            handleCategoryChange={this.handleCategoryChange}
          />
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCategory,
  getCategory,
};

// export default navBar;
export default connect(null, mapDispatchToProps)(navBar);
