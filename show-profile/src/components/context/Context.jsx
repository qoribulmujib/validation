import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ProviderContext = (props) => {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    password_confirmation: "",
    token: "",
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    email_verified_at: "",
    phone: "",
  });

  const [banner, setBanner] = useState([
    {
      created_at: "",
      description: "",
      id: "",
      image: "",
      image_url: "",
      is_active: "",
      title: "",
      updated_at: "",
    },
  ]);
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    email_verified_at: "",
  });
  const [statusOK, setStatusOK] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [verify, setVerify] = useState("");
  const functionLogin = () => {
    let tempLogin = {
      email: input.email,
      password: input.password,
    };
    axios
      .post(`https://exercise.smtapps.net/api/login`, tempLogin, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((response) => {
        let { access_token, user } = response.data;
        let { name } = user;
        Cookies.set("token", access_token);
        Cookies.set("name", name);
        setSpinner(false);
        navigate("/profile");
        return () => {
          setInput({
            email: "",
            password: "",
            phone: "",
            name: "",
            password_confirmation: "",
          });
        };
      })
      .catch((error) => {
        console.error(error.response);
        setStatusOK(error.response.data.message);
        setVerify(error.response.data);
      });
  };
  const functionRegister = () => {
    let tempRegister = {
      email: input.email,
      password: input.password,
      phone: input.phone,
      name: input.name,
      password_confirmation: input.password_confirmation,
    };
    axios
      .post(`https://exercise.smtapps.net/api/register`, tempRegister)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setStatusOK(error.response.data.phone);
        setStatusOK(error.response.data.email);
      });
    return () => {
      setInput({
        email: "",
        password: "",
        phone: "",
        name: "",
        password_confirmation: "",
      });
    };
  };

  const functionUpdateProfile = () => {
    let tempUpdate = {
      name: input.name,
      phone: input.phone,
    };
    axios
      .post(
        `https://exercise.smtapps.net/api/user-profile/update`,
        tempUpdate,
        {
          headers: {
            Authorization: "Bearer" + Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        navigate("/profile");
        setInput({
          email: "",
          password: "",
          phone: "",
          name: "",
          password_confirmation: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setStatusOK(error.response.data.phone);
      });
    return () => {
      setInput({
        email: "",
        password: "",
        phone: "",
        name: "",
        password_confirmation: "",
      });
    };
  };

  const functionresetPassword = () => {
    console.log(input.email);
    axios
      .post(
        `https://exercise.smtapps.net/api/password/reset-request`,
        { email: input.email },
        {
          headers: {
            Authorization: "Bearer" + Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStatusOK(response.data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const getBanner = async () => {
      let result = await axios.get(`https://exercise.smtapps.net/api/banner`, {
        headers: {
          Authorization: "Bearer" + Cookies.get("token"),
        },
      });
      let tempBanner = result.data.filter(
        (element) => element.is_active === true
      );
      setBanner(tempBanner);
    };
    getBanner();

    setInput({
      email: "",
      password: "",
      phone: "",
      name: "",
      password_confirmation: "",
    });
  }, [setBanner, setInput]);
  const functions = {
    functionLogin,
    functionRegister,
    functionUpdateProfile,
    functionresetPassword,
  };
  return (
    <Context.Provider
      value={{
        input,
        setInput,
        functions,
        profile,
        banner,
        setBanner,
        error,
        setError,
        statusOK,
        spinner,
        setSpinner,
        setProfile,
        verify,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
