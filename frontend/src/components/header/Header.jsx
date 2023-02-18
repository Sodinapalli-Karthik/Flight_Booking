import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faRightLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [starting, setStarting] = useState("");
  const [checked, setChecked] = useState(false);
  const [multicitycount, setMulticitycount] = useState(1)

  const [travelType, setTravelType] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [dateoneway, setDateoneway] = useState([
    {
      startDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    seat: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { starting, destination, dates, options } });
    navigate("/flights", { state: { starting, destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free booking account
            </p>
            {!user &&
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="headerBtn">Sign in / Register</button>
              </Link>
            }
            <div>
              <h1>Compare and book flights with ease</h1><br />
              <h3>Discover your next dream destination</h3>
            </div>
            <div className="radio-icons" style={{ display: "flex", marginTop: "20px",marginBottom:"30px" }}>
              <input type="radio" name="trip" value="round trip" checked={travelType == "round trip"} onClick={(e) => {
                setTravelType(e.target.value);
                setMulticitycount(1)
              }} />
              Round Trip
              <span style={{ marginLeft: "15px" }}> <input type="radio" name="trip" value="one way" checked={travelType == "one way"} onClick={(e) => {
                setTravelType(e.target.value);
                setMulticitycount(1)
              }} />
                One Way
              </span>
              <span style={{ marginLeft: "15px" }}> <input type="radio" name="trip" value="multi way" checked={travelType == "multi way"} onClick={(e) => {
                setTravelType(e.target.value); 
                setMulticitycount(2)
              }} />
                Multi City
              </span>
              <span style={{ marginLeft: "40%" }}>
                <label>
                  <input type="checkbox"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  Direct Flights Only
                </label>

              </span>

            </div>

            {

              [...Array(multicitycount)].map(() => 
              
              <div className="headerSearch" style={{marginTop:"10px"}}>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPlane} className="headerIcon" />
                  <input
                    type="text"
                    placeholder="Staring From ?"
                    className="headerSearchInput"
                    onChange={(e) => setStarting(e.target.value)}
                    default
                  />
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faRightLeft} className="headerIcon" />
                  <input
                    type="text"
                    placeholder="Search the Destination?"
                    className="headerSearchInput"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openDate && (
                    <>{
                      travelType == "round trip" ?
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDates([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={dates}
                          className="date"
                          minDate={new Date()}
                        />
                        :
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDates([item.selection])}
                          moveRangeOnFirstSelection={false}
                          className="date"
                          minDate={new Date()}
                        />
                    }


                    </>

                  )}
                </div>

                {/* <div className="headerSearchItem">
    <FontAwesomeIcon icon={faPerson} className="headerIcon" />
    <span
      onClick={() => setOpenOptions(!openOptions)}
      className="headerSearchText"
    >{`${options.adult} adult · ${options.children} children · ${options.seat} seat`}</span>
    {openOptions && (
      <div className="options">
        <div className="optionItem">
          <span className="optionText">Adult</span>
          <div className="optionCounter">
            <button
              disabled={options.adult <= 1}
              className="optionCounterButton"
              onClick={() => handleOption("adult", "d")}
            >
              -
            </button>
            <span className="optionCounterNumber">
              {options.adult}
            </span>
            <button
              className="optionCounterButton"
              onClick={() => handleOption("adult", "i")}
            >
              +
            </button>
          </div>
        </div>
        <div className="optionItem">
          <span className="optionText">Children</span>
          <div className="optionCounter">
            <button
              disabled={options.children <= 0}
              className="optionCounterButton"
              onClick={() => handleOption("children", "d")}
            >
              -
            </button>
            <span className="optionCounterNumber">
              {options.children}
            </span>
            <button
              className="optionCounterButton"
              onClick={() => handleOption("children", "i")}
            >
              +
            </button>
          </div>
        </div>
        <div className="optionItem">
          <span className="optionText">Seats</span>
          <div className="optionCounter">
            <button
              disabled={options.seat <= 1}
              className="optionCounterButton"
              onClick={() => handleOption("seat", "d")}
            >
              -
            </button>
            <span className="optionCounterNumber">
              {options.seat}
            </span>
            <button
              className="optionCounterButton"
              onClick={() => handleOption("seat", "i")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )}
  </div> */}
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch} >
                    Search
                  </button>
                </div>
              </div>

              )
            }


          </>
        )}

      </div>

    </div>
  );
};

export default Header;
