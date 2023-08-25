import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Loading from "../../../components/loading";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

function App() {
  const { tour_id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [tourData, setTourData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState(1);

  const handleChange = (event) => {
    setPeople(event.target.value);
  };

  // ツアー情報を取得
  const getTourData = async () => {
    try {
      const response = await axios.get(`/tours/${tour_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setTourData(response.data);
        setIsLoading(false);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTourData();
  }, []);

  // 予約作成
  const postBookingInfo = async (e) => {
    try {
      const api = axios.create({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await api.post(`/bookings`, {
        tour_id: tour_id,
        participants: people,
      });
      if (response.status === 200) {
        // 予約一覧ページへリダイレクト
        navigate("/bookings");
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="detail">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="tour-details">
          {/* 以前のコード */}

          <Paper elevation={3} className="booking-form" sx={{ my: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 4,
              }}
            >
              <Typography variant="h5">Tour: {tourData.name}</Typography>
              <Typography>User ID: {tourData.user_id}</Typography>
              <Typography>Price: {tourData.price * people}円</Typography>
              <Typography>
                Date: {dayjs(tourData.first_day).format("YYYY/MM/DD hh:mm")} -{" "}
                {dayjs(tourData.last_day).format("YYYY/MM/DD hh:mm")}
              </Typography>
              <FormControl sx={{ minWidth: 120, marginTop: 3 }}>
                <InputLabel id="people-select-label">People</InputLabel>
                <Select
                  labelId="people-select-label"
                  id="people-select"
                  value={people}
                  label="People"
                  onChange={handleChange}
                  sx={{ width: 200 }}
                >
                  {Array.from({
                    length: tourData.max_capacity - tourData.current_capacity,
                  }).map((data, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          <Button
            className="booking-button"
            variant="contained"
            onClick={postBookingInfo}
            size="large"
            sx={{ width: "100%", padding: 1, margin: 2 }}
          >
            予約
          </Button>
        </div>
      )}
    </div>
  );
}
export default App;
