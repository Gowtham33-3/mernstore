import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateUserProfile } from "./helper/userapicalls";

function UpdateUser() {
  const [updateUser, setUpdateUser] = useState({
    name: "",
    lastname: "",
    email: "",
    error: "",
    success: false,
  });
  const { name, lastname, email, error, success } = updateUser;
  const { user, token } = isAuthenticated();
  const preload = () => {
    setUpdateUser({
      ...updateUser,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    setUpdateUser({
      ...updateUser,
      error: false,
      [name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    updateUserProfile(user._id, token, { name, lastname, email }).then(
      (data) => {
        if (data.err) {
          setUpdateUser({ ...updateUser, _error: true });
        } else {
          setUpdateUser({
            name: "",
            email: "",
            lastname: "",
            error: "",
            success: true,
          });
        }
      }
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? " " : "none" }}
          >
            UserInfo updated successfully
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const updateForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <br />
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signup Page" description="A page for user signup!">
      {successMessage()}
      {errorMessage()}
      {updateForm()}
      <p className="text-white text-center">{JSON.stringify(updateUser)}</p>
    </Base>
  );
}

export default UpdateUser;
