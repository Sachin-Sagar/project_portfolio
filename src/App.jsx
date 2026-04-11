import React from 'react';
import portfolioData from './data.json';
import './App.css'; // component-specific styles
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Courses from './components/Courses';
import Sidebar from './components/Sidebar';
import FadeInSection from './components/FadeInSection';

import prof_photo from './assets/pics/prof_photo.png';

function App() {
  const { basics, skills, experience, projects, education, courses } = portfolioData;

  return (
    <div className="app-container">
      <Sidebar basics={basics} />

      <main id="main">
        <FadeInSection>
        <section id="about" className="animate-fade-in section">
          <h2 className="section-title">About me:</h2>
          <div className="about-content clearfix">
            <img src={prof_photo} alt="Profile" className="about-profile-photo" />
            {basics.summary.split('\n\n').map((paragraph, index) => (
              <p key={index} className="hero-summary" style={{ marginBottom: '1em' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        </FadeInSection>

        <Experience experienceData={experience} />
        <Projects projectsData={projects} />
        <Skills skillsData={skills} />
        <Courses coursesData={courses} />
        <Education educationData={education} />
      </main>
    </div>
  );
}

export default App;
