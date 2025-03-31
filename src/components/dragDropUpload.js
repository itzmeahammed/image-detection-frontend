import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IMAGE_UPLOAD_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import GifModal from "./loader";
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
        result: result?.result,
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
    <Paper
      elevation={3}
      sx={{
        width: 400,
        margin: "auto",
        padding: 3,
        textAlign: "center",
        borderRadius: 2,
      }}
    >
      <Typography variant='h5' sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Report Traffic Violation
      </Typography>

      <form
        onSubmit={handleUpload}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          required
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
        />

        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #aaa",
            padding: 2,
            borderRadius: 2,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <input {...getInputProps()} />
          <Typography variant='body2'>
            Drag & drop an image here, or click to select one
          </Typography>
        </Box>

        {preview && (
          <img
            src={preview}
            alt='Preview'
            style={{ width: "100%", marginTop: 10, borderRadius: 5 }}
          />
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ marginTop: 2 }}
        >
          Submit Report
        </Button>
      </form>

      <GifModal isLoading={isLoading} setisLoading={setIsLoading} />

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

            <Box>
              <Box
                sx={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <Typography
                  variant='h6'
                  sx={{ fontWeight: "bold", color: "#333", marginBottom: 1 }}
                >
                  Violation Details
                </Typography>

                <Box sx={{ marginBottom: 1 }}>
                  <Typography variant='body1'>
                    <strong>Reported By: &nbsp; </strong> {invoiceData?.name}
                  </Typography>

                  <Typography variant='body1'>
                    <strong>Date:</strong> &nbsp; {invoiceData?.violationDate}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Violation Details: &nbsp; </strong>
                    {invoiceData?.result}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {invoiceData?.imageUrl && (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
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
                onClick={() => setOpenModal(false)}
              >
                Close
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </Paper>
  );
};

export default DragDropUploadForm;
