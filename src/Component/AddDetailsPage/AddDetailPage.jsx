import React, { Component } from "react";

import { connect } from "react-redux";
import { toast } from "react-toastify";

import { addExpense } from "../../Redux/Actions/Action_DescriptionAndSpentAmout";

class addDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryObject: {},
      categoryId: this.props.categoryId,

      maxAmountDeclared: "",

      categoryDetails: {
        categoryId: "",
        description: "",
        spentAmount: "",
      },

      editspentId: "",
      errorsCategoryDetails: {
        errorDescription: "",
        errorSpentAmount: "",
        errorMaxAmountDeclared: "",
      },
      UserEmail: localStorage.getItem("UserEmail"),
    };
  }

  handleOnChange = (event) => {
    event.preventDefault();

    let name = event.target.name;
    let value = event.target.value;

    this.setState((prevState) => {
      prevState.categoryDetails[name] = value;
      return {
        categoryDetails: prevState.categoryDetails,
      };
    });
  };

  componentWillReceiveProps = (props) => {
    this.setState({
      categoryObject: props.categoryDetails,
    });

    let { editDescription, editValue, editspentId } = props.editObject;

    this.setState({
      categoryDetails: {
        description: editDescription,
        spentAmount: editValue,
      },
      editspentId: editspentId,
    });
  };

  validate = () => {
    let errorsCategoryDetails = this.state.errorsCategoryDetails;
    let categoryDetails = this.state.categoryDetails;

    let validDescription = false;
    let validspentAmount = false;

    errorsCategoryDetails.errorDescription = "";
    errorsCategoryDetails.errorSpentAmount = "";

    // console.log("------>",categoryManagment.categoryName)
    if (categoryDetails.description) {
      validDescription = true;
    } else {
      errorsCategoryDetails.errorDescription = "Please Enter Description";
      validDescription = false;
    }

    if (categoryDetails.spentAmount) {
      validspentAmount = true;
      if (categoryDetails.spentAmount.match(/^[a-zA-Z]*$/)) {
        validspentAmount = false;
        errorsCategoryDetails.errorSpentAmount = "Please Enter Number Only";
      }

      // console.log(categoryDetails.spentAmount , this.state.categoryObject.RemainingAmount)
      if (
        categoryDetails.spentAmount > this.state.categoryObject.RemainingAmount
      ) {
        validspentAmount = false;
        errorsCategoryDetails.errorSpentAmount =
          "Amount Should Be Less Than Declared";
      }

      if (categoryDetails.spentAmount <= 0) {
        validspentAmount = false;
        errorsCategoryDetails.errorSpentAmount =
          "Amount Should Be Grater Than 0";
      }
    } else {
      errorsCategoryDetails.errorSpentAmount = "Please Enter Price";
      validspentAmount = false;
    }

    this.setState({
      errorsCategoryDetails,
    });

    if (validDescription === true && validspentAmount === true) {
      return true;
    }
    return false;
  };

  handleDetailsOfCategory = (event) => {
    event.preventDefault();

    let checkStatus = this.validate();

    if (checkStatus) {
      let newExpense = {
        spentId:
          (this.state.categoryObject.SpentList || []).length === 0
            ? 1
            : Math.max(
                ...this.state.categoryObject.SpentList.map((x) => {
                  return x.spentId;
                })
              ) + 1,
        description: this.state.categoryDetails.description,
        spentAmount: this.state.categoryDetails.spentAmount,
      };

      this.state.categoryObject.SpentList.push(newExpense);

      this.state.categoryObject.RemainingAmount =
        this.state.categoryObject.RemainingAmount -
        this.state.categoryDetails.spentAmount;

      this.props.addExpense({
        categoryObject: this.state.categoryObject,
      });

      this.props.goToDashboard(this.state.categoryObject);
    } else {
      // alert("Something Went Wrong...!! Please Check Input Value");
      toast("Please Check Details", { type: "error" });
    }
    // console.log(this.state.categoryDetails)
  };

  handleEditDetails = (event) => {
    event.preventDefault();
    let checkStatus = this.validate();

    if (checkStatus) {
      let tempSpentList = [];
      let oldValue = "";
      let newValue = "";
      // console.log(this.state.editspentId);
      this.state.categoryObject.SpentList.map((x) => {
        if (x.spentId === this.state.editspentId) {
          oldValue = x.spentAmount;
          x.spentAmount = this.state.categoryDetails.spentAmount;
          x.description = this.state.categoryDetails.description;

          newValue = this.state.categoryDetails.spentAmount;
        }
        tempSpentList.push(x);
      });

      console.log("old------->", oldValue, "new---->", newValue);
      this.state.categoryObject.RemainingAmount =
        parseFloat(this.state.categoryObject.RemainingAmount) +
        parseFloat(oldValue) -
        parseFloat(newValue);

      this.state.categoryObject.SpentList = tempSpentList;
      // console.log(this.state.categoryObject);
      this.props.addExpense({
        categoryObject: this.state.categoryObject,
      });

      this.props.goToDashboard(this.state.categoryObject);
    } else {
      toast("Please Check Details", { type: "error" });
    }
  };
  render() {
    return (
      <div>
        <form className="form-group">
          <div className="d-flex flex-column">
            <textarea
              className="form-control mb-4 "
              value={this.state.categoryDetails.description}
              name="description"
              onChange={this.handleOnChange}
              rows="3"
              style={{ height: "200px" }}
              placeholder="Description"
            ></textarea>
            <span className="alert-danger">
              {this.state.errorsCategoryDetails.errorDescription}
            </span>

            <input
              type="text"
              className="form-control mb-4 "
              onChange={this.handleOnChange}
              name="spentAmount"
              value={this.state.categoryDetails.spentAmount}
              style={{ height: "60px", fontSize: "25px", fontWeight: "bold" }}
              placeholder="Expense Amount"
            />
            <span className="alert-danger">
              {this.state.errorsCategoryDetails.errorSpentAmount}
            </span>

            {/* <input type="file" className="mb-4"/> */}
            <div className="row p-2">
              <button
                className="btn text-white p-2"
                style={{
                  background: "#0d344b",
                  width: "110px",
                  fontSize: "25px",
                }}
                onClick={this.handleDetailsOfCategory}
                disabled={
                  Object.keys(this.state.categoryObject).length <= 0
                    ? true
                    : false
                }
              >
                Save
              </button>

              {this.props.editObject.editspentId === "" ? (
                ""
              ) : (
                <button
                  className="btn text-white p-2 ml-4"
                  style={{
                    background: "#0d344b",
                    width: "110px",
                    fontSize: "25px",
                  }}
                  onClick={this.handleEditDetails}
                  // disabled = {Object.keys(this.state.categoryObject).length <=0 ? true : false}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = {
//     addExpense,
// }

const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (x) => dispatch(addExpense(x)),
  };
};

export default connect(null, mapDispatchToProps)(addDetailPage);
