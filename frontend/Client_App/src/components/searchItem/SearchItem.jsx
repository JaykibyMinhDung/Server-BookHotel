import "./searchItem.css";

// Truyền dữ liệu từ pageList xuống để có thể in ra màn hình
const SearchItem = (props) => {
  const {
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
  console.log(props);
  return (
    <div className="searchItem">
      <img src={photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance} from center</span>
        <span className="siTaxiOp">{tag}</span>
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
          <span>{rate_text}</span>
          <button>{rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
