import React from 'react';
import './shared.css';
import FadeInSection from './FadeInSection';
import uni_logo from '../assets/pics/iit-Madras-logo.png';

const Education = ({ educationData }) => {
    return (
        <section id="education" className="section education-section">
            <h2 className="section-title">Education</h2>
            <div className="timeline">
                {educationData.map((item, index) => (
                    <FadeInSection key={index}>
                    <div className="timeline-item glass-panel">
                        <div className="raftar-banner" style={{ marginBottom: '1.5em', marginTop: '0.5em', textAlign: 'left' }}>
                            <a href="https://www.iitm.ac.in/" target="_blank" rel="noreferrer">
                                <img src={uni_logo} alt="IIT Madras Logo" style={{ width: '500px' }} />
                            </a>
                        </div>
                        <div className="timeline-header">
                            <h3 className="role">{item.degree}</h3>
                            <span className="period">{item.year}</span>
                        </div>
                        <h4 className="company gradient-text">{item.institution}</h4>
                        {item.minor && <p style={{ marginBottom: '0.2rem', color: '#494949', fontWeight: '500' }}>Minor: {item.minor}</p>}
                        <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>CGPA: {item.cgpa}</p>
                        {item.notes && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.notes}</p>}
                    </div>
                    </FadeInSection>
                ))}
            </div>
        </section>
    );
};

export default Education;
