import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./tour_id.css";

function App() {
  const { tour_id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
          Authorization: `DummyToken`,
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

  if (!tourData) return <></>;

  const postBookingInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/booking", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify({
          user_id: tourData.user_id,
          tour_id: tourData.tour_id,
          participants: people,
        }), // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
      });
      return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bookingForm">
        <Paper elevation={3} sx={{ width: 600 }} className="booking">
          <p>Tour:{tourData.name}</p>
          {/* <p>your name: {}</p> */}
          <p>user_id:{tourData.user_id}</p>
          <p>price: {tourData.price * people + "円"}</p>
          <p>
            date: {dayjs(tourData.first_day).format("YYYY/MM/DD hh:mm")} -
            {dayjs(tourData.last_day).format("YYYY/MM/DD hh:mm")}
          </p>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">People</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={people}
                label="People"
                onChange={handleChange}
                sx={{ width: 200 }}
              >
                {Array.from({
                  length: tourData.max_capacity - tourData.current_capacity,
                }).map((data, index) => (
                  <MenuItem value={index + 1}>{index + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={postBookingInfo}>
              予約
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
}
export default App;
