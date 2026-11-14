import React from 'react';
import './shared.css';

import polarKinematicsImg from '../assets/pics/imu_analytics/08_engine_vibration_kinematics_polar.png';
import psdGroundImg from '../assets/pics/imu_analytics/01_ground_segment_imu_psd.png';
import butterworthBodeImg from '../assets/pics/imu_analytics/02_butterworth_bode_response.png';
import filteredVsRawTimeImg from '../assets/pics/imu_analytics/04_filtered_vs_raw_time_domain.png';
import filteredVsRawPsdImg from '../assets/pics/imu_analytics/05_filtered_vs_raw_psd_comparison.png';
import fullSessionImg from '../assets/pics/imu_analytics/01_full_session_detections.png';

const ImuEdgeAnalyticsDetails = ({ project }) => {
    return (
        <div className="imu-edge-analytics-details">
            <section className="section" style={{ marginTop: '2em', paddingTop: '2em' }}>
                <h2 className="section-title">Overview</h2>
                <div className="project-blog" style={{ lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.2em' }}>
                        This project develops an end-to-end signal processing, frequency-domain analysis, and digital filter design pipeline for high-frequency 6-axis Inertial Measurement Unit (IMU) telemetry on two-wheeled vehicles (motocross motorcycles).
                    </p>
                    <p style={{ marginBottom: '1.2em' }}>
                        Rigidly mounting an IMU near the steering headstock exposes MEMS sensors to extreme mechanical vibration from a single-cylinder 2-stroke engine alongside harsh terrain impacts. By performing rigorous spectral characterization, 3D vibration polarization analysis, and digital filter synthesis, the pipeline isolates vehicle kinematics from powertrain noise&mdash;enabling robust downstream applications such as ballistic jump detection and landing shock analysis.
                    </p>
                </div>
            </section>

            {/* Hardware & Mechanical Instrumentation Specifications */}
            <div className="glass-panel" style={{
                padding: '1.5em 2em',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                marginTop: '3em',
                marginBottom: '2em'
            }}>
                <h3 style={{ fontSize: '1.2em', marginBottom: '1em', fontFamily: 'var(--font-heading)' }}>
                    Chassis & Instrumentation Context
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2em', fontSize: '0.92em', lineHeight: '1.6' }}>
                    <div>
                        <b style={{ color: 'var(--accent-primary)' }}>Sensor Placement:</b>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.3em 0 0 0' }}>Rigid frame mount near motocross steering headstock</p>
                    </div>
                    <div>
                        <b style={{ color: 'var(--accent-primary)' }}>Telemetry Specifications:</b>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.3em 0 0 0' }}>500.0 Hz nominal ODR &bull; 90.0s session &bull; N = 45,000 samples</p>
                    </div>
                    <div>
                        <b style={{ color: 'var(--accent-primary)' }}>Primary Excitation:</b>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.3em 0 0 0' }}>Single-cylinder 2-stroke engine (reciprocating inertial unbalance)</p>
                    </div>
                    <div>
                        <b style={{ color: 'var(--accent-primary)' }}>Cylinder Stroke Tilt:</b>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.3em 0 0 0' }}>56.7&deg; forward lean in the sagittal (x&ndash;z) plane</p>
                    </div>
                </div>
            </div>

            {/* Section 1: IMU Signal Breakdown & 3D Kinematics Polarization */}
            <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5em', marginTop: '4.5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>1. Multi-Axis IMU Signal Breakdown</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>
                    Physical Signal Regimes &amp; 3D Vibration Polarization
                </p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    Rigidly coupling a 6-axis MEMS IMU to the steering headstock of a high-performance motocross motorcycle produces a composite signal composed of four distinct, overlapping physical phenomena operating in different dynamic bands:
                </p>

                <ul className="bullet-points" style={{ marginTop: '1.2em', lineHeight: '1.8' }}>
                    <li>
                        <b>DC Gravitational Vector Baseline (1.0g &approx; 9.81 m/s&sup2;):</b>
                        Projected along the sensor reference frame as the chassis rolls and pitches during dynamic vehicle maneuvers.
                    </li>
                    <li>
                        <b>Vehicle &amp; Rider Motion Dynamics (0&ndash;20 Hz):</b>
                        Low-frequency body translation, braking fork compression dive, acceleration squat, cornering camber lean, and terrain contour following.
                    </li>
                    <li>
                        <b>Reciprocating Powertrain Unbalance (50&ndash;130 Hz):</b>
                        Harmonic excitation forces generated by the single-cylinder reciprocating piston mass. As rider throttle input modulates crankshaft speed across dynamic RPM sweeps (e.g., 3,000&ndash;8,000+ RPM), primary and secondary unbalance harmonics sweep continuously across the 50&ndash;130 Hz band.
                    </li>
                    <li>
                        <b>Transient Terrestrial Shock Impulses (&gt;18 m/s&sup2;):</b>
                        High-amplitude half-sine compression shocks (&tau; &approx; 16 ms) during obstacle landings, followed by exponential suspension damping.
                    </li>
                </ul>

                <h3 style={{ fontSize: '1.3em', marginTop: '2.5em', marginBottom: '0.8em' }}>
                    3D Polarization &amp; Cylinder Stroke Inclination
                </h3>
                <p style={{ lineHeight: '1.8' }}>
                    By resolving the triaxial acceleration covariance matrix in the sagittal (x&ndash;z) plane during steady-state riding segments, the linear vibration was proven to be strongly directional rather than isotropic. The principal acceleration eigenvector aligns with the cylinder stroke tilted at <b>56.7&deg; forward lean</b> (r &approx; 0.985), while lateral (y-axis) vibration is attenuated by &gt;28 dB (&approx; 700&times; lower energy):
                </p>

                <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '3em', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>θ<sub>tilt</sub> = arctan(⟨a<sub>z</sub>⟩ / ⟨a<sub>x</sub>⟩) ≈ 56.7°</div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>a<sub>z</sub>(t) ≈ a<sub>x</sub>(t) · tan(56.7°)</div>
                </div>

                {/* Figure 1: 3D Vibration Polarization */}
                <div className="glass-panel" style={{
                    padding: '1.2em',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    margin: '2em 0 3em 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={polarKinematicsImg}
                        alt="3D Vibration Polarization and Cylinder Inclination Analysis"
                        style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                    />
                    <p style={{ fontSize: '0.88em', color: 'var(--text-secondary)', marginTop: '0.8em', textAlign: 'center', fontStyle: 'italic' }}>
                        Figure 1: 3D spatial polarization across sagittal (X&ndash;Z) and frontal (Y&ndash;Z) planes, confirming cylinder stroke inclination and directional vibration energy confinement.
                    </p>
                </div>
            </section>

            {/* Section 2: Frequency Domain Analysis */}
            <div style={{ borderLeft: '4px solid var(--accent-secondary, #ff4d4d)', paddingLeft: '1.5em', marginTop: '5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>2. Frequency Domain Spectral Analysis</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>
                    Welch Power Spectral Density &amp; Gyroscopic Coriolis Isolation (CMRR)
                </p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    To isolate engine dynamics from terrain chatter, Welch Power Spectral Density (PSD) estimation was evaluated over ground telemetry segments (Hanning windowing, 50% overlap). The resulting spectrum clearly isolates dynamic accelerometer ingress from gyroscopic Coriolis immunity:
                </p>

                <ul className="bullet-points" style={{ marginTop: '1.2em', lineHeight: '1.8' }}>
                    <li>
                        <b>Dynamic Ground Vibration Peak Detection:</b>
                        Accelerometers detect dominant unbalance peaks on the sagittal axes (vertical a<sub>z</sub> and longitudinal a<sub>x</sub>) that sweep dynamically with rider throttle input across 50&ndash;130 Hz. During steady ground cruise, prominent harmonic peaks appear at <b>~60.1 Hz</b> (nominal ~3,604 RPM) and second harmonics (~124.5 Hz).
                    </li>
                    <li>
                        <b>Sagittal Ingress vs. Lateral Attenuation:</b>
                        Vertical acceleration (a<sub>z</sub>) exhibits the highest vibration energy (&minus;40.5 dB/Hz cruise peak), followed by longitudinal coupling (a<sub>x</sub>), while lateral vibration (a<sub>y</sub>) is suppressed by &gt;10.7 dB due to 3D cylinder stroke alignment.
                    </li>
                    <li>
                        <b>Gyroscopic Immunity (Common-Mode Rejection):</b>
                        Angular velocity channels (&omega;<sub>x</sub>, &omega;<sub>y</sub>, &omega;<sub>z</sub>) exhibit a flat Gaussian white noise floor with <i>zero discrete engine harmonic peaks</i> across the entire spectrum. This empirically verifies that differential MEMS Coriolis tuning-fork architectures reject common-mode linear translational vibration, leaving rotational rate telemetry pristine.
                    </li>
                </ul>

                {/* Figure 2: Welch PSD Plot */}
                <div className="glass-panel" style={{
                    padding: '1.2em',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    margin: '2em 0 3em 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={psdGroundImg}
                        alt="Welch Power Spectral Density Analysis across 6 IMU Channels"
                        style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                    />
                    <p style={{ fontSize: '0.88em', color: 'var(--text-secondary)', marginTop: '0.8em', textAlign: 'center', fontStyle: 'italic' }}>
                        Figure 2: Welch PSD analysis comparing accelerometer ingress on sagittal axes (a<sub>x</sub>, a<sub>z</sub>) against gyroscopes exhibiting a flat noise floor and total immunity to linear engine vibration.
                    </p>
                </div>
            </section>

            {/* Section 3: Digital Filter Design & Synthesis */}
            <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1.5em', marginTop: '5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>3. Digital Filter Synthesis &amp; Validation</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>
                    Butterworth SOS Synthesis, Zero-Phase Filtering, and Kinematics Preservation
                </p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    The filter specifications were formulated directly from the frequency separation between vehicle motion and powertrain unbalance:
                </p>

                <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '3em', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>Passband: f<sub>p</sub> = 20.0 Hz (A<sub>p</sub> ≤ 1.0 dB)</div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>Stopband: f<sub>s</sub> = 58.0 Hz (A<sub>s</sub> ≥ 30.0 dB)</div>
                </div>

                <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '2.5em', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>N ≥ log<sub>10</sub>[(10<sup>A<sub>s</sub>/10</sup> - 1) / (10<sup>A<sub>p</sub>/10</sup> - 1)] / [2 log<sub>10</sub>(f<sub>s</sub> / f<sub>p</sub>)]</div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>N ≥ 3.88 → <strong>N = 4</strong></div>
                </div>

                <p style={{ lineHeight: '1.8', marginTop: '1.5em' }}>
                    A 4th-order low-pass Butterworth filter was synthesized with cutoff <b>f<sub>c</sub> = 25.0 Hz</b>, implemented in cascaded Second-Order Sections (SOS) to guarantee numerical stability and immunity to coefficient quantization error:
                </p>

                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><b>Passband Fidelity:</b> Only &minus;0.73 dB insertion loss at 20.0 Hz, preserving 100% of authentic rider and vehicle maneuver kinematics.</li>
                    <li><b>Broadband Dynamic Rejection:</b> Continuous &minus;80 dB/decade roll-off providing &gt;30 dB attenuation across the entire engine operating envelope and non-stationary RPM sweeps.</li>
                    <li><b>Causal Real-Time Realization:</b> Implemented in Direct Form II Transposed (DF2T) Second-Order Sections (SOS) for embedded deployment with minimal real-time phase lag.</li>
                </ul>

                {/* Figure 3: Bode Response */}
                <div className="glass-panel" style={{
                    padding: '1.2em',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    margin: '2em 0 2.5em 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={butterworthBodeImg}
                        alt="Butterworth Low-Pass Filter Bode Plot"
                        style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                    />
                    <p style={{ fontSize: '0.88em', color: 'var(--text-secondary)', marginTop: '0.8em', textAlign: 'center', fontStyle: 'italic' }}>
                        Figure 3: Frequency response (magnitude &amp; phase) for the synthesized 4th-order Butterworth low-pass filter (f<sub>c</sub> = 25.0 Hz).
                    </p>
                </div>

                {/* Figure 4: Filtered vs Raw Time Domain */}
                <div className="glass-panel" style={{
                    padding: '1.2em',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    margin: '2em 0 2.5em 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={filteredVsRawTimeImg}
                        alt="Filtered vs Raw Telemetry Time-Domain Waveforms"
                        style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                    />
                    <p style={{ fontSize: '0.88em', color: 'var(--text-secondary)', marginTop: '0.8em', textAlign: 'center', fontStyle: 'italic' }}>
                        Figure 4: Time-domain comparison showing raw acceleration containing heavy 58 Hz hash versus the smooth Butterworth-filtered trajectory preserving true motion dynamics.
                    </p>
                </div>

                {/* Figure 5: Filtered vs Raw PSD Comparison */}
                <div className="glass-panel" style={{
                    padding: '1.2em',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    margin: '2em 0 2em 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={filteredVsRawPsdImg}
                        alt="Filtered vs Raw PSD Spectral Rejection"
                        style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                    />
                    <p style={{ fontSize: '0.88em', color: 'var(--text-secondary)', marginTop: '0.8em', textAlign: 'center', fontStyle: 'italic' }}>
                        Figure 5: Power spectral density comparison showing broadband stopband suppression of dynamic engine vibration sweeps (&gt;30 dB) while preserving authentic vehicle motion dynamics within the 0&ndash;20 Hz band.
                    </p>
                </div>
            </section>

            {/* Section 4: Sample Application - Kinematic Event Extraction */}
            <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1.5em', marginTop: '5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>4. Sample Application: Kinematic Event Extraction</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>
                    Validating the DSP Pipeline through Zero-g Ballistic Jump &amp; Impact Analysis
                </p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    To validate the practical utility of the signal breakdown and filtering framework, an end-to-end <b>kinematic event extraction engine</b> was deployed downstream of the filter stack. In motocross telemetry, identifying ballistic airborne flight intervals and impact shocks represents a rigorous test of edge kinematics estimation:
                </p>

                <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '3em', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>|| <strong>a</strong>(t) || = √(a<sub>x</sub>(t)² + a<sub>y</sub>(t)² + a<sub>z</sub>(t)²) ≤ 3.50 m/s²</div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>Δt ≥ 0.50 s (K ≥ 250 samples)</div>
                </div>

                <p style={{ lineHeight: '1.8', marginTop: '1.5em' }}>
                    When external ground reaction forces vanish during takeoff, the net specific force vector collapses from the 9.81 m/s&sup2; baseline toward zero. By operating on the filtered kinematics, engine vibration zero-crossings are completely eliminated, enabling <b>100% precision and recall</b> across all 5 flight intervals (18.34s cumulative air time) with zero false triggers.
                </p>

                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><b>Asymmetric Impact Shock Resolution:</b> Resolves landing impact spikes reaching <b>18.24 m/s&sup2;</b> (1.86g) occurring 16 ms post-touchdown, followed by exponential suspension damping (&tau; &approx; 18 ms).</li>
                    <li><b>Attitude Kinematics Tracking:</b> Fuses gyroscope angular rates with normalized gravity vectors via a complementary filter to reconstruct sagittal pitch attitudes during takeoff, free-fall rotation, and touchdown.</li>
                </ul>

                {/* Figure 6: Full Session Event Extraction */}
                <div className="glass-panel" style={{
                    padding: '1.2em',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    margin: '2em 0 2em 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={fullSessionImg}
                        alt="Full Session Telemetry and Jump Kinematic Event Extraction"
                        style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                    />
                    <p style={{ fontSize: '0.88em', color: 'var(--text-secondary)', marginTop: '0.8em', textAlign: 'center', fontStyle: 'italic' }}>
                        Figure 6: Full-session event extraction resolving all 5 ballistic flight intervals and subsequent landing shock impulses using the conditioned IMU kinematics.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ImuEdgeAnalyticsDetails;
