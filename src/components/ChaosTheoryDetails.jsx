import React from 'react';
import './shared.css';

const ChaosTheoryDetails = ({ project }) => {
    return (
        <div className="chaos-theory-details">
            <section className="section" style={{ marginTop: '2em', paddingTop: '2em' }}>
                <h2 className="section-title">Overview</h2>
                <div className="project-blog" style={{ lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.2em' }}>
                        An exploration into the limits of mathematical throughput in C++. This project evolves a standard dynamical systems simulator into a high-performance SIMD laboratory. Inspired by James Gleick's <i>Chaos</i>, the suite features an interactive, object-oriented visualization tool for exploring non-linear dynamics, utilizing hardware-accelerated rendering and manual AVX2 vectorization to push the boundaries of real-time simulation.
                    </p>
                </div>
            </section>

            {/* Mandelbrot Set Section */}
            <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5em', marginTop: '4em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                    <h2 style={{ fontSize: '1.8em', margin: 0 }}>1. The Mandelbrot Set</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5em' }}>Escape-Time Fractals & SIMD Rendering</p>
            </div>

            <section className="section" style={{ marginTop: '2em' }}>
                <p style={{ lineHeight: '1.8' }}>
                    The Mandelbrot set is the set of complex numbers <i>c</i> for which the function <i>f<sub>c</sub>(z) = z<sup>2</sup> + c</i> does not diverge when iterated from <i>z = 0</i>. This simulation serves as the primary benchmark for the project's SIMD (AVX2) optimization layer.
                </p>
                <div className="math-equation">
                    <i>z</i><sub>n+1</sub> = <i>z</i><sub>n</sub><sup>2</sup> + <i>c</i>
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
                    <i>x</i><sub>n+1</sub> = <i>r</i> · <i>x</i><sub>n</sub> (1 &minus; <i>x</i><sub>n</sub>)
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
                <div className="math-equation" style={{ display: 'flex', justifyContent: 'center', gap: '3em', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>d<i>x</i>/d<i>t</i> = &sigma;(<i>y</i> &minus; <i>x</i>)</div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>d<i>y</i>/d<i>t</i> = <i>x</i>(&rho; &minus; <i>z</i>) &minus; <i>y</i></div>
                    <div style={{ fontSize: '1.5em', fontStyle: 'normal', opacity: '0.2' }}>|</div>
                    <div>d<i>z</i>/d<i>t</i> = <i>x</i><i>y</i> &minus; &beta;<i>z</i></div>
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
                    <li><b>Vectorized RK4:</b> Manual vectorization of the RK4 intermediate steps (<i>k</i><sub>1</sub> through <i>k</i><sub>4</sub>) ensures that numerical integration remains fluid even with thousands of particles.</li>
                </ul>
            </section>
        </div>
    );
};

export default ChaosTheoryDetails;
