import React, { useState } from 'react';
import './BurstQuiz.css';

const BurstQuiz = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [userGuess, setUserGuess] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const scenarios = [
        {
            name: "TechVibe",
            funding: "$2.5M",
            teamSize: "15",
            market: "Social Media",
            growth: "+200% MoM",
            burn: "$150K/month",
            aiPrediction: 75, // Percentage chance of failure
            description: "A new social platform focusing on short-form music videos"
        },
        {
            name: "GreenCart",
            funding: "$800K",
            teamSize: "8",
            market: "E-commerce",
            growth: "+50% MoM",
            burn: "$80K/month",
            aiPrediction: 45,
            description: "Sustainable grocery delivery service"
        },
        {
            name: "DataMind",
            funding: "$5M",
            teamSize: "25",
            market: "AI/ML",
            growth: "+100% MoM",
            burn: "$300K/month",
            aiPrediction: 60,
            description: "AI-powered business analytics platform"
        }
    ];

    const handleGuess = (guess) => {
        setUserGuess(guess);
        setShowResult(true);
        
        // Calculate score based on how close the guess was to AI's prediction
        const accuracy = 100 - Math.abs(guess - scenarios[currentScenario].aiPrediction);
        setScore(prevScore => prevScore + accuracy);
    };

    const nextScenario = () => {
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(prev => prev + 1);
            setUserGuess(null);
            setShowResult(false);
        }
    };

    const resetQuiz = () => {
        setCurrentScenario(0);
        setUserGuess(null);
        setShowResult(false);
        setScore(0);
    };

    const scenario = scenarios[currentScenario];

    return (
        <section className="burst-quiz-section">
            <div className="quiz-container">
                <div className="quiz-header">
                    <h2>Guess the Burst</h2>
                    <p className="quiz-description">
                        Can you predict startup failures as well as our AI? Make your prediction!
                    </p>
                </div>

                <div className="scenario-card">
                    <div className="scenario-header">
                        <h3>{scenario.name}</h3>
                        <p>{scenario.description}</p>
                    </div>

                    <div className="metrics-grid">
                        <div className="metric">
                            <span className="metric-label">Funding</span>
                            <span className="metric-value">{scenario.funding}</span>
                        </div>
                        <div className="metric">
                            <span className="metric-label">Team Size</span>
                            <span className="metric-value">{scenario.teamSize}</span>
                        </div>
                        <div className="metric">
                            <span className="metric-label">Market</span>
                            <span className="metric-value">{scenario.market}</span>
                        </div>
                        <div className="metric">
                            <span className="metric-label">Growth</span>
                            <span className="metric-value">{scenario.growth}</span>
                        </div>
                        <div className="metric">
                            <span className="metric-label">Burn Rate</span>
                            <span className="metric-value">{scenario.burn}</span>
                        </div>
                    </div>

                    {!showResult ? (
                        <div className="prediction-slider">
                            <label>What's the chance this startup will fail?</label>
                            <div className="slider-container">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={userGuess || 50} 
                                    onChange={(e) => setUserGuess(Number(e.target.value))}
                                    className="slider"
                                />
                                <div className="slider-value">{userGuess || 50}%</div>
                            </div>
                            <button 
                                className="predict-button"
                                onClick={() => handleGuess(userGuess || 50)}
                            >
                                Lock In Prediction
                            </button>
                        </div>
                    ) : (
                        <div className="result-container">
                            <div className="predictions">
                                <div className="prediction user">
                                    <span>Your Prediction</span>
                                    <div className="prediction-bar" style={{ width: `${userGuess}%` }}>
                                        {userGuess}%
                                    </div>
                                </div>
                                <div className="prediction ai">
                                    <span>AI Prediction</span>
                                    <div className="prediction-bar" style={{ width: `${scenario.aiPrediction}%` }}>
                                        {scenario.aiPrediction}%
                                    </div>
                                </div>
                            </div>
                            
                            <div className="accuracy-score">
                                Prediction Accuracy: {100 - Math.abs(userGuess - scenario.aiPrediction)}%
                            </div>

                            {currentScenario < scenarios.length - 1 ? (
                                <button className="next-button" onClick={nextScenario}>
                                    Next Startup
                                </button>
                            ) : (
                                <div className="quiz-complete">
                                    <h3>Quiz Complete!</h3>
                                    <p>Final Score: {score / scenarios.length}%</p>
                                    <button className="reset-button" onClick={resetQuiz}>
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="quiz-progress">
                    Startup {currentScenario + 1} of {scenarios.length}
                </div>
            </div>
        </section>
    );
};

export default BurstQuiz; 