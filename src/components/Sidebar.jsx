import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import avatar from '../assets/pics/IITM_logo.png';
import AtsExportModal from './AtsExportModal';

const Sidebar = ({ basics, theme, toggleTheme, portfolioData }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const handleLinkClick = () => {
        if (window.innerWidth <= 980) {
            setIsCollapsed(true);
        }
    };

    useEffect(() => {
        let ticking = false;

        const updateScroll = () => {
            const inner = document.querySelector('#header > .inner');
            const footer = document.querySelector('#header > #footer');

            if (window.innerWidth > 980) {
                const scrollY = window.scrollY;
                const offset = scrollY * 0.02;
                if (inner) inner.style.transform = `translateY(-${offset}px)`;
                if (footer) footer.style.transform = `translateY(-${offset}px)`;
            } else {
                if (inner) inner.style.transform = 'none';
                if (footer) footer.style.transform = 'none';
            }
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        // Initial call to set correct position
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <header id="header" className={isCollapsed ? 'collapsed' : ''}>
            <div className="mobile-top-bar">
                <span className="mobile-title">{basics.name}</span>
                <button className="mobile-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? '☰' : '✕'}
                </button>
            </div>

            <div className="inner">
                <a href="https://www.iitm.ac.in/" target="_blank" rel="noreferrer" className="image avatar">
                    <img src={avatar} alt="Profile Avatar" />
                </a>
                <h1>
                    <strong>I am {basics.name}</strong>, an {basics.title}
                    <br /> from {basics.education} specializing in
                    <br /> ADAS and Embedded Applications.
                </h1>

                {basics.location && (
                    <div className="sidebar-location" style={{ marginTop: '0.6em', fontSize: '0.88em', color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4em' }}>
                        <span>📍</span>
                        <span>{basics.location}</span>
                    </div>
                )}

                <nav className="sidebar-nav">
                    <a href="#about" onClick={handleLinkClick}>About</a>
                    <a href="#experience" onClick={handleLinkClick}>Experiences</a>
                    <a href="#projects" onClick={handleLinkClick}>Projects</a>
                    <a href="#skills" onClick={handleLinkClick}>Skills</a>
                    <a href="#education" onClick={handleLinkClick}>Education</a>
                </nav>

                <div className="sidebar-actions">
                    <button
                        type="button"
                        onClick={() => setIsExportModalOpen(true)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.9em', height: '2.5em', lineHeight: '2.2em', padding: '0 1.5em', cursor: 'pointer' }}
                    >
                        Download Resume
                    </button>
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
                    {basics.phone && (
                        <a href={`tel:${basics.phone}`} className="icon solid" aria-label={`Call ${basics.phone}`} title={basics.phone}>
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </a>
                    )}
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

            <AtsExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                data={portfolioData || { basics }}
            />
        </header>
    );
};

export default Sidebar;
