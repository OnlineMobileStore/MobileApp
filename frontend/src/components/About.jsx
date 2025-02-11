import React from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Footer from './Footer'; // Assuming you have a Footer component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const About = () => {
  return (
    <div className="about-page">
      {/* Navbar Component */}
      <Navbar />

      {/* About Section */}
      <div className="container text-center py-5 about-header">
        <h1 className="display-3 text-dark">Welcome to Online Mobile Store</h1>
        <p className="lead text-dark">Your one-stop shop for the latest mobile phones and accessories!</p>
      </div>

      <section className="about-story py-5">
        <div className="container">
          <h2 className="text-center text-dark animate__animated animate__fadeInUp">Our Story</h2>
          <p className="text-dark animate__animated animate__fadeInUp">
            Online Mobile Store was created by a team of passionate freshers who are all full-stack developers. We came together to
            build a seamless online shopping experience for mobile phones and accessories. Each member contributed equally in the design,
            frontend, and backend of the platform. 
          </p>
          <p className="text-dark animate__animated animate__fadeInUp">
            Our goal was to create a user-friendly, efficient, and secure online store that caters to the needs of mobile enthusiasts.
            We worked collaboratively to ensure the best practices in web development, performance optimization, and responsive design.
          </p>
        </div>
      </section>

      <section className="about-team py-5 bg-dark">
        <div className="container">
          <h2 className="text-center text-light mb-4 animate__animated animate__fadeInUp">Meet Our Team</h2>
          <div className="row">
            {/* Team Member 1 - Supriya Ratnaparkhe (Now has Chaitanya's Description) */}
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-light">
                <img src="https://via.placeholder.com/150" alt="Supriya Ratnaparkhe" className="card-img-top rounded-circle" />
                <div className="card-body text-center">
                  <h5 className="card-title text-light">Supriya Ratnaparkhe</h5>
                  <p className="card-text text-light"><strong>Full Stack Developer</strong></p>
                  <p className="text-light">
                    Supriya contributed to both the front-end and back-end of the platform. She worked on the user interface design and
                    integrated features like authentication, mobile listing, and payment gateway.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 - Chaitanya Hiray (Now has Supriya's Description) */}
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-light">
                <img src="https://via.placeholder.com/150" alt="Chaitanya Hiray" className="card-img-top rounded-circle" />
                <div className="card-body text-center">
                  <h5 className="card-title text-light">Chaitanya Hiray</h5>
                  <p className="card-text text-light"><strong>Full Stack Developer</strong></p>
                  <p className="text-light">
                    Chaitanya worked on both front-end development and backend logic, focusing on optimizing user interactions and integrating
                    features such as product search and real-time updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-light">
                <img src="https://via.placeholder.com/150" alt="Bhagyashri Attarde" className="card-img-top rounded-circle" />
                <div className="card-body text-center">
                  <h5 className="card-title text-light">Bhagyashri Attarde</h5>
                  <p className="card-text text-light"><strong>Full Stack Developer</strong></p>
                  <p className="text-light">
                    Bhagyashri focused on both front-end and back-end development, ensuring smooth navigation and performance. She also
                    contributed to integrating various mobile listings with database management.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="col-md-3 mb-4">
              <div className="card bg-transparent border-light">
                <img src="https://via.placeholder.com/150" alt="Akshita Chakrod" className="card-img-top rounded-circle" />
                <div className="card-body text-center">
                  <h5 className="card-title text-light">Akshita Chakrod</h5>
                  <p className="card-text text-light"><strong>Full Stack Developer</strong></p>
                  <p className="text-light">
                    Akshita worked on building robust backend systems while also contributing to the front-end, ensuring a smooth and
                    secure user experience for the store's customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission py-5">
        <div className="container text-center">
          <h2 className="text-dark animate__animated animate__fadeInUp">Our Mission</h2>
          <p className="text-dark animate__animated animate__fadeInUp">
            As full-stack developers, we aim to build a dynamic, reliable, and secure platform. Our mission is to make mobile shopping
            as easy and enjoyable as possible. By leveraging modern technologies, we ensure that every customer enjoys an intuitive,
            responsive, and efficient shopping experience.
          </p>
        </div>
      </section>

      <section className="about-cta py-5 bg-dark">
        <div className="container text-center">
          <h2 className="text-light animate__animated animate__fadeInUp">Join Our Community</h2>
          <p className="text-light animate__animated animate__fadeInUp">
            Follow us on social media to stay updated with the latest trends in mobile phones and technology. Join the revolution of mobile
            enthusiasts today!
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default About;
