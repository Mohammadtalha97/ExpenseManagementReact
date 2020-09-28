import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategory } from "../../Redux/Actions/Action_AddGetCategoryDetails";

import { addExpense } from "../../Redux/Actions/Action_DescriptionAndSpentAmout";

// import Switch from "react-switch";
import Switch from "react-switch";

import "../../assests/Style/switch.css";

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: JSON.stringify(localStorage.getItem("UserEmail")),
      categories: [],
      newName: "",
    };
  }

  componentDidMount = () => {
    this.props.getCategory(this.state.userEmail);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.categoriesAreComing != this.props.categoriesAreComing) {
      this.setState({
        categories: nextProps.categoriesAreComing,
      });
    }
  }

  handleNameEdit = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        {/* Profile */}
        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  Settinges
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul style={{ listStyleType: "none", fontSize: "25px" }}>
                  {this.state.categories.map((value, index) => (
                    <li className="mb-4 p-3" key={index}>
                      <i className="fa fa-home mr-3"></i>
                      <label>{value.categoryName}</label>
                      <input
                        style={{ width: "30%" }}
                        type="text"
                        name="newName"
                        placeholder="add new name"
                        onChange={this.handleNameEdit}
                      />
                      <button
                        onClick={() => {
                          this.props.deleteCategory(value);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>{" "}
                      <button
                        onClick={() =>
                          this.props.editName(value, this.state.newName)
                        }
                      >
                        <i className="fa fa-edit"></i>
                      </button>{" "}
                      <label className="switch mr-2">
                        <input
                          type="checkbox"
                          className="toggle-switch"
                          onClick={() => this.props.handleCategoryChange(value)}
                          defaultChecked={value.Status}
                        />
                        <span className="slider round"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesAreComing: state.AddGetCategory.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (x) => dispatch(getCategory(x)),
    addExpense: (x) => dispatch(addExpense(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
