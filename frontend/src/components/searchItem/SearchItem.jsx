import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        {/* <span className="siDistance">{item.distance}</span> */}
        {/* <span className="siTaxiOp">Free airport taxi</span> */}
        {/* <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span> */}
        <span className="siDistance">{item.title}</span>
        <span style={{backgroundColor:"#fefae0",border:"2px solid #0071c2 ", borderRadius:"10px",paddingBottom:"5px"}}>
        <span className="siFeatures"style={{marginLeft:"15px"}}>Departure : {item.departure}</span>
        <span style={{color:"black",marginLeft:"10px",fontSize:"20px"}}>o</span><span style={{color:"black",fontSize:"20px"}} >-----</span>
        <span style={{color:"black",marginRight:"10px",fontSize:"20px"}}>o</span>
        <span className="siFeatures">Arrival : {item.arrival}</span><br/>
        <span className="siFeatures" style={{paddingLeft:"15px"}}> Travel Dates: {item.fromdate}</span>
        <span className="siFeatures" style={{paddingLeft:"65px"}} > {item.enddate}</span>
        </span>
        <span className="siFeatures">Travel Time: {item.hours}  (Non-Stop)</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">₹{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/flights/${item._id}`}>
          <button className="siCheckButton">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
