import { API } from "../../backend";

//get user
export const getUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("RESPONSE", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
//update user
export const updateUserProfile = (userId, token, user) => {
  console.log(user);
  return fetch(`${API}/user/${userId}`, {
    method: "Put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
