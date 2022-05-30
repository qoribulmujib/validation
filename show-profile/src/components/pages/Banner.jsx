import React, { useContext } from "react";
import { Context } from "../context/Context";
import moment from "moment";

export const Banner = () => {
  const { banner } = useContext(Context);
  return (
    <>
      <section id="sub-card" class="pt-36 pb-16 bg-slate-100">
        {banner.length ? (
          <div className="container">
            <div className="w-full px-4">
              <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="font-bold text-primary text-3xl mb-4 sm:text-4xl lg:text-5xl uppercase">
                  All banner
                </h2>
              </div>
            </div>
            <div className="w-full px-4 flex flex-wrap justify-center xl:10/12 xl:mx-auto">
              {banner.map((element, index) => (
                <div className="mb-12 p-4 md:w-1/2" key={index}>
                  <div className="rounded-md shadow-md overflow-hidden">
                    <img
                      src={element.image_url}
                      alt="company"
                      className="w-full"
                    />
                  </div>
                  <h3 className="font-semibold text-3xl text-dark mt-5 mb-3">
                    {element.title.toUpperCase()}
                  </h3>
                  <ul className="font-medium text-base text-secondary mb-6 lg:text-lg">
                    <li>Description : {element?.description}</li>
                    <li>Created at : {moment(element.created_at).fromNow()}</li>
                    <li>Update at : {moment(element?.updated_at).fromNow()}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <h3 className="font-semibold text-3xl text-dark mt-5 mb-3">
              No Banner Yet!
            </h3>
          </div>
        )}
      </section>
    </>
  );
};
