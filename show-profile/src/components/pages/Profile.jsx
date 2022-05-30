import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Cookies from "js-cookie";

export const Profile = () => {
  const { profile, spinner, setProfile } = useContext(Context);
  useEffect(() => {
    const getProfile = async () => {
      let result = await axios.get(
        `https://exercise.smtapps.net/api/user-profile`,
        {
          headers: {
            Authorization: "Bearer" + Cookies.get("token"),
          },
        }
      );
      let tempProfile = result.data;
      console.log(tempProfile);
      setProfile({
        name: tempProfile.name,
        email: tempProfile.email,
        phone: tempProfile.phone,
        email_verified_at: tempProfile.email_verified_at,
      });
    };
    getProfile();
  }, [setProfile]);
  console.log(spinner);
  return (
    <>
      <section className="h-screen">
        <div className="container  py-1 h-full">
          {!profile?.email_verified_at ? (
            <div className="  flex-wrap  text-gray-800 px-48">
              <p className="text-3xl py-5 text-neutral-700">Loading...</p>
              <p className="text-rose-600 text-3xl py-5">
                Unauthorized, your email address testing@mail.com is not
                verified.
              </p>
            </div>
          ) : profile ? (
            <div className="  flex-wrap  text-gray-800 px-48">
              <p className="font-medium text-xl text-secondary mb-6 lg:text-6xl justify-center">
                Your Account
              </p>
              <ul className="font-medium text-base text-secondary mb-6 lg:text-lg justify-center">
                <li>Name : {profile.name}</li>
                <li>Email : {profile.email}</li>
                <li>
                  verification : {profile.email_verified_at ? "Yes" : "No"}
                </li>
                <li>Name : {profile.phone}</li>
              </ul>
              <div class="max-w-sm py-1">
                <Link
                  to={`/profile/edit/${profile.name}/${profile.phone}`}
                  class="text-base font-semibold  text-white bg-sky-600 py-1 px-2 rounded w-md hover:opacity-80 hover:shadow-lg transition duration-500"
                >
                  Edit Profile
                </Link>{" "}
                <Link
                  to={`/profile/reset-password/${profile.email}`}
                  class="text-base font-semibold  text-white bg-sky-600 py-1 px-2 rounded w-md hover:opacity-80 hover:shadow-lg transition duration-500"
                >
                  Reset password
                </Link>
              </div>
            </div>
          ) : (
            <div className="  flex-wrap  text-gray-800 px-48">
              <p className="font-medium text-xl text-secondary mb-6 lg:text-6xl justify-center">
                Verify your Account, please!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
