import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // , useNavigate
import BookHotel from "../bookHotel/bookHotel";
import defaultimg from "../../assets/notfound.png";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [dataHotels, setDataHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formReverse, setFormReverse] = useState(false)
  const location = useLocation();
  const start_date = new Date(location.state.date[0].startDate).toLocaleDateString('en-US');
  const end_date = new Date(location.state.date[0].endDate).toLocaleDateString('en-US');
  // console.log(location.state);
  const [open, setOpen] = useState(false);
  const [changeDate, setChangeDate] = useState([
    {
      startDate: location.state.date[0].startDate, // .toLocaleDateString("es-CL")
      endDate: location.state.date[0].endDate,
      key: "selection",
    },
  ]);
  // const navigateBook = useNavigate();
  const convertDateServer = (date) => {
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
    return dateFormatted
  }
  const getDetailHotel = async () => {
    setLoading(true);
    const newStartDate = convertDateServer(changeDate[0]?.startDate);
    const newEndDate = convertDateServer(changeDate[0]?.endDate);
    const res = await axios.get(`http://localhost:5000/detailhotel?id=${location.state.id}&start_date=${start_date !== newStartDate ? newStartDate : start_date}&end_date=${end_date !== newEndDate ? newEndDate : end_date}`
    );
    const changeData = await res.data;
    setDataHotels(changeData.ArrResults);
    setLoading(false);
    // console.log(changeData);
  };

  const handleBookhotel = () => {
    return setFormReverse(true)
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0
          ? dataHotels.informationHotel.photos.length
          : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === dataHotels.informationHotel.photos.length
          ? 0
          : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  useEffect(() => {
    getDetailHotel();
    console.log(changeDate)
  }, [location.state.id, changeDate]);

  // if (loading) {
  //   return
  // }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        { open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={ faCircleXmark }
              className="close"
              onClick={ () => setOpen(false) }
            />
            <FontAwesomeIcon
              icon={ faCircleArrowLeft }
              className="arrow"
              onClick={ () => handleMove("l") }
            />
            <div className="sliderWrapper">
              {/* <img src={photos[slideNumber].src} alt="" className="sliderImg" /> */ }
              <img
                src={
                  dataHotels.informationHotel.photos[slideNumber]
                    ? dataHotels.informationHotel.photos[slideNumber]
                    : defaultimg
                }
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={ faCircleArrowRight }
              className="arrow"
              onClick={ () => handleMove("r") }
            />
          </div>
        ) }
        { !loading ? (
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{ dataHotels.informationHotel.name }</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={ faLocationDot } />
              <span>{ dataHotels.informationHotel.address }</span>
            </div>
            <span className="hotelDistance">
              Excellent location – { dataHotels.informationHotel.distance }m from
              center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${ dataHotels.informationHotel.cheapestPrice } at
              this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              { dataHotels.informationHotel.photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={ i }>
                  <img
                    onClick={ () => handleOpen(i) }
                    src={ photo ? photo : defaultimg }
                    alt=""
                    className="hotelImg"
                    loading="lazy"
                  />
                </div>
              )) }
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">
                  { dataHotels.informationHotel.title }
                </h1>
                <p className="hotelDesc">{ dataHotels.informationHotel.desc }</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of{ " " }
                  { dataHotels.informationHotel.city }, this property has an
                  excellent location score of{ " " }
                  { dataHotels.informationHotel.rating }!
                </span>
                <h2>
                  <b>${ dataHotels.informationHotel.cheapestPrice }</b> (1 nights)
                </h2>
                <button onClick={ handleBookhotel }>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={ {
              textAlign: "center",
              fontSize: "150%",
              fontWeight: 700,
              marginBottom: "2rem",
            } }
          >
            loading...
          </div>
        ) }
        {
          formReverse &&
          <BookHotel 
					detailRoom={ dataHotels.informationRoom } 
					hotel={ dataHotels.informationHotel } 
          newDate={setChangeDate}
					dateProps={location.state.date} />
        }
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
