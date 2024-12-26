import React, { useState, useEffect } from 'react';
import './BurstTimeline.css';

const BurstTimeline = () => {
    const [activeEvent, setActiveEvent] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const timelineEvents = [
        {
            year: 2021,
            quarter: 'Q4',
            title: 'Peak Investment',
            description: 'Global AI startup investments reach $50B, marking unprecedented growth',
            stats: {
                investment: '$50B',
                startups: '10,000+',
                valuation: '$2.5T'
            },
            trend: 'exponential-rise'
        },
        {
            year: 2022,
            quarter: 'Q2',
            title: 'Market Shift',
            description: 'Early signs of market saturation as competition intensifies',
            stats: {
                investment: '$45B',
                startups: '12,000+',
                profitability: '35%'
            },
            trend: 'plateau'
        },
        {
            year: 2023,
            quarter: 'Q3',
            title: 'Warning Signs',
            description: '50% of AI startups show declining revenue despite market growth',
            stats: {
                declining: '50%',
                layoffs: '25,000+',
                consolidation: '30%'
            },
            trend: 'decline-start'
        },
        {
            year: 2024,
            quarter: 'Q1',
            title: 'Market Correction',
            description: 'Major valuation adjustments and increased scrutiny of AI claims',
            stats: {
                devaluation: '-40%',
                failures: '2,000+',
                skepticism: 'High'
            },
            trend: 'sharp-decline'
        },
        {
            year: 2025,
            quarter: 'Q2',
            title: 'Predicted Burst',
            description: 'AI bubble predicted to burst, leading to market restructuring',
            stats: {
                impact: 'Severe',
                survival: '30%',
                opportunity: 'High'
            },
            trend: 'burst'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const timeline = document.querySelector('.timeline-container');
            if (timeline) {
                const scrollPosition = timeline.scrollLeft;
                const maxScroll = timeline.scrollWidth - timeline.clientWidth;
                const progress = (scrollPosition / maxScroll) * 100;
                setScrollProgress(progress);
            }
        };

        const timeline = document.querySelector('.timeline-container');
        if (timeline) {
            timeline.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (timeline) {
                timeline.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <section className="burst-timeline-section">
            <div className="timeline-header">
                <h2>Timeline to the Burst</h2>
                <p className="timeline-description">
                    Track the evolution of the AI startup bubble and explore key milestones
                </p>
            </div>

            <div className="timeline-container">
                <div className="timeline-track">
                    <div 
                        className="bubble-indicator" 
                        style={{ left: `${scrollProgress}%` }}
                    >
                        <div className="bubble"></div>
                        <div className="bubble-shadow"></div>
                    </div>

                    {timelineEvents.map((event, index) => (
                        <div 
                            key={index}
                            className={`timeline-event ${activeEvent === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveEvent(index)}
                            onMouseLeave={() => setActiveEvent(null)}
                        >
                            <div className="event-marker">
                                <div className="marker-dot"></div>
                                <div className="marker-line"></div>
                            </div>

                            <div className="event-content">
                                <div className="event-header">
                                    <span className="event-year">{event.year}</span>
                                    <span className="event-quarter">{event.quarter}</span>
                                </div>
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-description">{event.description}</p>
                                
                                <div className="event-stats">
                                    {Object.entries(event.stats).map(([key, value], i) => (
                                        <div key={i} className="stat">
                                            <span className="stat-label">{key}</span>
                                            <span className="stat-value">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={`trend-indicator ${event.trend}`}>
                                    <div className="trend-line"></div>
                                    {event.trend === 'burst' && (
                                        <div className="burst-effect">
                                            <div className="burst-particles"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="timeline-navigation">
                <div className="scroll-hint">
                    Scroll to explore timeline
                    <div className="scroll-arrow">→</div>
                </div>
            </div>
        </section>
    );
};

export default BurstTimeline; 