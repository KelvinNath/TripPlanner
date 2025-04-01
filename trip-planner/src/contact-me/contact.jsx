import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin } from 'react-icons/fa';


const ContactME = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>CONTACT ME</h1>
        <div className="contact-cards">
          
          <div className="contact-card">
            <FaPhone className="contact-icon"/>
            <h3>Phone</h3>
            <p>8106976094</p>
          </div>

          <div className="contact-card">
            <FaEnvelope className="contact-icon"/>
            <h3>Email</h3>
            <p>kelvinonwork2004@gmail.com</p>
          </div>

          <div className="contact-card">
            <FaLinkedin className="contact-icon"/>
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/in/kelvin-nath-a23b2a298/" target="_blank" rel="noopener noreferrer">
              Connect with me
            </a>
          </div>

        </div>
      </div>

      <style jsx>{`
        .contact-container {
          min-height: 100vh;
          background: white;
          color: #ffffff;
          padding: 50px 20px;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        h1 {
          font-size: 3rem;
          margin-top:5rem;
         
          color: #e50914;
        }

        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          padding: 20px;
        }

        .contact-card {
          background: orange;
          padding: 30px;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-10px);
          background: rgba(51, 51, 51, 0.9);
        }

        .contact-icon {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        p {
          font-size: 1.1rem;
          color: #cccccc;
        }

        a {
          color: #e50914;
          text-decoration: none;
          font-size: 1.1rem;
          transition: color 0.3s ease;
        }

        a:hover {
          color: #ff1a1a;
        }

        @media (max-width: 768px) {
          .contact-cards {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactME;