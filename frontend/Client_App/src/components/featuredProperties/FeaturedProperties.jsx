import { useEffect, useState } from "react";
import "./featuredProperties.css";
import axios from "../../util/baseUrl";

const FeaturedProperties = () => {
  const [hotels, setHotels] = useState();
  const [isLoadding, setIsLoadding] = useState(false);
  const highestHotel = async () => {
    setIsLoadding(true);
    axios
      .get("ratinghighest")
      .then((response) => {
        if (!response) {
          throw new Error(response.message);
        }
        // console.log(
        //   response.data.Datahotel.sort(
        //     (a, b) => b.cheapestPrice - a.cheapestPrice
        //   )
        // );
        return setHotels(response.data);
      })
      .then(() => setIsLoadding(false))
      .catch((err) => console.log(err));
  };
  // console.log(hotels);
  useEffect(() => {
    highestHotel();
  }, []);
  // if (isLoadding) {
  //   return ;
  // }
  return (
    <div className="fp">
      {/* Top 3 khách sạn có rating cao nhất. */}
      {!hotels && <h2 style={{ textAlign: "center" }}>Hotel is loadding...</h2>}
      {hotels &&
        hotels.Datahotel.sort((a, b) => b.cheapestPrice - a.cheapestPrice).map(
          (hotel) => (
            <div className="fpItem" key={hotel.title}>
              <img
                src={hotel.photos[0]}
                alt={hotel.name}
                className="fpImg"
                loading="lazy"
              />
              <span className="fpName">
                <a href="./hotels/0" target="_blank">
                  {hotel.title}
                </a>
              </span>
              <span className="fpCity">{hotel.city}</span>
              <span className="fpPrice">
                Starting from ${hotel.cheapestPrice}
              </span>
              <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default FeaturedProperties;

{
  /* <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">
          <a href="./hotels/0" target="_blank">
            Comfort Suites Airport
          </a>
        </span>
        <span className="fpCity">Austin</span>
        <span className="fpPrice">Starting from $140</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">
          <a href="./hotels/0" target="_blank">
            Four Seasons Hotel
          </a>
        </span>
        <span className="fpCity">Lisbon</span>
        <span className="fpPrice">Starting from $99</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">
          <a href="./hotels/0" target="_blank">
            Hilton Garden Inn
          </a>
        </span>
        <span className="fpCity">Berlin</span>
        <span className="fpPrice">Starting from $105</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div> */
}
