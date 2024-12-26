import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Adjust sizes based on screen width
            const sizeType = Math.random();
            let size;
            if (windowWidth <= 480) {
                // Mobile sizes
                if (sizeType < 0.6) { // 60% tiny bubbles
                    size = Math.random() * 15 + 5; // 5-20px
                } else if (sizeType < 0.9) { // 30% small bubbles
                    size = Math.random() * 20 + 20; // 20-40px
                } else { // 10% medium bubbles
                    size = Math.random() * 30 + 40; // 40-70px
                }
            } else if (windowWidth <= 768) {
                // Tablet sizes
                if (sizeType < 0.5) {
                    size = Math.random() * 20 + 10; // 10-30px
                } else if (sizeType < 0.8) {
                    size = Math.random() * 25 + 30; // 30-55px
                } else {
                    size = Math.random() * 35 + 55; // 55-90px
                }
            } else {
                // Desktop sizes (original)
                if (sizeType < 0.5) {
                    size = Math.random() * 20 + 10; // 10-30px
                } else if (sizeType < 0.8) {
                    size = Math.random() * 30 + 30; // 30-60px
                } else if (sizeType < 0.95) {
                    size = Math.random() * 40 + 60; // 60-100px
                } else {
                    size = Math.random() * 60 + 100; // 100-160px
                }
            }
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Adjust positioning based on screen size
            const section = Math.floor(Math.random() * 4);
            let posX, posY;
            
            // Center-weighted positioning for mobile
            if (windowWidth <= 480) {
                // More bubbles in the center area for mobile
                posX = Math.random() * 60 + 20; // 20% to 80% of width
                posY = Math.random() * 60 + 20; // 20% to 80% of height
            } else {
                const margin = windowWidth <= 768 ? 20 : 40;
                switch(section) {
                    case 0:
                        posX = Math.random() * margin;
                        posY = Math.random() * margin;
                        break;
                    case 1:
                        posX = Math.random() * margin + (100 - margin);
                        posY = Math.random() * margin;
                        break;
                    case 2:
                        posX = Math.random() * margin;
                        posY = Math.random() * margin + (100 - margin);
                        break;
                    case 3:
                        posX = Math.random() * margin + (100 - margin);
                        posY = Math.random() * margin + (100 - margin);
                        break;
                }
            }
            
            bubble.style.left = `${posX}%`;
            bubble.style.top = `${posY}%`;
            
            // Adjust opacity and animation timing for mobile
            const baseOpacity = windowWidth <= 480 ? 
                (size < 20 ? 0.5 : size < 40 ? 0.4 : 0.2) :  // Lower opacity on mobile
                (size < 30 ? 0.9 : size < 60 ? 0.7 : size < 100 ? 0.5 : 0.3);
            bubble.style.opacity = baseOpacity;
            
            // Slower animations for mobile
            const animationType = Math.random();
            let floatClass = 'bubble-float-1';
            if (windowWidth <= 480) {
                if (animationType > 0.6) floatClass = 'bubble-float-2';
                if (animationType > 0.85) floatClass = 'bubble-float-3';
            } else {
                if (animationType > 0.4) floatClass = 'bubble-float-2';
                if (animationType > 0.7) floatClass = 'bubble-float-3';
            }
            bubble.classList.add(floatClass);
            
            // Longer animation delay for mobile
            const maxDelay = windowWidth <= 480 ? -40 : -20;
            bubble.style.animationDelay = `${Math.random() * maxDelay}s`;
            
            document.querySelector('.hero').appendChild(bubble);
            
            // Longer lifetime for bubbles on mobile
            const lifetime = windowWidth <= 480 ? 30000 : 20000;
            setTimeout(() => {
                if (bubble && bubble.parentElement) {
                    bubble.remove();
                }
            }, lifetime);
        };

        // Adjust number of bubbles and timing for mobile
        const numInitialBubbles = windowWidth <= 480 ? 15 : 
                                windowWidth <= 768 ? 25 : 40;
        
        const spawnDelay = windowWidth <= 480 ? 200 :
                          windowWidth <= 768 ? 150 : 100;
        
        for (let i = 0; i < numInitialBubbles; i++) {
            setTimeout(() => createBubble(), i * spawnDelay);
        }

        const intervalId = setInterval(() => {
            const maxBubbles = windowWidth <= 480 ? 20 : 
                             windowWidth <= 768 ? 30 : 45;
            
            const currentBubbles = document.querySelectorAll('.bubble').length;
            if (currentBubbles < maxBubbles) {
                createBubble();
            }
        }, windowWidth <= 480 ? 2000 : 
           windowWidth <= 768 ? 1500 : 1000);

        return () => clearInterval(intervalId);
    }, [windowWidth]);

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Before the Burst</h1>
                <p>
                    An AI-powered Agent analyzing and predicting the future of startups{' '}
                    <span className="highlight">before the bubble bursts.</span>
                </p>
                <button className="cta-button">
                    Explore the Future
                </button>
            </div>
        </div>
    );
};

export default Hero;
