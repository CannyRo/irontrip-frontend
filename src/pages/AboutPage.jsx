import React from "react";
import "../App.css";

export const AboutPage = () => {
  return (
    <main>
      <div className="about-container">
        <h1 className="about-title">About IronTrip App</h1>
        <section className="about-description">
          <p>
            IronTrip is a web application designed to help users plan their
            trips and discover new destinations. In the end, the application
            will enable users to create and manage their travel itineraries,
            including adding destinations, activities and accommodations. Users
            could also search for popular destinations and consult tips and
            recommendations from other travelers. The current feature is focus
            on creating a profile, listings and booking some dates.
          </p>
        </section>
        <section className="about-team">
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
    </main>
  );
};
