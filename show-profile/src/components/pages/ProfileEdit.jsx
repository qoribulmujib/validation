import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";

export const ProfileEdit = () => {
  const { input, setInput, functions, setError, error, statusOK } =
    useContext(Context);
  let { functionUpdateProfile } = functions;
  let param = useParams();
  let { name, phone } = param;
  const handleChange = (event) => {
    let itemChange = event.target;
    let { name, value } = itemChange;
    setInput({ ...input, [name]: value });
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    if (!input.name) {
      return setError({
        name: "Cannot be empty",
      });
    }
    if (!input.phone) {
      return setError({
        phone: "Cannot be empty",
      });
    }
    functionUpdateProfile();
  };
  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phoneimage"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form method="post" onSubmit={handleUpdate}>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Name"
                    name="name"
                    value={input.name || name}
                    onChange={handleChange}
                  />
                  <p className="text-rose-600 italic"> {error.name}</p>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Phone Number"
                    name="phone"
                    value={input.phone || phone}
                    onChange={handleChange}
                  />
                  <p className="text-rose-600 italic"> {error.phone}</p>
                </div>
                <p className="text-rose-600 italic"> {statusOK}</p>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
