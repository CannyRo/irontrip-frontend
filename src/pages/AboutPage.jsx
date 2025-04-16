import React from "react";
import "../App.css"; 

export const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About IronTrip App</h1>
      <section className="project-description">
        <p>
          IronTrip is a web application designed to help users plan their trips
          and discover new destinations. The app allows users to create and
          manage their travel itineraries, including adding destinations,
          activities, and accommodations. Users can also search for popular
          destinations and view travel tips and recommendations from other
          travelers.
        </p>
      </section>
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="developer-profiles">
          <div className="developer">
            <h3>Ronan</h3>
            <a
              href="https://github.com/CannyRo"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="developer">
            <h3>Enrique</h3>
            <a
              href="https://github.com/ecastanedam"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

