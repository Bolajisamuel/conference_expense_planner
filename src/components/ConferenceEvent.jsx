import { useState } from "react";
import "./ConferenceEvent.css";
import conferenceRoomImg from "./../assets/conference-room.jpg";
import auditoriumImg from "./../assets/conference.jpg";
import presentationImg from "./../assets/presentation-room.jpg";
import largeMeetingImg from "./../assets/large-meeting.jpg";
import smallMeetingImg from "./../assets/small-meeting.jpg";
import projectorImg from "./../assets/projector.jpg";
import speakerImg from "./../assets/speaker.jpg";
import microphoneImg from "./../assets/microphone.jpg";
import whiteboardImg from "./../assets/whiteboard.jpg";
import signageImg from "./../assets/signage.jpg";
import bgImage from "./../assets/conference.jpg";
import breakfastImg from "./../assets/breakfast.jpg";
import lunchImg from "./../assets/lunch.jpg";
import highTeaImg from "./../assets/high-tea.jpg";
import dinnerImg from "./../assets/dinner.jpg";

const venueItems = [
  { name: "Conference Room (Capacity:15)", cost: 3500, img: conferenceRoomImg },
  { name: "Auditorium Hall (Capacity:200)", cost: 5500, img: auditoriumImg },
  { name: "Presentation Room (Capacity:50)", cost: 700, img: presentationImg },
  { name: "Large Meeting Room (Capacity:10)", cost: 900, img: largeMeetingImg },
  { name: "Small Meeting Room (Capacity:5)", cost: 1100, img: smallMeetingImg },
];
const addonItems = [
  { name: "Projectors", cost: 200, img: projectorImg },
  { name: "Speakers", cost: 35, img: speakerImg },
  { name: "Microphones", cost: 45, img: microphoneImg },
  { name: "Whiteboards", cost: 80, img: whiteboardImg },
  { name: "Signage", cost: 80, img: signageImg },
];
const mealItems = [
  { name: "Breakfast", cost: 50, img: breakfastImg },
  { name: "Lunch", cost: 60, img: lunchImg },
  { name: "High Tea", cost: 25, img: highTeaImg },
  { name: "Dinner", cost: 70, img: dinnerImg },
];
function ConferenceEvent() {
  const [quantities, setQuantities] = useState(venueItems.map(() => 0));

  const increment = (index) => {
    setQuantities(quantities.map((q, i) => (i === index ? q + 1 : q)));
  };

  const decrement = (index) => {
    setQuantities(quantities.map((q, i) => (i === index && q > 0 ? q - 1 : q)));
  };
  const venueTotal = venueItems.reduce(
    (sum, item, i) => sum + item.cost * quantities[i],
    0,
  );
  const [addonQuantities, setAddonQuantities] = useState(
    addonItems.map(() => 0),
  );

  const incrementAddon = (index) => {
    setAddonQuantities(
      addonQuantities.map((q, i) => (i === index ? q + 1 : q)),
    );
  };

  const decrementAddon = (index) => {
    setAddonQuantities(
      addonQuantities.map((q, i) => (i === index && q > 0 ? q - 1 : q)),
    );
  };

  const addonTotal = addonItems.reduce(
    (sum, item, i) => sum + item.cost * addonQuantities[i],
    0,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedMeals, setSelectedMeals] = useState(
    mealItems.map(() => false),
  );

  const toggleMeal = (index) => {
    setSelectedMeals(selectedMeals.map((s, i) => (i === index ? !s : s)));
  };

  const mealsTotal = mealItems.reduce(
    (sum, item, i) =>
      selectedMeals[i] ? sum + item.cost * numberOfPeople : sum,
    0,
  );

  return (
    <div className="page-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="navbar-custom">
        <h3 className="brand">Conference Expense Planner</h3>
        <div className="nav-links">
          <a href="#venue">Venue</a>
          <a href="#addons">Add-ons</a>
          <a href="#meals">Meals</a>
        </div>
        <button className="details-btn" onClick={() => setShowDetails(true)}>
          Show Details
        </button>
      </nav>

      <section id="venue" className="section">
        <h2 className="section-title">Venue Room Selection</h2>

        <div className="cards">
          {venueItems.map((item, index) => (
            <div className="card-item" key={item.name}>
              <img src={item.img} alt={item.name} className="card-img" />
              <h5>{item.name}</h5>
              <p>${item.cost}</p>
              <div className="counter">
                <button onClick={() => decrement(index)}>−</button>
                <span>{quantities[index]}</span>
                <button onClick={() => increment(index)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="total-box">Total Cost: ${venueTotal}</div>
      </section>
      <section id="addons" className="section">
        <h2 className="section-title">Add-ons Selection</h2>

        <div className="cards">
          {addonItems.map((item, index) => (
            <div className="card-item" key={item.name}>
              <img src={item.img} alt={item.name} className="card-img" />
              <h5>{item.name}</h5>
              <p>${item.cost}</p>
              <div className="counter">
                <button onClick={() => decrementAddon(index)}>−</button>
                <span>{addonQuantities[index]}</span>
                <button onClick={() => incrementAddon(index)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="total-box">Total Cost: ${addonTotal}</div>
      </section>
      <section id="meals" className="section">
        <h2 className="section-title">Meals Selection</h2>

        <div className="people-input">
          <label>
            Number of People:{" "}
            <input
              type="number"
              min="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="cards">
          {mealItems.map((item, index) => (
            <div className="card-item" key={item.name}>
              <img src={item.img} alt={item.name} className="card-img" />
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals[index]}
                  onChange={() => toggleMeal(index)}
                />{" "}
                {item.name}
              </label>
              <p>${item.cost} per person</p>
            </div>
          ))}
        </div>

        <div className="total-box">Total Cost: ${mealsTotal}</div>
      </section>
      {showDetails && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowDetails(false)}>
              ✕
            </button>
            <h2>Total cost for the event</h2>
            <h1>${venueTotal + addonTotal + mealsTotal}</h1>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {venueItems.map(
                  (item, i) =>
                    quantities[i] > 0 && (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>${item.cost}</td>
                        <td>{quantities[i]}</td>
                        <td>${item.cost * quantities[i]}</td>
                      </tr>
                    ),
                )}

                {addonItems.map(
                  (item, i) =>
                    addonQuantities[i] > 0 && (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>${item.cost}</td>
                        <td>{addonQuantities[i]}</td>
                        <td>${item.cost * addonQuantities[i]}</td>
                      </tr>
                    ),
                )}

                {mealItems.map(
                  (item, i) =>
                    selectedMeals[i] && (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>${item.cost}</td>
                        <td>For {numberOfPeople} people</td>
                        <td>${item.cost * numberOfPeople}</td>
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConferenceEvent;
