import "./newSeat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { seatInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewSeat = () => {
  const [info, setInfo] = useState({});
  const [flightId, setFlightId] = useState(undefined);
  const [seats, setSeats] = useState([]);

  const { data, loading } = useFetch("/flights");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const seatNumbers = seats.split(",").map((seat) => ({ number: seat }));
    try {
      await axios.post(`/flightbookings/${flightId}`, { ...info, seatNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Seat</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {seatInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Seats</label>
                <textarea
                  onChange={(e) => setSeats(e.target.value)}
                  placeholder="give comma between seat numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a Flight</label>
                <select
                  id="hotelId"
                  onChange={(e) => setFlightId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((flight) => (
                        <option key={flight._id} value={flight._id}>{flight.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSeat;
