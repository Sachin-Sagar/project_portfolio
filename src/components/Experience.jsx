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
    'Simulation Engineer': forbes_icon,
    'Bajaj Auto Technology Limited': batl_icon,
    'Bajaj Auto Technology Ltd (R&D)': batl_icon,
    'Reevia Motor': reevia_icon,
    'Forbes Marshall': forbes_icon
};

export const TimelineSection = ({ title, data }) => (
    <div className="timeline-section">
        <h3 className={title === 'College Experience' ? 'section-title' : 'timeline-category-title'}>{title}</h3>
        <div className="timeline-container">
            {data.map((item, index) => {
                const icon = companyIcons[item.company] || companyIcons[item.role];

                if (item.grouped) {
                    const groupedIcon = companyIcons[item.company];
                    return (
                        <FadeInSection key={index}>
                            <div className="timeline-grouped-block">
                                {item.company === 'Raftar Formula Racing' && (
                                    <div className="raftar-banner">
                                        <img src={rfr_car} alt="Raftar Formula Racing" />
                                    </div>
                                )}

                                <div className="grouped-header-container">
                                    {groupedIcon && (
                                        <img src={groupedIcon} alt={`${item.company} logo`} className="grouped-company-logo" />
                                    )}
                                    <div className="grouped-header-text">
                                        <div className="grouped-header-row">
                                            <h4 className="timeline-category-title" style={{ marginBottom: 0 }}>{item.company}</h4>
                                            <span className="grouped-period">
                                                {item.period} {item.totalDuration && `· ${item.totalDuration}`}
                                            </span>
                                        </div>
                                        {(item.location || item.workplaceType) && (
                                            <div className="grouped-meta">
                                                {[item.location, item.workplaceType].filter(Boolean).join(' · ')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grouped-roles-container">
                                    {item.roles.map((subRole, subIdx) => {
                                        if (subRole.tracks && subRole.tracks.length > 0) {
                                            return (
                                                <div key={subIdx} className="timeline-block designation-group-block">
                                                    <div
                                                        className="timeline-marker designation-marker"
                                                        style={{ borderColor: subRole.color || 'var(--accent-primary)' }}
                                                    ></div>

                                                    <div className="timeline-content">
                                                        <div className="designation-header">
                                                            <div className="designation-title-row">
                                                                <h3 className="designation-main-title">{subRole.designation}</h3>
                                                                <span className="designation-period">
                                                                    {subRole.period} {subRole.totalDuration && `· ${subRole.totalDuration}`}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="designation-tracks-container">
                                                            {subRole.tracks.map((track, tIdx) => (
                                                                <div key={tIdx} className="track-item">
                                                                    <div className="track-header">
                                                                        <div className="track-title-group">
                                                                            <h4 className="track-role-title">{track.role}</h4>
                                                                            {track.location && (
                                                                                <span className="role-location">{track.location}</span>
                                                                            )}
                                                                        </div>
                                                                        <span className="period">{track.period}</span>
                                                                    </div>
                                                                    <ul className="bullet-points">
                                                                        {track.bulletPoints.map((point, i) => (
                                                                            <li key={i}>{point}</li>
                                                                        ))}
                                                                    </ul>
                                                                    {track.milestone && (
                                                                        <div className="role-milestone">
                                                                            <span className="milestone-badge">🎯 {track.milestone}</span>
                                                                        </div>
                                                                    )}
                                                                    {track.skills && track.skills.length > 0 && (
                                                                        <div className="role-skills">
                                                                            {track.skills.map((skill, sIdx) => (
                                                                                <span key={sIdx} className="role-skill-pill">{skill}</span>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={subIdx} className="timeline-block sub-role-block">
                                                <div
                                                    className="timeline-marker"
                                                    style={{ borderColor: subRole.color || 'var(--accent-primary)' }}
                                                ></div>

                                                <div className="timeline-content">
                                                    <div className="timeline-header">
                                                        <div className="role-header-text">
                                                            <h3 className="role">
                                                                {subRole.designation ? (
                                                                    <>
                                                                        <span className="designation-text">{subRole.designation}</span>
                                                                        {subRole.role && (
                                                                            <span className="designation-subtext"> : {subRole.role}</span>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    subRole.role
                                                                )}
                                                            </h3>
                                                            {subRole.location && (
                                                                <span className="role-location">{subRole.location}</span>
                                                            )}
                                                        </div>
                                                        <span className="period">{subRole.period}</span>
                                                    </div>
                                                    {subRole.company && <h4 className="company">{subRole.company}</h4>}
                                                    <ul className="bullet-points">
                                                        {subRole.bulletPoints.map((point, i) => (
                                                            <li key={i}>{point}</li>
                                                        ))}
                                                    </ul>
                                                    {subRole.milestone && (
                                                        <div className="role-milestone">
                                                            <span className="milestone-badge">🎯 {subRole.milestone}</span>
                                                        </div>
                                                    )}
                                                    {subRole.skills && subRole.skills.length > 0 && (
                                                        <div className="role-skills">
                                                            {subRole.skills.map((skill, sIdx) => (
                                                                <span key={sIdx} className="role-skill-pill">{skill}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </FadeInSection>
                    );
                }

                // Render a normal single experience
                return (
                    <FadeInSection key={index}>
                        {item.company === 'Final Year Project (VECH Lab, IIT Madras)' && (
                            <h4 className="timeline-category-title" style={{ marginBottom: '0.5em' }}>
                                Final Year Project (<a href="https://sites.google.com/view/vcehl-iitm/home" target="_blank" rel="noreferrer">VECH Lab</a>, IIT Madras)
                            </h4>
                        )}
                        <div className="timeline-block">
                            {icon ? (
                                <img src={icon} alt={`${item.company} logo`} className="timeline-marker-img" />
                            ) : (
                                <div className="timeline-marker"></div>
                            )}

                            <div className="timeline-content">
                                {item.company === 'Bajaj Auto Technology Ltd (R&D)' && item.role?.includes('ADAS') && (
                                    <div className="raftar-banner" style={{ marginBottom: '1rem', marginLeft: '-1.5rem', textAlign: 'left' }}>
                                        <img src={bajaj_banner} alt="Bajaj Auto Technology Ltd banner" style={{ maxWidth: '95%' }} />
                                    </div>
                                )}
                                <div className="timeline-header">
                                    <div className="role-header-text">
                                        <h3 className="role">
                                            {item.designation ? (
                                                <>
                                                    <span className="designation-text">{item.designation}</span>
                                                    {item.role && (
                                                        <span className="designation-subtext"> : {item.role}</span>
                                                    )}
                                                </>
                                            ) : (
                                                item.role
                                            )}
                                        </h3>
                                        {item.location && (
                                            <span className="role-location">{item.location}</span>
                                        )}
                                    </div>
                                    <span className="period">{item.period}</span>
                                </div>
                                {item.role === 'Control of Camber Morphing Wing' && (
                                    <div className="raftar-banner" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', marginBottom: '1rem', height: '240px', justifyContent: 'center', padding: 0 }}>
                                        <img src={mpc_ctrl} alt="MPC Control Loop" style={{ maxWidth: 'calc(60% - 0.5rem)', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '0.35em' }} />
                                        <img src={morphing_wing} alt="Morphing Wing" style={{ maxWidth: 'calc(40% - 0.5rem)', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '0.35em' }} />
                                    </div>
                                )}
                                {item.company !== 'Final Year Project (VECH Lab, IIT Madras)' && (
                                    <h4 className="company">{item.company}</h4>
                                )}
                                <ul className="bullet-points">
                                    {item.bulletPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                                {item.milestone && (
                                    <div className="role-milestone">
                                        <span className="milestone-badge">🎯 {item.milestone}</span>
                                    </div>
                                )}
                                {item.skills && item.skills.length > 0 && (
                                    <div className="role-skills">
                                        {item.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="role-skill-pill">{skill}</span>
                                        ))}
                                    </div>
                                )}
                                {item.role === 'Control of Camber Morphing Wing' && (
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                                        <a href={`${import.meta.env.BASE_URL}docs/BTP_Poster.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Poster</a>
                                        <a href={`${import.meta.env.BASE_URL}docs/BTP_Report_signed.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Report</a>
                                        <a href="https://github.com/Sachin-Sagar/matlab_MPC_morphingWing" target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>GitHub Repo</a>
                                    </div>
                                )}
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
