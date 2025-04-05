import React, { useState } from "react";
import QrImage from "../assets/images/qr.jpeg";
import "../styles/fineAnPayment.css";

const FineAndPayment = () => {
  // Voilatiom , vehicle number , payment amount , date . Qr code .
  const [selectedFine, setSelectedFine] = useState(null);

  const fineData = [
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
    {
      violation: "More than 2 people",
      vehicleNumber: "TN 63 AH 4201",
      paymentAmount: "1500",
      Date: "12-01-2004",
    },
  ];
  return (
    <>
      <div className='fine-and-payment-main-container d-flex gap-16'>
        {fineData.map((val, key) => (
          <div
            className='fine-details-container d-flex-col gap-16'
            key={key}
            onClick={() => setSelectedFine(val)} // ✅ Added click handler
            style={{ cursor: "pointer" }} // Optional: pointer cursor
          >
            <img src={QrImage} width={250} height={250} alt='' />
            <p>
              <strong>Violation:</strong> {val?.violation}
            </p>
            <p>
              <strong>Vehicle Number: </strong>
              {val?.vehicleNumber}
            </p>
            <p>
              <strong>Payment Amount:</strong> {val?.paymentAmount}
            </p>
            <p>
              <strong>Date:</strong> {val?.Date}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Modal - conditionally shown */}
      {selectedFine && (
        <div className='modal-backdrop' onClick={() => setSelectedFine(null)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h3>Fine Details</h3>
            <img src={QrImage} width={250} height={250} alt='QR Code' />
            <p>
              <strong>Violation:</strong> {selectedFine.violation}
            </p>
            <p>
              <strong>Vehicle Number:</strong> {selectedFine.vehicleNumber}
            </p>
            <p>
              <strong>Payment Amount:</strong> {selectedFine.paymentAmount}
            </p>
            <p>
              <strong>Date:</strong> {selectedFine.Date}
            </p>
            <button onClick={() => setSelectedFine(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FineAndPayment;
