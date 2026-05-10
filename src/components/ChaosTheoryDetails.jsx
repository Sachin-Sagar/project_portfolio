import React from 'react';
import './shared.css';

const ChaosTheoryDetails = ({ project }) => {
    return (
        <div className="chaos-theory-details">
            {project && project.blog && (
                <section className="section" style={{ marginTop: '2em', paddingTop: '2em' }}>
                    <h2 className="section-title">Overview</h2>
                    <div className="project-blog" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                        {project.blog}
                    </div>
                </section>
            )}

            {/* Mandelbrot Set Section */}
            <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5em', marginTop: '4em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>1. The Mandelbrot Set</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Escape-Time Fractals & SIMD Rendering</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    The Mandelbrot set is the set of complex numbers <i>c</i> for which the function $f_c(z) = z^2 + c$ does not diverge when iterated from $z = 0$. This simulation serves as the primary benchmark for the project's SIMD (AVX2) optimization layer.
                </p>
                <div className="math-equation">
                    z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c
                </div>
                <p style={{ lineHeight: '1.8' }}>
                    By leveraging <b>AVX2 intrinsics</b>, the compute engine processes 4 double-precision pixels simultaneously. This parallelized approach reduces frame calculation time from 124ms to <b>36ms</b>, enabling fluid interactive zooming. The visualization uses a smooth polynomial coloring algorithm to map escape times to vibrant RGB gradients.
                </p>
            </section>

            {/* Logistic Map Section */}
            <div style={{ borderLeft: '4px solid var(--accent-secondary, #ff4d4d)', paddingLeft: '1.5em', marginTop: '5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>2. The Logistic Map</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Bifurcation & Discrete Chaos</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    The Logistic Map is a polynomial mapping of degree 2, often cited as an archetypal example of how complex, chaotic behavior can arise from very simple non-linear dynamical equations. The population growth model is defined by:
                </p>
                <div className="math-equation">
                    x<sub>n+1</sub> = r x<sub>n</sub> (1 - x<sub>n</sub>)
                </div>
                <p style={{ lineHeight: '1.8' }}>
                    As the parameter <i>r</i> increases, the system undergoes period-doubling bifurcations, eventually leading to deterministic chaos. My implementation uses a custom 2D plotting engine to render millions of iterations in real-time, allowing for infinite zooming into the fractal structure of the bifurcation diagram.
                </p>
            </section>

            {/* Lorenz System Section */}
            <div style={{ borderLeft: '4px solid #3BFF00', paddingLeft: '1.5em', marginTop: '5em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>3. The Lorenz Attractor</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Continuous Dynamical Systems</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    The Lorenz system is a set of three ordinary differential equations that describe the simplified atmospheric convection. It is famous for having chaotic solutions for certain parameter values and initial conditions:
                </p>
                <div className="math-equation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em', padding: '2em' }}>
                    <div>dx/dt = &sigma;(y - x)</div>
                    <div>dy/dt = x(&rho; - z) - y</div>
                    <div>dz/dt = xy - &beta;z</div>
                </div>
                <p style={{ lineHeight: '1.8' }}>
                    To solve these equations with high physical fidelity, I implemented a <b>4th-Order Runge-Kutta (RK4)</b> numerical integrator. The challenge lies in the high sensitivity to initial conditions (the "Butterfly Effect"), requiring both high precision and high throughput for smooth visualization.
                </p>
            </section>

            {/* SIMD Optimization Section */}
            <div style={{ borderLeft: '4px solid #00D1FF', paddingLeft: '1.5em', marginTop: '5em' }}>
                <h2 style={{ fontSize: '1.8em', margin: 0 }}>4. Hardware Optimization (AVX2)</h2>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Scaling Mathematical Throughput</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    The project pushes mathematical throughput by utilizing manual <b>AVX2 Intrinsics</b> and specialized memory layouts:
                </p>
                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><b>Parallel Pixel Streams:</b> Using <code>__m256d</code> registers, the compute engine processes 4 complex numbers in parallel, resulting in a <b>3.44x speedup</b> for the Mandelbrot simulation.</li>
                    <li><b>SoA Refactor:</b> Transitioned from AoS to <b>Structure-of-Arrays</b> to leverage 32-byte aligned memory loads directly into YMM registers, eliminating gather/scatter overhead.</li>
                    <li><b>Vectorized RK4:</b> Manual vectorization of the RK4 intermediate steps ($k_1$ through $k_4$) ensures that numerical integration remains fluid even with thousands of particles.</li>
                </ul>
            </section>
        </div>
    );
};

export default ChaosTheoryDetails;
