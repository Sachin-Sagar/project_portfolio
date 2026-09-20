import React, { useEffect, useRef, useState } from 'react';

const FadeInSection = ({ children, delay = 0 }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        const currentElement = domRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }
        
        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, []);

    const style = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        willChange: 'opacity, transform'
    };

    return (
        <div ref={domRef} style={style}>
            {children}
        </div>
    );
};

export default FadeInSection;
