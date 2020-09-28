import React, { Component } from "react";
import { connect } from "react-redux";

import { addExpense } from "../../Redux/Actions/Action_DescriptionAndSpentAmout";

class centerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: {},

      editObject: {
        editDescription: "",
        editValue: "",
      },
    };
  }

  componentWillReceiveProps = (props) => {
    // console.log('centerpage props', props)
    this.state.category = props.categoryDetails;
  };

  handleDelete = (spentAmount, i) => {
    // console.log(this.state.category.SpentList[index])
    let tempArray = [];

    this.state.category.RemainingAmount =
      parseFloat(spentAmount) + this.state.category.RemainingAmount;

    this.state.category.SpentList.map((x, index) => {
      if (i !== index) {
        tempArray.push(x);
      }
    });

    this.state.category.SpentList = tempArray;

    this.props.addExpense({
      categoryObject: this.state.category,
    });

    this.props.goToDashboard(this.state.category);

    // console.log("delete",this.state.category)
  };

  render() {
    // console.log("list", this.state.category);
    return (
      <div
        className="d-flex flex-column align-items-center"
        style={{ background: "white", height: "100%", color: "white" }}
      >
        {this.state.category.SpentList != null
          ? this.state.category.SpentList.map((x, index) => (
              <div
                key={index}
                className="card mt-5"
                style={{
                  border: "0px",
                  borderRadius: "25px",
                  width: "60%",
                  boxShadow: "2px 3px 12px black",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    background: "rgb(12 56 70)",
                    borderRadius: "20px 20px 0px 0px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    Spent amount : {x.spentAmount}{" "}
                  </span>

                  <button
                    type="button"
                    className="p-2"
                    onClick={() => {
                      this.props.handleEditValue(
                        x.description,
                        x.spentAmount,
                        x.spentId
                      );
                    }}
                  >
                    <i className="fa fa-pencil" />
                  </button>

                  <button
                    className="p-2"
                    onClick={() => {
                      this.handleDelete(x.spentAmount, index);
                    }}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
                <div
                  className="card-body"
                  style={{
                    background: "#1b5465",
                    textAlign: "left",
                    minHeight: "130px",
                    borderRadius: "0px 0px 20px 20px",
                  }}
                >
                  <span>{x.description}</span>
                </div>
              </div>
            ))
          : ""}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (x) => dispatch(addExpense(x)),
  };
};

export default connect(null, mapDispatchToProps)(centerPage);
