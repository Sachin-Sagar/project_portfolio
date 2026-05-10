import React from 'react';
import { Link } from 'react-router-dom';
import './shared.css';
import FadeInSection from './FadeInSection';

import mpcLoopImg from '../assets/pics/MPC_ctrlLoop.png';
import roadAnomalyImg from '../assets/pics/road_anomaly_tile.png';
import embeddedLibsImg from '../assets/pics/embedded_libs_tile.png';
import gpuClusteringImg from '../assets/pics/gpu_clustering_tile.png';
import chaosTheoryImg from '../assets/pics/chaos_theory_tile.png';
import posterDoc from '../assets/docs/ME19B159_Poster.pdf';

const projectAssets = {
    "Control of Camber Morphing Wing": {
        image: mpcLoopImg,
        link: posterDoc
    },
    "Custom Embedded C Libraries": {
        image: embeddedLibsImg
    },
    "Road-Anomaly Detection & Geospatial Mapping": {
        image: roadAnomalyImg
    },
    "GPU Accelerated Clustering": {
        image: gpuClusteringImg
    },
    "Chaos Theory: SIMD Optimization Lab": {
        image: chaosTheoryImg
    }
};

const Projects = ({ projectsData, theme }) => {
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
                                    {project.id ? (
                                        <Link to={`/project/${project.id}`} style={{ color: 'inherit', textDecoration: 'none', borderBottom: 'none' }}>
                                            {project.name} <span style={{ fontSize: '0.6em', color: 'var(--accent-primary)', marginLeft: '10px' }}>&#128196; View Details</span>
                                        </Link>
                                    ) : assets?.link ? (
                                        <a href={assets.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: 'none' }}>
                                            {project.name} <span style={{ fontSize: '0.6em', color: 'var(--accent-primary)', marginLeft: '10px' }}>&#128196; View Poster</span>
                                        </a>
                                    ) : project.name}
                                </h3>
                                {assets?.image && (
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0.5em 0' }}>
                                        <img
                                            src={assets.image}
                                            alt={project.name}
                                            style={{
                                                width: '100%',
                                                maxWidth: '220px',
                                                maxHeight: 'auto',
                                                objectFit: 'contain',
                                                height: 'auto',
                                                borderRadius: '8px',
                                                filter: theme === 'dark' ? 'brightness(0.9)' : 'none',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        />
                                    </div>
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
