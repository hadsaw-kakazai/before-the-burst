import React, { useState } from 'react';
import './StartupAnalyzer.css';

const StartupAnalyzer = () => {
    const [startupName, setStartupName] = useState('');
    const [email, setEmail] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [aiMessages, setAiMessages] = useState([]);

    const steps = [
        { label: 'Initializing AI Systems', duration: 1500 },
        { label: 'Scanning Web Data', duration: 2000 },
        { label: 'Analyzing Market Trends', duration: 2000 },
        { label: 'Evaluating Competition', duration: 1500 },
        { label: 'Generating Insights', duration: 2000 }
    ];

    const addAiMessage = (message) => {
        setAiMessages(prev => [...prev, { text: message, timestamp: new Date() }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startupName.trim()) return;

        // Prevent default scroll behavior
        e.target.closest('.analyzer-section').style.scrollBehavior = 'auto';

        setIsAnalyzing(true);
        setCurrentStep(0);
        setAiMessages([]);
        addAiMessage(`Initializing analysis for ${startupName}...`);

        // Simulate the analysis steps
        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, steps[i].duration));
            setCurrentStep(i + 1);
            addAiMessage(steps[i].label);
        }

        // Simulate completion without causing scroll
        setTimeout(() => {
            setIsAnalyzing(false);
            addAiMessage("Analysis complete! Would you like the detailed report sent to your email?");
            // Delay showing email input to prevent scroll jump
            setTimeout(() => {
                setShowEmailInput(true);
            }, 100);
        }, 1000);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        // Prevent default scroll behavior
        e.target.closest('.analyzer-section').style.scrollBehavior = 'auto';

        addAiMessage("Perfect! I'll send the detailed analysis to your inbox shortly.");
        setShowEmailInput(false);
        setEmail('');
    };

    return (
        <section className="analyzer-section">
            <div className="terminal-background">
                <div className="grid-overlay"></div>
                <div className="data-streams"></div>
                <div className="glow-effect"></div>
            </div>
            
            <div className="terminal-container">
                <div className="terminal-header">
                    <div className="status-indicators">
                        <span className="status-dot"></span>
                        <span className="status-text">AI AGENT ONLINE</span>
                    </div>
                    <h2>Startup Evaluation Terminal</h2>
                    <p className="terminal-subheading">
                        Enter your startup's name and let our AI analyze its potential
                    </p>
                </div>

                <div className="terminal-window">
                    <div className="terminal-messages">
                        {!isAnalyzing && aiMessages.length === 0 && (
                            <div className="ai-welcome">
                                <p>Hello! I'm your AI evaluation expert. Ready to analyze your startup?</p>
                            </div>
                        )}
                        
                        {aiMessages.map((msg, index) => (
                            <div key={index} className="terminal-message">
                                <span className="message-timestamp">
                                    {msg.timestamp.toLocaleTimeString()}
                                </span>
                                <span className="message-text">{msg.text}</span>
                            </div>
                        ))}
                    </div>

                    {isAnalyzing && (
                        <div className="analysis-progress">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill"
                                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                                ></div>
                            </div>
                            <div className="step-indicator">
                                Step {currentStep} of {steps.length}
                            </div>
                        </div>
                    )}

                    {!isAnalyzing && !showEmailInput && (
                        <form onSubmit={handleSubmit} className="terminal-input-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={startupName}
                                    onChange={(e) => setStartupName(e.target.value)}
                                    placeholder="Enter startup name (e.g., QuickBite)"
                                    className="terminal-input"
                                    disabled={isAnalyzing}
                                />
                                <button 
                                    type="submit" 
                                    className="analyze-button"
                                    disabled={isAnalyzing || !startupName.trim()}
                                >
                                    <span className="button-glow"></span>
                                    Analyze Now
                                </button>
                            </div>
                        </form>
                    )}

                    {showEmailInput && (
                        <form onSubmit={handleEmailSubmit} className="terminal-input-form">
                            <div className="input-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email for the detailed report"
                                    className="terminal-input"
                                />
                                <button 
                                    type="submit" 
                                    className="analyze-button"
                                    disabled={!email.trim()}
                                >
                                    <span className="button-glow"></span>
                                    Send Report
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="terminal-footer">
                    <div className="data-indicators">
                        <span className="indicator">
                            <span className="indicator-dot"></span>
                            Web Data
                        </span>
                        <span className="indicator">
                            <span className="indicator-dot"></span>
                            Market Analysis
                        </span>
                        <span className="indicator">
                            <span className="indicator-dot"></span>
                            AI Predictions
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartupAnalyzer; 