import bgImage from '../assets/conference.jpg'
import './LandingPage.css'

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="landing-overlay">
        <div className="landing-left">
          <h1>Conference Expense Planner</h1>
          <p>Plan your next major event with us!</p>
          <button className="get-started" onClick={onGetStarted}>
            Get Started
          </button>
        </div>

        <div className="landing-right">
          <p>
            Welcome to BudgetEase Solutions, your trusted partner in simplifying
            budget management and financial solutions. We provide intuitive,
            user-friendly solutions to meet the diverse needs of our clients.
          </p>
          <p>
            With a commitment to efficiency and innovation, we empower
            individuals and businesses to take control of their finances and
            achieve their goals with ease.
          </p>
          <p>
            Our mission is to make budgeting effortless and accessible for
            everyone, with tailored solutions to streamline your budgeting
            process.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage