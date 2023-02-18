import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState ,useEffect} from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, flightId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { data, loading, error } = useFetch(`/flights/seat/${flightId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (seatNumber) => {
    const isFound = seatNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedSeats(
      checked
        ? [...selectedSeats, value]
        : selectedSeats.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedSeats.map((seatId) => {
          const res = axios.put(`/flightbookings/availability/${seatId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      // setOpen(false);

      // navigate("/")
    } catch (err) {}
  };
  const handleDetials = ()=>{
    setOpen(false);
    navigate(`/reservedetails/${flightId}`)
  }


  
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your seats:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              {/* <div className="rPrice">{item.price}</div> */}
            </div>
            <div className="rSelectRooms">
              {item.seatNumbers.map((seatNumber) => (
                <div className="room">
                  <label>{seatNumber.number}</label>
                  <input
                    type="checkbox"
                    value={seatNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(seatNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        <button onClick={handleDetials} className="rButton">
          Details
        </button>
      </div>
    </div>
  );
};

export default Reserve;
