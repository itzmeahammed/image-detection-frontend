import React, { useEffect, useState } from "react";
import QrImage from "../assets/images/new_qr.jpeg";
import "../styles/fineAnPayment.css";
import { GET_FINE_DETAILS } from "../helper/apiurls";
import Cookies from "js-cookie";

const FineAndPayment = () => {
  const token = Cookies.get("token");

  const [fineUser, setfineUser] = useState({});
  const [selectedFine, setSelectedFine] = useState(null);

  const getFineDetails = async () => {
    try {
      const res = await fetch(GET_FINE_DETAILS, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();

      setfineUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFineDetails();
  }, []);

  return (
    <>
      <div className='fine-and-payment-main-container d-flex gap-16'>
        <div
          className='fine-details-container d-flex-col gap-16'
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedFine(fineUser)}
        >
          <img src={QrImage} width={250} height={250} alt='' />
          <p>
            <strong>Username:</strong> {fineUser?.username}
          </p>
          <p>
            <strong>Vehicle Number: </strong>
            {fineUser?.vehicle_no}
          </p>
          <p>
            <strong>Payment Amount:</strong> {fineUser?.fine}
          </p>
          <p>
            <strong>Mobile no:</strong> {fineUser?.number}
          </p>
        </div>
      </div>

      {selectedFine && (
        <div className='modal-backdrop' onClick={() => setSelectedFine(null)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h3>Fine Details</h3>
            <img src={QrImage} width={250} height={250} alt='QR Code' />
            <p>
              <strong>Username:</strong> {selectedFine?.username}
            </p>
            <p>
              <strong>Vehicle Number:</strong> {selectedFine?.vehicle_no}
            </p>
            <p>
              <strong>Payment Amount:</strong> {selectedFine?.fine}
            </p>
            <p>
              <strong>Mobile no:</strong> {selectedFine?.number}
            </p>
            <button onClick={() => setSelectedFine(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FineAndPayment;
