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
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Flight = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/flights/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            {/* <button className="bookNow">Reserve or Book Now!</button> */}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.aiportTitle}</span>
            </div>
            {/* <span className="hotelDistance">
              Excellent  – {data.distance} location near to hills.
            </span> */}
            <span className="hotelPriceHighlight">
              Book a seat over ₹{data.cheapestPrice} at this flight and get a
              free veg-meal.
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <div style={{ display: "flex",width:"300px",backgroundColor:"#fefae0",border:"2px solid #0071c2 ", borderRadius:"10px",paddingBottom:"5px" ,marginTop:"10px",marginBottom:"10px"}}>
                  <span style={{paddingLeft:"25px"}}><p className="hotelDesc"><h3>Departure:</h3>{data.departure}</p></span>
                  <span style={{marginTop:"18px"}}>
                  <span style={{ color: "black", marginLeft: "10px", fontSize: "20px" }}>o</span><span style={{ color: "black", fontSize: "20px" }} >-----</span>
                  <span style={{ color: "black", marginRight: "10px", fontSize: "20px" }}>o</span>
                  </span>
                  <span><p className="hotelDesc"><h3>Arrival:</h3>{data.arrival}</p>
                  </span>

                </div>


                <p className="hotelDesc">{data.desc}</p>

              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a budget travel!</h1>
                <span>
                  This flight has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b> ₹ {data.cheapestPrice * options.seat}</b>

                  {/* <b>₹{days * data.cheapestPrice * options.room}</b> ({days}{" "}) */}
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} flightId={id} />}
    </div>
  );
};

export default Flight;
