import { useNavigate } from "react-router-dom";
import "./searchItem.css";

// Truyền dữ liệu từ pageList xuống để có thể in ra màn hình
const SearchItem = (props) => {
  const navigate = useNavigate();
  const {
    idRoom,
    id,
    name, // hotel
    distance, // hotel
    tag, // tag decs in rooms (tu bia)
    type, // rooms (title)
    description, // rooms (desc)
    free_cancel, // feature (true and false) not rooms and hotel
    price, // rooms
    rating, // hotel
    rate_text, // hotel ( logical follow point rating ) not rooms and hotel
    photos, // image first album in hotel
  } = props.data;
	const {date} = props

  const navigateHandle = () => {
    navigate(`/hotels/${idRoom}`, { state: {
			id,
			date
		} });
  };
  console.log(date);

  return (
    <div className="searchItem">
      <img src={photos} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance} from center</span>
        <span className="siTaxiOp">{tag ? "taxi" : "No taxi"}</span>
        <span className="siSubtitle">{description}</span>
        <span className="siFeatures">{type}</span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span style={{ color: "red" }}>{rate_text} !</span>
          <button>{rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button onClick={navigateHandle} className="siCheckButton">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
