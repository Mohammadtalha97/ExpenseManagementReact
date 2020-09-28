import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategory } from "../../Redux/Actions/Action_AddGetCategoryDetails";

class sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: JSON.stringify(localStorage.getItem("UserEmail")),
      categories: [],
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

  render() {
    return (
      <div style={{ color: "white" }}>
        <div className="pt-2 pb-2 mb-4 mt-2">
          <span style={{ fontSize: "30px" }}>Consume Expense</span>
        </div>
        <div>
          <ul style={{ listStyleType: "none", fontSize: "25px" }}>
            {this.state.categories.map((value, index) =>
              value.Status ? (
                <li className="mb-4 p-3" key={index}>
                  <i className="fa fa-home mr-3"></i>
                  <button
                    onClick={() => {
                      this.props.goToDashboard(value);
                    }}
                  >
                    {value.categoryName}
                  </button>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
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
  };
};

// export default sidebar
export default connect(mapStateToProps, mapDispatchToProps)(sidebar);
