import React from 'react';
import './shared.css';

const FFTDetails = ({ project }) => {
    return (
        <div className="fft-details">
            {project && project.blog && (
                <section className="section" style={{ marginTop: '2em', paddingTop: '2em' }}>
                    <h2 className="section-title">Overview</h2>
                    <div className="project-blog" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                        {project.blog}
                    </div>
                </section>
            )}

            <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                <h2 className="section-title">Importance in Embedded Systems</h2>
                <p style={{ lineHeight: '1.8' }}>
                    The Fast Fourier Transform (FFT) is foundational for analyzing signals in the frequency domain. In embedded applications, real-time frequency analysis is critical for several use cases:
                </p>
                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><strong>Audio Processing:</strong> Equalization, noise cancellation, and pitch detection require immediate frequency breakdown of audio signals.</li>
                    <li><strong>Telecommunications:</strong> Core to Orthogonal Frequency-Division Multiplexing (OFDM) used in modern wireless communications.</li>
                </ul>
            </section>

            <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                <h2 className="section-title">Challenges</h2>
                <p style={{ lineHeight: '1.8' }}>
                    Implementing a highly optimized FFT on a microcontroller involves overcoming several technical constraints:
                </p>
                <ul className="bullet-points" style={{ marginTop: '1em', lineHeight: '1.8' }}>
                    <li><strong>Complex Number Operations:</strong> Building a custom, high-efficiency complex number library from scratch as bare-metal C lacks optimized native support.</li>
                    <li><strong>Custom Math Functions:</strong> Manually implementing and optimizing every complex arithmetic operation to eliminate function call overhead in the recursive stages.</li>
                    <li><strong>Compute Time Limitations:</strong> Achieving sub-millisecond execution times for 1024-point FFTs by optimizing memory access and cycle-count.</li>
                </ul>
            </section>

            <section className="section" style={{ marginTop: '3em', paddingTop: '2em' }}>
                <h2 className="section-title">DFT Matrix & The Cooley-Tukey Method</h2>
                
                <div style={{ lineHeight: '1.8', marginBottom: '2em' }}>
                    <p>The standard Discrete Fourier Transform (DFT) is given by the equation:</p>
                    <div className="math-equation">
                        <span className="equation-part">X<sub>k</sub> = ∑<sub>n=0</sub><sup>N-1</sup> x<sub>n</sub> · W<sub>N</sub><sup>kn</sup></span>
                        <span className="equation-separator">, &nbsp;</span>
                        <span className="equation-part">W<sub>N</sub> = e<sup>-j(2π/N)</sup></span>
                    </div>
                    <p>Where W<sub>N</sub> is known as the Twiddle Factor. In matrix form, this requires O(N<sup>2</sup>) complex multiplications.</p>
                </div>

                <div style={{ lineHeight: '1.8' }}>
                    <h3>Recursive Cooley-Tukey (Radix-2)</h3>
                    <p>
                        The Cooley-Tukey algorithm dramatically reduces complexity to O(N log N) by recursively breaking down the N-point DFT into two smaller (N/2)-point DFTs—one for the even-indexed inputs and one for the odd-indexed inputs:
                    </p>
                    <div className="math-equation">
                        <span className="equation-part">X<sub>k</sub> = E<sub>k</sub> + W<sub>N</sub><sup>k</sup> · O<sub>k</sub></span>
                        <span className="equation-separator">, &nbsp;&nbsp;&nbsp;</span>
                        <span className="equation-part">X<sub>k + N/2</sub> = E<sub>k</sub> - W<sub>N</sub><sup>k</sup> · O<sub>k</sub></span>
                    </div>
                    <p>
                        This "divide and conquer" approach forms the basic computational unit of the FFT, known as the <strong>Butterfly Operation</strong>.
                    </p>
                </div>


            </section>
        </div>
    );
};

export default FFTDetails;
