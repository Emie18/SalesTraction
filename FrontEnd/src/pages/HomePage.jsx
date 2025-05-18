import { useState, useEffect } from 'react';
import "../styles/homepage.css"
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      image: "clara.jpg",
      stars: 4.5,
      text: "Amazing ! I earn a lot of money !"
    },
    {
      image: "clara.jpg",
      stars: 5,
      text: "Great platform! Connected with startups instantly."
    },
    {
      image: "clara.jpg",
      stars: 4,
      text: "SalesTraction helped me grow my business."
    },
    {
      image: "clara.jpg",
      stars: 5,
      text: "Best decision for my startup! Highly recommend."
    },
    {
      image: "clara.jpg",
      stars: 4.5,
      text: "Excellent service and amazing support team!"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55">
          <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
        </svg>
      );
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55">
          <path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
        </svg>
      );
    }
    
    // Empty stars to complete 5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF55" opacity="0.3">
          <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className='homepage'>
      <div className="title_login">
        <h1>SalesTraction</h1>
        <a href='/login'>Login</a>
        <img src='/logoSsans_bg.png'/>
      </div>
      <div className="catchphrase">
        <p>Built for founders who move fast and students who sell faster.</p>
      </div>
      <div className="iam">
        <div className="student" onClick={() => navigate('/student/register')} style={{ cursor: 'pointer' }}>
          <p>I'm a student</p>
        </div>
        <div className="startup" onClick={() => navigate('/startup/register')} style={{ cursor: 'pointer' }}>
          <p>I'm a start-up</p>
        </div>
      </div>
      <div className="description">
        <p>
          Logoden biniou degemer mat an penn, ar bed danvez Skrigneg.
          Atlantel c'horn chase tagañ, ifern he bloavezh huanadiñ, ouzhit kav.
          Neuze amanenn moereb evañ, gwech rimiañ paner niz, levrioù kibellañ.
          Aod yaouank lavarout glav.
        </p>
      </div>
      <div className="chiffre">
        <div><p>99.9 %</p></div>
        <div><p>Satisfied customer</p></div>
      </div>
      
      <div className="testimonials-container">
        <div 
          className="testimonials-carousel" 
          style={{ 
            transform: `translateX(${-currentIndex * 100}%)` 
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <div className="image_client">
                <img className='img_c' src={testimonial.image} alt={`Client ${index + 1}`} />
              </div>
              <div className="star_sentence">
                <div className="star">
                  {renderStars(testimonial.stars)}
                </div>
                <div className="sentence">
                  <p>{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <div 
            key={index} 
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      
      <div className="footer">
        <p>@ Emilie Le Rouzic & Maxime Phalippou</p>
      </div>
    </div>
  );
}