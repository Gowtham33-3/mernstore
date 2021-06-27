import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategory,
  getAllProducts,
  updateCategory,
  deleteProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
  });
  const { name, error, success } = values;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);
  //TODO:work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            error: "",
            success: true,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, name: event.target.value });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h2>update successful</h2>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h2>{error}</h2>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            name="name"
            className="form-control my-3"
            onChange={handleChange("name")}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info my-3">
            Update Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Add a product here!"
      description="Welcome to product updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
