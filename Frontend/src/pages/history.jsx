import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      {/* Home Button */}
      <Box sx={{ display: "flex", justifyContent: "start", mb: 3 }}>
        <IconButton
          onClick={() => routeTo("/home")}
          sx={{
            backgroundColor: "#f0f0f0",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
            boxShadow: 1,
          }}
        >
          <HomeIcon color="primary" />
        </IconButton>
      </Box>

      {/* Meeting History */}
      {meetings.length > 0 ? (
        meetings.map((e, i) => (
          <Card
            key={i}
            variant="outlined"
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              background: "#fff",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{ fontSize: 16, fontWeight: "bold", color: "#333" }}
              >
                Meeting Code:{" "}
                <span style={{ color: "#1976d2" }}>{e.meetingCode}</span>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                Date: {formatDate(e.date)}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}
        >
          No meeting history found.
        </Typography>
      )}
    </Container>
  );
}
