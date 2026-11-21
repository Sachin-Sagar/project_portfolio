import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './shared.css';
import FadeInSection from './FadeInSection';

import mpcLoopImg from '../assets/pics/MPC_ctrlLoop.png';
import roadAnomalyImg from '../assets/pics/road_anomaly_tile.png';
import imuAnalyticsImg from '../assets/pics/imu_edge_analytics_tile.png';
import embeddedLibsImg from '../assets/pics/embedded_libs_tile.png';
import gpuClusteringImg from '../assets/pics/gpu_clustering_tile.png';
import chaosTheoryImg from '../assets/pics/chaos_theory_tile.png';
import posterDoc from '../assets/docs/ME19B159_Poster.pdf';

const projectAssets = {
    "Edge IMU Motion Analytics & Vibration DSP": {
        image: imuAnalyticsImg
    },
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
    const [selectedDomain, setSelectedDomain] = useState('All');

    // Extract unique domains dynamically preserving order of first appearance
    const domains = useMemo(() => {
        const list = ['All'];
        projectsData.forEach(p => {
            if (p.domain && !list.includes(p.domain)) {
                list.push(p.domain);
            }
        });
        return list;
    }, [projectsData]);

    // Count projects per domain
    const domainCounts = useMemo(() => {
        const counts = { All: projectsData.length };
        projectsData.forEach(p => {
            if (p.domain) {
                counts[p.domain] = (counts[p.domain] || 0) + 1;
            }
        });
        return counts;
    }, [projectsData]);

    const filteredProjects = useMemo(() => {
        if (selectedDomain === 'All') return projectsData;
        return projectsData.filter(p => p.domain === selectedDomain);
    }, [projectsData, selectedDomain]);

    return (
        <section id="projects" className="section projects-section">
            <h2 className="section-title">Personal Projects</h2>

            {domains.length > 1 && (
                <div className="project-filter-bar">
                    {domains.map(domain => (
                        <button
                            key={domain}
                            type="button"
                            className={`project-filter-pill ${selectedDomain === domain ? 'active' : ''}`}
                            onClick={() => setSelectedDomain(domain)}
                        >
                            <span>{domain}</span>
                            <span className="project-filter-count">({domainCounts[domain] || 0})</span>
                        </button>
                    ))}
                </div>
            )}

            <div className="projects-grid">
                {filteredProjects.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3em 1em', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
                        <p>No projects in this domain yet. Check back soon!</p>
                    </div>
                ) : (
                    filteredProjects.map((project, index) => {
                        const assets = projectAssets[project.name] || (project.id && projectAssets[project.id]);
                        const imageSrc = assets?.image || project.image;
                        return (
                            <FadeInSection key={project.id || index}>
                                <div className="project-card glass-panel">
                                    {project.domain && (
                                        <div>
                                            <span className="project-domain-badge">{project.domain}</span>
                                        </div>
                                    )}
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
                                    {imageSrc && (
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0.5em 0' }}>
                                            <img
                                                src={imageSrc}
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
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default Projects;
