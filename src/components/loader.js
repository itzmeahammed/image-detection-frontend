import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import gifSrc from "../assets/gif/trafficLightLoader.gif"; // Replace with your GIF file path

const GifModal = ({ isLoading, setisLoading }) => {
  return (
    <Modal open={isLoading}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          //   bgcolor: "white",
          outline: "none",
          //   boxShadow: 24,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
        }}
      >
        <img
          src={gifSrc}
          alt='Loading...'
          style={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </Box>
    </Modal>
  );
};

export default GifModal;
