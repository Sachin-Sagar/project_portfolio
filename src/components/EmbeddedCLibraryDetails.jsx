import React from 'react';
import './shared.css';

const EmbeddedCLibraryDetails = ({ project }) => {
    return (
        <div className="embedded-lib-details">
            {project && project.blog && (
                <section className="section" style={{ marginTop: '2em', paddingTop: '2em' }}>
                    <h2 className="section-title">Overview</h2>
                    <div className="project-blog" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                        {project.blog}
                    </div>
                </section>
            )}

            {/* FFT Section */}
            <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5em', marginTop: '4em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>1. Real-time Signal Processing (FFT)</h2>
                    {project?.fftGitRepo && (
                        <a href={project.fftGitRepo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85em', padding: '0.5em 1em' }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            View on GitHub
                        </a>
                    )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Optimized Radix-2 Implementation</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <h2 className="section-title">Importance in Embedded Systems</h2>
                <p style={{ lineHeight: '1.8' }}>
                    The Fast Fourier Transform (FFT) is foundational for analyzing signals in the frequency domain. In embedded applications, real-time frequency analysis is critical for several use cases:
                </p>
                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><strong>Audio Processing:</strong> Equalization, noise cancellation, and pitch detection require immediate frequency breakdown of audio signals.</li>
                    <li><strong>Telecommunications:</strong> Core to Orthogonal Frequency-Division Multiplexing (OFDM) used in modern wireless communications.</li>
                    <li><strong>Vibration Analysis:</strong> Detecting mechanical failures in industrial motors by monitoring frequency shifts in accelerometer data.</li>
                </ul>
            </section>

            <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                <h2 className="section-title">The Cooley-Tukey Method</h2>
                <div style={{ lineHeight: '1.8' }}>
                    <p>
                        The Cooley-Tukey algorithm reduces complexity from O(N²) to O(N log N) by recursively breaking down the N-point DFT into smaller DFTs. My implementation focuses on the <strong>Radix-2 Butterfly Operation</strong>:
                    </p>
                    <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '3em', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div>X<sub>k</sub> = E<sub>k</sub> + W<sub>N</sub><sup>k</sup> · O<sub>k</sub></div>
                        <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                        <div>X<sub>k + N/2</sub> = E<sub>k</sub> - W<sub>N</sub><sup>k</sup> · O<sub>k</sub></div>
                    </div>
                    <p>
                        To achieve sub-millisecond execution, I implemented a <strong>Bit-Reversal Sorting</strong> algorithm and a pre-computed <strong>Twiddle Factor LUT</strong> (Look-Up Table) to eliminate runtime trigonometric calculations.
                    </p>
                </div>
            </section>

            {/* Quaternions Section */}
            <div style={{ borderLeft: '4px solid var(--accent-secondary, #ff4d4d)', paddingLeft: '1.5em', marginTop: '5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>2. 3D Kinematics (Quaternions)</h2>
                    {project?.quaternionGitRepo && (
                        <a href={project.quaternionGitRepo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85em', padding: '0.5em 1em' }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            View on GitHub
                        </a>
                    )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Robust Orientation & Coordinate Rotation</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <h2 className="section-title">Why Quaternions?</h2>
                <p style={{ lineHeight: '1.8' }}>
                    While Euler angles (Roll, Pitch, Yaw) are intuitive, they suffer from <strong>Gimbal Lock</strong>—a loss of one degree of freedom when two axes align. Quaternions represent rotations as a vector in 4D space, providing a smooth, continuous representation without singularities.
                </p>
                <div className="math-equation">
                    q = w + xi + yj + zk &nbsp; | &nbsp; w² + x² + y² + z² = 1
                </div>
            </section>

            <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                <h2 className="section-title">Optimized Vector Rotation</h2>
                <p style={{ lineHeight: '1.8' }}>
                    Compared to the standard sandwich product, the specialized rotation formula significantly reduces floating-point multiplications:
                </p>
                <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '3em', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>p' = qpq⁻¹</div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>v' = v + 2w(q<sub>vec</sub> × v) + 2(q<sub>vec</sub> × (q<sub>vec</sub> × v))</div>
                </div>
                <p style={{ lineHeight: '1.8' }}>
                    This optimized approach treats the vector part separately, avoiding the overhead of full quaternion multiplication and making it ideal for real-time RTOS environments.
                </p>
            </section>

            <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                <h2 className="section-title">Implementation Highlights</h2>
                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><strong>Static Memory:</strong> No dynamic allocation (no <code>malloc</code>), ensuring deterministic behavior for RTOS environments.</li>
                    <li><strong>Pass-by-Pointer:</strong> Minimized stack usage by passing large structures via pointers.</li>
                    <li><strong>Normalization:</strong> Periodic re-normalization to combat floating-point drift over long-duration simulations.</li>
                </ul>
            </section>
        </div>
    );
};

export default EmbeddedCLibraryDetails;
