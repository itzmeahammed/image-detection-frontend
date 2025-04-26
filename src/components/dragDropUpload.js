import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IMAGE_UPLOAD_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import GifModal from "./loader";
import SuccessTick from "../assets/gif/successtick.gif";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Modal,
} from "@mui/material";

const DragDropUploadForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    violationDate: "",
  });
  const [invoiceData, setInvoiceData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const token = Cookies.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image || !formData.name || !formData.violationDate) {
      return alert("All fields are required!");
    }

    setIsLoading(true);
    const uploadData = new FormData();
    uploadData.append("image", image);
    uploadData.append("name", formData.name);
    uploadData.append("violationDate", formData.violationDate);

    try {
      const response = await fetch(IMAGE_UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: uploadData,
      });

      const result = await response.json();

      setInvoiceData({
        name: formData.name,
        violationDate: formData.violationDate,
        imageUrl: preview,
        message: result?.result?.message,
        vehicle_number: result?.result?.vehicle_number,
      });
      setOpenModal(true);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div
      className='d-flex-full w-100'
      style={{ height: "100vh", marginLeft: "13%" }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "900px",
          margin: "auto",
          padding: 3,
          textAlign: "center",
          borderRadius: 3,
          marginLeft: "13%",
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant='h4' sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Report Traffic Violation
        </Typography>

        <form
          onSubmit={handleUpload}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            height: "fit-content",
          }}
        >
          <TextField
            label='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            variant='outlined'
            fullWidth
            required
            sx={{
              marginBottom: 2,
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            label='Violation Date'
            type='date'
            name='violationDate'
            value={formData.violationDate}
            onChange={handleChange}
            variant='outlined'
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: 2,
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          {!preview && (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #aaa",
                padding: 3,
                borderRadius: "8px",
                cursor: "pointer",
                textAlign: "center",
                height: "250px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "border-color 0.3s ease",
                "&:hover": {
                  borderColor: "#4CAF50",
                },
              }}
            >
              <input {...getInputProps()} />
              <Typography variant='body2'>
                Drag & drop an image here, or click to select one
              </Typography>
            </Box>
          )}

          {preview && (
            <img
              src={preview}
              alt='Preview'
              style={{
                width: "80%",
                marginTop: 10,
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}

          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{
              marginTop: 2,
              padding: "12px 30px",
              borderRadius: "6px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#003b8f",
              },
            }}
          >
            Submit Report
          </Button>
        </form>

        <GifModal isLoading={isLoading} setisLoading={setIsLoading} />

        {/* Violation Invoice Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                width: 450,
                padding: 3,
                borderRadius: 4,
                backgroundColor: "#ffffff",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#002147",
                  color: "#ffffff",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: "8px 8px 0 0",
                }}
              >
                <Typography
                  variant='h5'
                  sx={{ fontWeight: 500, letterSpacing: 0.8 }}
                >
                  Violation Invoice
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                  Reported By: {invoiceData?.name}
                </Typography>
                <Typography variant='body1'>
                  <strong>Date:</strong> {invoiceData?.violationDate}
                </Typography>
                <Typography variant='body1'>
                  <strong>Vehicle Number:</strong> {invoiceData?.vehicle_number}
                </Typography>
                <Typography variant='body1'>
                  <strong>Violation Details:</strong> {invoiceData?.message}
                </Typography>
              </Box>

              {invoiceData?.imageUrl && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <img
                    src={invoiceData.imageUrl}
                    alt='Violation'
                    style={{
                      width: "100%",
                      maxWidth: "260px",
                      borderRadius: "8px",
                      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                  alignSelf: "center",
                }}
              >
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: "#002147",
                    color: "#ffffff",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "6px",
                    padding: "8px 20px",
                    "&:hover": {
                      backgroundColor: "#001830",
                    },
                  }}
                  onClick={() => {
                    setOpenModal(false);
                    setShowSuccessModal(true);
                    setTimeout(() => {
                      setShowSuccessModal(false);
                    }, 3000);
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Modal>

        {/* Success Modal */}
        <Modal open={showSuccessModal}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: 4,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={SuccessTick}
                alt='Success'
                style={{ width: 150, height: 150 }}
              />
              <Typography
                variant='h6'
                sx={{ marginTop: 2, fontWeight: 500, color: "#4caf50" }}
              >
                Report Submitted Successfully!
              </Typography>
            </Box>
          </Box>
        </Modal>
      </Paper>
    </div>
  );
};

export default DragDropUploadForm;
