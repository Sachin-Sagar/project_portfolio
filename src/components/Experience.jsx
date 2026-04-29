import React from 'react';
import FadeInSection from './FadeInSection';
import './shared.css';
import rfr_car from '../assets/pics/RFR_Car.png';
import bajaj_banner from '../assets/pics/Bajaj_auto_icon.jpg';
import batl_icon from '../assets/pics/BATL_icon.jpg';
import reevia_icon from '../assets/pics/reevia_icon.jpg';
import forbes_icon from '../assets/pics/forbes-marshall.png';
import mpc_ctrl from '../assets/pics/MPC_ctrlLoop.png';
import morphing_wing from '../assets/pics/morphing_wing.png';

const companyIcons = {
    'Engine Testing (Internship)': batl_icon,
    'Product Design Intern': reevia_icon,
    'Simulation Engineer': forbes_icon
};

export const TimelineSection = ({ title, data }) => (
    <div className="timeline-section">
        <h3 className="timeline-category-title">{title}</h3>
        <div className="timeline-container">
            {data.map((item, index) => {
                const icon = companyIcons[item.role];

                if (item.grouped) {
                    // Render a grouped experience (like Raftar)
                    return (
                        <FadeInSection key={index}>
                            <div className="timeline-grouped-block">
                                {item.company === 'Raftar Formula Racing' && (
                                    <div className="raftar-banner">
                                        <img src={rfr_car} alt="Raftar Formula Racing" />
                                    </div>
                                )}
                                <h4 className="company grouped-company">{item.company}</h4>
                                <span className="grouped-period">{item.period}</span>

                                <div className="grouped-roles-container">
                                    {item.roles.map((subRole, subIdx) => (
                                        <div key={subIdx} className="timeline-block sub-role-block">
                                            <div
                                                className="timeline-marker"
                                                style={{ borderColor: subRole.color || 'var(--accent-primary)' }}
                                            ></div>

                                            <div className="timeline-content">
                                                <div className="timeline-header">
                                                    <h3 className="role">{subRole.role}</h3>
                                                    <span className="period">{subRole.period}</span>
                                                </div>
                                                {subRole.company && <h4 className="company">{subRole.company}</h4>}
                                                <ul className="bullet-points">
                                                    {subRole.bulletPoints.map((point, i) => (
                                                        <li key={i}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInSection>
                    );
                }

                // Render a normal single experience
                return (
                    <FadeInSection key={index}>
                        <div className="timeline-block">
                            {icon ? (
                                <img src={icon} alt={`${item.company} logo`} className="timeline-marker-img" />
                            ) : (
                                <div className="timeline-marker"></div>
                            )}

                            <div className="timeline-content">
                                {item.company === 'Bajaj Auto Technology Ltd (R&D)' && item.role.includes('ADAS') && (
                                    <div className="raftar-banner" style={{ marginBottom: '1rem', marginLeft: '-1.5rem', textAlign: 'left' }}>
                                        <img src={bajaj_banner} alt="Bajaj Auto Technology Ltd banner" style={{ maxWidth: '95%' }} />
                                    </div>
                                )}
                                <div className="timeline-header">
                                    <h3 className="role">{item.role}</h3>
                                    <span className="period">{item.period}</span>
                                </div>
                                {item.role === 'Control of Camber Morphing Wing' && (
                                    <div className="raftar-banner" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', marginBottom: '1rem', height: '240px', justifyContent: 'center', padding: 0 }}>
                                        <img src={mpc_ctrl} alt="MPC Control Loop" style={{ maxWidth: 'calc(60% - 0.5rem)', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '0.35em' }} />
                                        <img src={morphing_wing} alt="Morphing Wing" style={{ maxWidth: 'calc(40% - 0.5rem)', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '0.35em' }} />
                                    </div>
                                )}
                                <h4 className="company">{item.company}</h4>
                                <ul className="bullet-points">
                                    {item.bulletPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeInSection>
                );
            })}
        </div>
    </div>
);

const Experience = ({ experienceData }) => {
    return (
        <section id="experience" className="section experience-section">
            <h2 className="section-title">Experience</h2>

            {experienceData.professional && experienceData.professional.length > 0 && (
                <TimelineSection title="Professional Experience" data={experienceData.professional} />
            )}

            {experienceData.college && experienceData.college.length > 0 && (
                <TimelineSection title="College Experience" data={experienceData.college} />
            )}

            {experienceData.internships && experienceData.internships.length > 0 && (
                <TimelineSection title="Internships" data={experienceData.internships} />
            )}
        </section>
    );
};

export default Experience;
