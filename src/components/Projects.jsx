import React from 'react';
import './shared.css';
import FadeInSection from './FadeInSection';

import mpcLoopImg from '../assets/pics/MPC_ctrlLoop.png';
import posterDoc from '../assets/docs/ME19B159_Poster.pdf';

const projectAssets = {
    "Control of Camber Morphing Wing": {
        image: mpcLoopImg,
        link: posterDoc
    }
};

const Projects = ({ projectsData }) => {
    return (
        <section id="projects" className="section projects-section">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
                {projectsData.map((project, index) => {
                    const assets = projectAssets[project.name];
                    return (
                        <FadeInSection key={index}>
                        <div className="project-card glass-panel">
                            <h3 className="project-title">
                                {assets?.link ? (
                                    <a href={assets.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: 'none' }}>
                                        {project.name} <span style={{ fontSize: '0.6em', color: 'var(--accent-primary)', marginLeft: '10px' }}>&#128196; View Poster</span>
                                    </a>
                                ) : project.name}
                            </h3>
                            {assets?.image && (
                                <img src={assets.image} alt={project.name} style={{ width: '100%', maxWidth: '900px', borderRadius: '0.35em', margin: '1em 0', display: 'block', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            )}
                            <p className="project-context">{project.context} &bull; {project.period}</p>
                            <ul className="bullet-points">
                                {project.bulletPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                        </FadeInSection>
                    )
                })}
            </div>
        </section>
    );
};

export default Projects;
