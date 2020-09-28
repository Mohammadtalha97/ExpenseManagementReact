import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div>
        {/* Profile */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  User Profile
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
                  {this.props.googleAuthToken ? (
                    <div style={{ fontSize: "18px" }}>
                      <li>
                        <b>Email </b>: {this.props.googleProfileData.email}
                      </li>
                      <li>
                        <b>Name </b>: {this.props.googleProfileData.name}
                      </li>
                      <li>
                        <b>GoogleId</b> :{" "}
                        {this.props.googleProfileData.googleId}
                      </li>
                    </div>
                  ) : this.props.UserEmail ? (
                    <li style={{ fontSize: "18px" }}>
                      <b>Email</b> : {this.props.UserEmail}
                      <br />
                      <b>Name</b> : {this.props.AllData.name}
                    </li>
                  ) : (
                    <b>No</b>
                  )}
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
