import React from "react";
import { toast } from "react-toastify";

import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import MaxAmountBar from "../MaxAmountStatusBar/maxAmountBar";
import CenterPage from "../CenterDisplayPage/CenterPage";
import AddDetailsPage from "../AddDetailsPage/AddDetailPage";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryDetails: {},
      maxAmount: "",

      editObject: {
        editDescription: "",
        editValue: "",
        editspentId: "",
      },

      categoryAdded: JSON.parse(localStorage.getItem("CategoryDetails")) || [],
      isCategory: false,
      spentlist: [],
    };
    // console.log("length", Object.keys(this.state.categoryAdded).length === 0);
  }

  goToDashboard = (val) => {
    this.setState({
      categoryDetails: val,
    });
  };

  handleEditValue = (desc, amount, id) => {
    let newEdit = {
      editDescription: desc,
      editValue: amount,
      editspentId: id,
    };

    this.setState({
      editObject: newEdit,
    });
  };

  // componentDidMount = () => {
  //   let spentlist = this.state.categoryAdded.SpentList;

  //   this.setState({
  //     spentlist: spentlist,
  //   });
  // };
  render() {
    // console.log("ss", this.state.categoryAdded);
    console.log("Catego:", this.state.categoryDetails);
    return (
      <div
        className="container-fluid"
        style={{
          maxHeight: "968px",
          margin: "0px",
          padding: "0px",
          overflow: "hidden",
        }}
      >
        <Navbar goToDashboard={this.goToDashboard} />

        <div
          className="row bg-info"
          style={{ minHeight: "913px", margin: "0px" }}
        >
          <div
            className="col-3 "
            style={{ background: "#1b5465", padding: "0px" }}
          >
            <Sidebar goToDashboard={this.goToDashboard} />
          </div>
          {/* {this.state.categoryAdded.categoryId ? ( */}
          <div className="col-9 bg-info">
            <MaxAmountBar
              categoryDetails={this.state.categoryDetails}
              maxAmount={this.state.categoryDetails.categoryAmount}
              remaingAmount={this.state.categoryDetails.RemainingAmount}
              goToDashboard={this.goToDashboard}
            />
            <div className="row mt-4" style={{ height: "839px" }}>
              <div className="col-8" style={{ padding: "0px" }}>
                <CenterPage
                  goToDashboard={this.goToDashboard}
                  categoryDetails={this.state.categoryDetails}
                  remaingAmount={this.state.categoryDetails.RemainingAmount}
                  handleEditValue={this.handleEditValue}
                />
              </div>
              <div className="col-4">
                <AddDetailsPage
                  goToDashboard={this.goToDashboard}
                  categoryDetails={this.state.categoryDetails}
                  editObject={this.state.editObject}

                  // categoryAdded={this.state.categoryAdded}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
