import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import portfolioData from '../data.json';
import FadeInSection from './FadeInSection';
import EmbeddedCLibraryDetails from './EmbeddedCLibraryDetails';
import './shared.css';

const ProjectDetail = ({ theme, toggleTheme }) => {
    const { projectId } = useParams();
    
    // Find the project matching the ID from the URL
    const project = portfolioData.projects.find(p => p.id === projectId);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div style={{ padding: '6em 4em', textAlign: 'center' }}>
                <h2>Project Not Found</h2>
                <Link to="/" className="btn btn-primary">Return to Home</Link>
            </div>
        );
    }

    return (
        <div id="main" style={{ marginLeft: 0, width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '4em 2em' }}>
            <FadeInSection>
                <div style={{ marginBottom: '2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" className="btn" style={{ fontSize: '0.9em', padding: '0 1em', height: '2.5em', lineHeight: '2.5em' }}>
                        &larr; Back to Home
                    </Link>
                    <button onClick={toggleTheme} className="btn" style={{ padding: '0 1em', height: '2.5em', lineHeight: '2.5em', fontSize: '0.9em' }}>
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </div>
                
                <h1 className="hero-title">{project.name}</h1>
                <p className="hero-summary" style={{ marginBottom: '1em' }}>
                    {project.context} &bull; {project.period}
                </p>

                {project.gitRepo && (
                    <div style={{ marginBottom: '3em' }}>
                        <a href={project.gitRepo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            View on GitHub
                        </a>
                    </div>
                )}

                {project.id === 'embedded-c-libraries' ? (
                    <EmbeddedCLibraryDetails project={project} />
                ) : (
                    project.blog && (
                        <section className="section" style={{ marginTop: '2em', paddingTop: '2em' }}>
                            <h2 className="section-title">Overview</h2>
                            <div className="project-blog" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                                {project.blog}
                            </div>
                        </section>
                    )
                )}

                {project.results && project.results.length > 0 && (
                    <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                        <h2 className="section-title">Key Results</h2>
                        <ul className="bullet-points" style={{ marginTop: '1em' }}>
                            {project.results.map((result, i) => (
                                <li key={i} style={{ marginBottom: '0.8em' }}>{result}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </FadeInSection>
        </div>
    );
};

export default ProjectDetail;
