import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
function UserDashBoard() {
  const {
    user: { name, email, role, lastname, _id },
  } = isAuthenticated();

  return (
    <Base title="welcome to your profile" description="happy shopping">
      <div className="container-lg bg-info p-5">
        <div className="col-md-6 offset-sm-3 text-left">
          <div class="card fluid" style={{ width: "30rem" }}>
            <div class="card-header text-warning text-center lead bold ">
              <h3>
                welcome {name} {lastname ? lastname : ""}
              </h3>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item text-dark form-control">
                Name : {name}
              </li>
              <li class="list-group-item text-dark form-control">
                Email : {email}
              </li>
              <li class="list-group-item text-dark form-control">
                role : {role > 0 ? "ADMIN" : "NORMAL USER"}
              </li>
              <Link to={`/user/purchaselist/${_id}`}>
                <button className=" btn  btn-outline-dark  lead ">
                  purchase List
                </button>
              </Link>
            </ul>
          </div>
        </div>
        <div className="row ">
          <div className="col-8 offset-sm-4">
            <Link
              className="btn btn-outline-dark  m-5 "
              to={`/user/update/${_id}`}
            >
              <span>Update Info</span>
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default UserDashBoard;
