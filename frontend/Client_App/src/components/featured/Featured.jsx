import React, { useEffect } from "react";
import axios from "../../util/baseUrl";

import "./featured.css";
import imgHN from "../../City Image/Ha Noi.jpg";
import imgDN from "../../City Image/Da Nang.jpg";
import imgSG from "../../City Image/HCM.jpg";
import { useState } from "react";

const Featured = () => {
  const [city, setCity] = useState("");
  const amountHotel = async () => {
    axios.get("counthotel").then((results) => {
      setCity(results.data);
    });
  };
  useEffect(() => {
    amountHotel();
  }, []);
  return (
    <div className="featured">
      {/* Số lượng các khách sạn theo khu vực: Hà Nội, HCM và Đà Nẵng. */}
      {!city && <div>City is Loadding...</div>}
      {city && (
        <>
          <div className="featuredItem">
            <img src={imgHN} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{city.HaNoi} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={imgSG} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{city.SG} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={imgDN} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{city.DaNang} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
