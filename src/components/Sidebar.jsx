import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import avatar from '../assets/pics/IITM_logo.png';

const Sidebar = ({ basics }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <header id="header">
            <div className="inner">
                <a href="#" className="image avatar">
                    <img src={avatar} alt="Profile Avatar" />
                </a>
                <h1>
                    <strong>I am {basics.name}</strong>, an {basics.title}
                    <br /> from {basics.education} specializing in
                    <br /> ADAS and Embedded Applications.
                </h1>

                <nav className="sidebar-nav">
                    <a href="#about">About</a>
                    <a href="#experience">Experiences</a>
                    <a href="#projects">Projects</a>
                    <a href="#skills">Skills</a>
                    <a href="#education">Education</a>
                </nav>

                <div className="sidebar-actions">
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.9em', height: '2.5em', lineHeight: '2.2em', padding: '0 1.5em' }}>Download Resume</a>
                </div>

                <div className="social-links">
                    {basics.github && (
                        <a href={basics.github} target="_blank" rel="noreferrer" className="icon brands" aria-label="GitHub Profile">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    )}
                    {basics.linkedin && (
                        <a href={basics.linkedin} target="_blank" rel="noreferrer" className="icon brands" aria-label="LinkedIn Profile">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    )}
                    <a href={`mailto:${basics.email}`} className="icon solid" aria-label="Email Me">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </a>
                </div>

                <div className="sidebar-footer-actions" style={{ marginTop: '1.5em', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={toggleTheme} className="btn" style={{ padding: '0 1em', height: '2.5em', lineHeight: '2em', fontSize: '0.9em', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                </div>
            </div>
            <footer id="footer">
                <div className="inner">
                    <ul className="copyright">
                        <li>&copy; {basics.name}</li>
                        <li>Design inspired by <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                </div>
            </footer>
        </header>
    );
};

export default Sidebar;
