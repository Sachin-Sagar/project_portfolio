import React from 'react';
import './shared.css';
import FadeInSection from './FadeInSection';

const Skills = ({ skillsData }) => {
  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title">Specialized Skills</h2>
      <div className="skills-container">
        {Object.entries(skillsData).map(([category, skills]) => (
          <FadeInSection key={category}>
          <div className="skill-category glass-panel">
            <h3 className="category-title">{category}</h3>
            <div className="skill-tags">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
};

export default Skills;
