import React, { useState, useEffect } from 'react';
import './Thermometer.css';

const Thermometer = () => {
    const [selectedRange, setSelectedRange] = useState(null);
    const [mercuryHeight, setMercuryHeight] = useState(0);
    
    const startups = [
        { id: 1, name: "TechVision AI", riskLevel: 25, status: "Cool", funding: "2M", teamSize: 15 },
        { id: 2, name: "CloudScale", riskLevel: 55, status: "Warm", funding: "15M", teamSize: 50 },
        { id: 3, name: "DataMesh", riskLevel: 85, status: "Hot", funding: "8M", teamSize: 25 },
        { id: 4, name: "BlockFin", riskLevel: 45, status: "Moderate", funding: "5M", teamSize: 20 }
    ];

    const getRiskColor = (riskLevel) => {
        if (riskLevel <= 30) return '#4DFFB4';  // Cool - Mint
        if (riskLevel <= 50) return '#FFE14D';  // Warm - Yellow
        if (riskLevel <= 70) return '#FF9D4D';  // Medium - Orange
        if (riskLevel <= 85) return '#FF6B4D';  // Hot - Coral
        return '#FF4D4D';                       // Very Hot - Red
    };

    const getRiskStatus = (riskLevel) => {
        if (riskLevel <= 30) return 'Cool';
        if (riskLevel <= 50) return 'Moderate';
        if (riskLevel <= 70) return 'Warm';
        if (riskLevel <= 85) return 'Hot';
        return 'Very Hot';
    };

    useEffect(() => {
        // Update mercury height based on selected startup
        if (selectedRange) {
            const startup = startups.find(s => s.id === selectedRange);
            if (startup) {
                const mercuryElement = document.querySelector('.mercury-fill');
                if (window.innerWidth <= 768) {
                    mercuryElement.style.setProperty('--mercury-height', `${startup.riskLevel}%`);
                    mercuryElement.style.height = '100%';
                    mercuryElement.style.width = `${startup.riskLevel}%`;
                } else {
                    mercuryElement.style.width = '100%';
                    mercuryElement.style.height = `${startup.riskLevel}%`;
                }
            }
        } else {
            const mercuryElement = document.querySelector('.mercury-fill');
            if (window.innerWidth <= 768) {
                mercuryElement.style.setProperty('--mercury-height', '70%');
                mercuryElement.style.height = '100%';
                mercuryElement.style.width = '70%';
            } else {
                mercuryElement.style.width = '100%';
                mercuryElement.style.height = '70%';
            }
        }
    }, [selectedRange, window.innerWidth]);

    return (
        <section className="thermometer-section">
            <div className="section-content">
                <h2>Startup Thermometer</h2>
                <p className="section-description">
                    Our AI-powered risk assessment tool measures startup volatility in real-time.
                </p>
                
                <div className="thermometer-container">
                    <div className="thermometer">
                        <div className="temperature-scale">
                            {[90, 70, 50, 30, 10].map((temp) => (
                                <div key={temp} className="scale-mark">
                                    <span className="temp-label">{temp}%</span>
                                </div>
                            ))}
                        </div>
                        <div className="mercury-tube">
                            <div 
                                className="mercury-fill"
                                style={{ height: `${mercuryHeight}%` }}
                            ></div>
                            {startups.map((startup) => (
                                <div
                                    key={startup.id}
                                    className="risk-indicator"
                                    style={{
                                        bottom: `${startup.riskLevel}%`,
                                        backgroundColor: getRiskColor(startup.riskLevel)
                                    }}
                                    onMouseEnter={() => setSelectedRange(startup.id)}
                                    onMouseLeave={() => setSelectedRange(null)}
                                >
                                    <span className="indicator-label">{startup.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="startups-list">
                        {startups.map((startup) => (
                            <div 
                                key={startup.id}
                                className={`startup-card ${selectedRange === startup.id ? 'active' : ''}`}
                                onMouseEnter={() => setSelectedRange(startup.id)}
                                onMouseLeave={() => setSelectedRange(null)}
                            >
                                <h3>{startup.name}</h3>
                                <div className="risk-meter">
                                    <div 
                                        className="risk-fill"
                                        style={{
                                            width: `${startup.riskLevel}%`,
                                            backgroundColor: getRiskColor(startup.riskLevel)
                                        }}
                                    ></div>
                                </div>
                                <div className="startup-details">
                                    <span>Risk Level: {startup.riskLevel}%</span>
                                    <span>Status: {getRiskStatus(startup.riskLevel)}</span>
                                    <span>Funding: ${startup.funding}</span>
                                    <span>Team Size: {startup.teamSize}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Thermometer; 