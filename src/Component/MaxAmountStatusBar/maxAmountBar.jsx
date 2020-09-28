import React, { Component } from "react";

// import { getCategory } from "../../Redux/Actions/Action_AddGetCategoryDetails";
import { connect } from "react-redux";
import { addExpense } from "../../Redux/Actions/Action_DescriptionAndSpentAmout";
import { toast } from "react-toastify";

class maxAmountBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catgoryDetails: {},
      newMaxAmount: "",
      remainingAmount: "",
      maxAmoutn: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillReceiveProps = (props) => {
    // console.log('maxpage props',props)
    this.state.catgoryDetails = props.categoryDetails;
    this.state.remainingAmount = props.remaingAmount;
    this.state.maxAmoutn = props.maxAmount;
  };

  validate = () => {
    let valid = false;

    if (this.state.newMaxAmount) {
      if (this.state.newMaxAmount <= 0) {
        valid = false;
        toast("Please Enter Amount More Than 0", { type: "error" });
      } else {
        valid = true;
      }
    } else {
      valid = false;
      toast("Please Enter Amount", { type: "error" });
    }

    return valid;
  };

  editAmount = () => {
    let valid = this.validate();
    // console.log("old", this.state.catgoryDetails);
    // console.log("max", this.state.newMaxAmount);
    console.log(valid);
    if (valid) {
      this.state.catgoryDetails.categoryAmount =
        parseInt(this.state.catgoryDetails.categoryAmount) +
        parseInt(this.state.newMaxAmount);

      this.state.catgoryDetails.RemainingAmount =
        parseInt(this.state.catgoryDetails.RemainingAmount) +
        parseInt(this.state.newMaxAmount);

      // console.log("new", this.state.catgoryDetails);
      this.props.addExpense({
        categoryObject: this.state.catgoryDetails,
      });

      // console.log(this.state.categoryDetails);
      this.props.goToDashboard(this.state.catgoryDetails);
    }
  };

  render() {
    // console.log('maxpage render', this.state.remainingAmount)
    return (
      <div className="row pt-3" style={{ height: "50px", fontSize: "20px" }}>
        <div className="col-8 d-flex   justify-content-center">
          <span className="mt-1" style={{ width: "150px", fontWeight: "bold" }}>
            Max Amount {this.state.maxAmoutn}
          </span>

          <input
            className=" form-control ml-2 mr-2"
            style={{ width: "250px", fontSize: "20px", fontWeight: "bold" }}
            // value={this.state.maxAmoutn}
            onChange={this.handleChange}
            name="newMaxAmount"
            type="text"
          />

          {/* {this.state.errors.newMaxAmount
            ? 
            : ""} */}
          <button
            className=" btn text-white"
            style={{ background: "#0d344b" }}
            onClick={this.editAmount}
          >
            Add
          </button>
        </div>
        <div className="col-4 ">
          <span style={{ fontWeight: "bold" }}>
            Remaining Amount : {this.state.remainingAmount}{" "}
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getCategory: (x) => dispatch(getCategory(x)),
    addExpense: (x) => dispatch(addExpense(x)),
  };
};

export default connect(null, mapDispatchToProps)(maxAmountBar);
