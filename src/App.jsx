import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import portfolioData from './data.json';
import './App.css'; // component-specific styles
import { TimelineSection } from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Courses from './components/Courses';
import Sidebar from './components/Sidebar';
import FadeInSection from './components/FadeInSection';
import ProjectDetail from './components/ProjectDetail';

import prof_photo from './assets/pics/prof_photo.png';

const Home = ({ basics, skills, experience, projects, education, courses, theme, toggleTheme }) => (
  <div className="app-container">
    <Sidebar basics={basics} theme={theme} toggleTheme={toggleTheme} />

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

      <section id="experience" className="section experience-section">
          <h2 className="section-title">Experience</h2>
          {experience.professional && experience.professional.length > 0 && (
              <TimelineSection title="Professional Experience" data={experience.professional} />
          )}
      </section>

      <Projects projectsData={projects} />

      <section className="section experience-section" style={{ borderTop: 'none', marginTop: '6em', padding: '0' }}>
          {experience.college && experience.college.length > 0 && (
              <TimelineSection title="College Experience" data={experience.college} />
          )}

          {experience.internships && experience.internships.length > 0 && (
              <TimelineSection title="Internships" data={experience.internships} />
          )}
      </section>

      <Skills skillsData={skills} />
      <Courses coursesData={courses} />
      <Education educationData={education} />
    </main>
  </div>
);

function App() {
  const { basics, skills, experience, projects, education, courses } = portfolioData;
  
  // Initialize theme from localStorage or default to light
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  // Update localStorage and data-theme attribute whenever theme changes
  React.useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home 
            basics={basics} 
            skills={skills} 
            experience={experience} 
            projects={projects} 
            education={education} 
            courses={courses} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
        } />
        <Route path="/project/:projectId" element={
          <ProjectDetail theme={theme} toggleTheme={toggleTheme} />
        } />
      </Routes>
    </Router>
  );
}

export default App;
