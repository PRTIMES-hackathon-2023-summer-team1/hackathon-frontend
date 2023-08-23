function App() {

  const dummyTours = [
    {
      "tour_lists": {
        "tour_id": "string",
        "name": "string",
        "description": "string",
        "price": 0,
        "dates": {
          "first_day": "string",
          "last_day": "string"
        },
        "capacity_people": {
          "max": 0,
          "current": 0
        }
      }
    },
    {
      "tour_lists": {
        "tour_id": "string",
        "name": "string",
        "description": "string",
        "price": 0,
        "dates": {
          "first_day": "string",
          "last_day": "string"
        },
        "capacity_people": {
          "max": 0,
          "current": 0
        }
      }
    },
    {
      "tour_lists": {
        "tour_id": "string",
        "name": "string",
        "description": "string",
        "price": 0,
        "dates": {
          "first_day": "string",
          "last_day": "string"
        },
        "capacity_people": {
          "max": 0,
          "current": 0
        }
      }
    }
  ]

  return (
    <>
      <h1>This is TopPage</h1>
      <p onClick={() => {window.location.href = '/example'}}>redirect to /example</p>
    </>
  )
}

export default App
