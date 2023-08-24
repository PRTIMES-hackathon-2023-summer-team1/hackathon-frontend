



function App() {

  return (
    <>
    <p>Hello</p>
    <p>Tour:{data.name}</p>
          {/* <p>your name: {}</p> */}
          <p>user_id:{data.user_id}</p>
          <p>price: {data.price * people + "円"}</p>
          <p>date: {data.dates.first_day} - {data.dates.last_day}</p>

          <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">People</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={people}
            label="People"
            onChange={handleChange}
            sx={{width: 200}}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
        
      </Box>
    </>
  )
}

export default App