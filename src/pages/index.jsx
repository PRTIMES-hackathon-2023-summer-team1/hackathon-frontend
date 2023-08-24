import { getTours } from "../../lib/getTours"
import './index.css' 

function App() {

  

  return (
    <>
      <h1>This is TopPage</h1>
      <p onClick={() => {window.location.href = '/example'}}>redirect to /example</p>
    
      <ul className="container">  
        {getTours().map(tour => 
          <a href={`/tours/${tour.tour_lists.tour_id}`}>  
            <li className="tourInfo">
            <h2>{tour.tour_lists.name}</h2>
            <h3>￥{tour.tour_lists.price}</h3> 
            <p>{tour.tour_lists.description}</p>
            <h4>{tour.tour_lists.dates.first_day} -{tour.tour_lists.dates.last_day} </h4>
            </li>
          </a>
        )}
       
      </ul>
      
    </>
  )
}

export default App
