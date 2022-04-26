import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase-config";
import "firebase/analytics";
import "firebase/auth";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
var axios = require("axios").default;
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//***************** Redirect review item to signIn ************************

export const AdminRoute = ({ children, ...rest }) => {
  const user = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("role_foodie") === "admin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const getUser = (user) => {
  try {
    axios.get("http://localhost:3001/user/getMe").then((response) => {
      return response.message;
    });
  } catch (e) {
    return {
      message: "not found",
    };
  }
};

const Auth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken_foodie");
    const data = localStorage.getItem("UserData_foodie");
    setUser({ data, token });
  }, []);

  //***************** sign in with popup Start ************************
  const signInWithGoogle = () => {
    try {
      axios
        .post("http://localhost:3001/api/v1/loginGoogle", {})
        .then((response) => {
          console.log(response);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = ({ email, password }) => {
    console.log(email + password);
    try {
      axios
        .post("http://localhost:3001/api/v1/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            localStorage.setItem("authToken_foodie", response.data.token);
            localStorage.setItem("UserData_foodie", response.data.data.name);
            localStorage.setItem("role_foodie", response.data.data.role);
            console.log(response.data.data.role);
            setUser({ name: response.data.name, token: response.data.token });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = ({
    email,
    password,
    firstName,
    lastName,
    passwordConfirm,
    phoneNumber,
  }) => {
    console.log(
      email + password + firstName + lastName + passwordConfirm + phoneNumber
    );
    const signUpStatus = false;
    try {
      if (email && password && firstName && lastName) {
        axios
          .post("http://localhost:3001/api/v1/user/signup", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            passwordConfirm: password,
            password: password,
            phoneNumber: phoneNumber,
          })
          .then((response) => {
            console.log(response);
            if (response.data.statusCode === 201) {
              localStorage.setItem("authToken_foodie", response.data.token);
              localStorage.setItem("UserData_foodie", response.data.data);
              setUser({
                name: response.data.data.name,
                token: response.data.token,
              });
            }
            return response;
          });
      }
    } catch (err) {
      console.log(err);
      return "error";
    }
    return signUpStatus;
  };

  const signOut = () => {
    if (localStorage.getItem("authToken_foodie")) {
      localStorage.removeItem("authToken_foodie");
      localStorage.removeItem("role_foodie");
      setUser(undefined);
    }
    // redirect to home page  @Himanshu
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
};

export default Auth;
