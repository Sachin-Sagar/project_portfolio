import React from 'react';
import './shared.css';

const Courses = ({ coursesData }) => {
    return (
        <section id="courses" className="section courses-section">
            <h2 className="section-title">Certifications & Courses</h2>
            <div className="skills-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {coursesData.map((course, index) => (
                    <div key={index} className="skill-category glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-primary)' }}>
                        <h3 className="category-title" style={{ margin: 0, fontSize: '1.05rem' }}>{course}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Courses;
