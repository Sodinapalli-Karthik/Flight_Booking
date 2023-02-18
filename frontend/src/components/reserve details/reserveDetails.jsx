import { React, useState } from 'react';
import "./reserveDetails.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ReserveDetails({ flightId }) {
    const navigate = useNavigate();
    const params = useParams()
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const { data } = useFetch(`/flights/find/${params.id}`);
    console.log("hii", data)

    const handler = (event) => {
        event.preventDefault()
        console.log("nn", event.target.elements);
        event.target.map((item) => {
            console.log("mm", item.name, item.value)

        })


    }




    return (
        <>

            <div className="contain">
                <div className="wrapper">
                    <div className="form">
                        <h2 className="form-headline">{data?.title}</h2>
                        <h4>Who's Flying</h4>
                        <h2 className="form-headline">Contact Details</h2>
                        <form id="submit-form" onSubmit={handler}>
                            <p >
                                <input id="name" className="form-input" type="text" name='firstName' placeholder="First Name*" />
                                <small className="name-error"></small>
                            </p>
                            <p>
                                <input id="name" className="form-input" type="text" name='LastName' placeholder="Last Name*" />
                                <small className="name-error"></small>
                            </p>
                            <p className="full-width">
                                <input id="email" className="form-input" type="email" name='userEmail' placeholder="Your Email*" />
                                <small className="name-error"></small>
                            </p>
                            <p >
                                <input id="phone-number" className="form-input" type="number" name='userNumber' placeholder="+(91)" />
                                <small></small>
                            </p><br />
                            <span>Address</span><br />
                            <p>
                                <input id="name" className="form-input" type="text" name='userAddress1' placeholder="Address 1" />
                                <small className="name-error"></small>
                            </p>
                            <p>
                                <input id="name" className="form-input" type="text" name='userAddress2' placeholder="Address 2" />
                                <small className="name-error"></small>
                            </p>
                            <p>
                                <input id="email" className="form-input" type="text" name='userAddress3' placeholder="Region" />
                                <small className="name-error"></small>
                            </p>
                            <p>
                                <input id="email" className="form-input" type="text" name='userAddress4' placeholder="State" />
                                <small className="name-error"></small>
                            </p>
                            <p className="full-width">
                                <input type="checkbox" id="checkbox" name="checkbox" /> Get free text message updates about your flight
                            </p>
                            <p className="full-width">

                                <button className="reset-btn" onClick={() => { setOpenModal(true) }}>Proceed to Checkout </button>
                            </p>
                        </form>
                    </div>

                    <div className="contacts contact-wrapper">
                        <h2>Check Out Details</h2>
                        <ul style={{ marginTop: "20px" }}>
                            <li>Ticket(1 adult)-<span style={{ marginLeft: "81px" }}>₹{data?.cheapestPrice}</span></li>
                            <li>Flight fare- <span style={{ marginLeft: "108px" }}>₹{data?.ticketfare}</span></li>
                            <li>Taxes and fees- <span style={{ marginLeft: "71px" }}>₹{data?.taxes}</span></li>
                            <span className="hightlight-contact-info">
                                <li className="email-info"> Total <span style={{ marginLeft: "110px" }}>₹{data?.cheapestPrice}</span> </li>
                                <li style={{ fontSize: "14px" }}><small>Includes taxes and charges</small>
                                </li>

                            </span>
                        </ul>
                    </div>
                </div>
            </div>

            {openModal && <div className="reserve">


                <div className="wrapper" >
                    <div className="form">
                        <h2 className="headline">Payment Details</h2>
                        <form id="submit-form" action="" style={{ paddingRight: "20px" }}>
                            <p className="full-width">
                                <input id="email" className="form-input" type="text" placeholder="Card Holder Name*" required />
                                <small className="name-error"></small>
                            </p>
                            <p className="full-width">
                                <input id="phone-number" className="form-input" type="number" placeholder="Card Number*" required />
                                <small className="name-error"></small>
                            </p>
                            <p style={{ marginRight: "20px" }} >
                                <input id="phone-number" className="form-input" type="number" placeholder="Expiry Date*" required />
                                <small></small>
                            </p>
                            <p >
                                <input id="phone-number" className="form-input" type="number" placeholder="CVV*" required />
                                <small></small>
                            </p>
                            <p className="full-width">
                                <input type="checkbox" id="checkbox" name="checkbox" /> Save this details for future
                            </p>
                            <p className="full-width">
                                <Link to={"/payment"}>
                                    <button className="reset">Pay Now</button>


                                </Link>



                            </p>
                        </form>
                    </div>
                </div>

            </div>

            }







        </>
    )
}

export default ReserveDetails;
