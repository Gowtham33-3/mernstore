import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUser } from "./helper/userapicalls";
import { Link } from "react-router-dom";
function UserPurchaseList() {
  const [userProfile, setUserProfile] = useState({
    purchases: [],
  });
  const { user, token } = isAuthenticated();
  const { purchases } = userProfile;
  const orderList = () => {
    getUser(user._id, token)
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          setUserProfile({ purchases: data.purchases });
          console.log(data.purchases);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    orderList();
  }, []);
  return (
    <Base title="Your purchase list" description="Happy Shopping">
      <h3>
        welcome {user.name} {user.lastname ? user.lastname : ""}
      </h3>
      {purchases.map((purchase, i) => {
        return (
          <div className="col-md-8 offset-sm-4 text-left" key={i}>
            <div class="card fluid" style={{ width: "30rem" }}>
              <div class="card-header text-warning text-center lead bold ">
                <h3 className="bold text-warning lead">Order Number {i}</h3>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item text-dark form-control">
                  Name : {purchase.name}
                </li>
                <li class="list-group-item text-dark form-control">
                  Description : {purchase.description}
                </li>
                <li class="list-group-item text-dark form-control">
                  category : {purchase.category.name}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
      <div className="row">
        <div className="col-md-10 offset-sm-5">
          <Link className="btn btn-outline-light m-5 " to={`/user/dashboard`}>
            <span>GO BACK</span>
          </Link>
        </div>
      </div>
    </Base>
  );
}

export default UserPurchaseList;
