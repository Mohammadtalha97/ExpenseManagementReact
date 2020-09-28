import React, { Component } from "react";

export default class AddCategoryPopUp extends Component {
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Category
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
                <form className="d-flex flex-column align-items-center">
                  <div className="form-group row">
                    <label
                      for="recipient-name"
                      className="col-form-label col-5"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control col-7"
                      value={this.props.categoryName}
                      onChange={this.props.handleInputChange}
                      name="categoryName"
                      id="categoryName"
                    />
                  </div>
                  <span className="alert-danger">
                    {this.props.categoryManagmentErrors.categoryNameError}
                  </span>
                  <div className="form-group row mt-4">
                    <label for="message-text" className="col-form-label col-5">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control col-7"
                      value={this.props.categoryTotalPrice}
                      onChange={this.props.handleInputChange}
                      name="categoryTotalPrice"
                      id="categoryTotalPrice"
                    />
                  </div>
                  <span className="alert-danger">
                    {this.props.categoryManagmentErrors.categoryTotalPriceError}
                  </span>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.props.handlePopUpCategoryAdd}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
