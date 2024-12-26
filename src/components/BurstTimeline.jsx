import React from 'react';
import './BurstTimeline.css';

const BurstTimeline = () => {
  const timelineData = [
    {
      title: "Initial Boom",
      description: "Unprecedented investment in AI startups with ambitious valuations",
      stats: {
        investment: "$100B+",
        startups: "15,000+"
      },
      tag: "Growth"
    },
    {
      title: "Early Growth",
      description: "AI startups experience rapid growth and declining revenue despite market growth",
      stats: {
        decline: "50%",
        layoffs: "25,000+"
      },
      tag: "Consolidation"
    },
    {
      title: "Market Skepticism",
      description: "Increased scrutiny of AI claims and market devaluation",
      stats: {
        devaluation: "-40%",
        failures: "2,000+"
      },
      tag: "Skepticism"
    },
    {
      title: "The Burst",
      description: "AI startup bubble burst, leading to market restructuring",
      stats: {
        impact: "Severe",
        survival: "30%"
      },
      tag: "Opportunity"
    },
    {
      title: "Market Reset",
      description: "Industry consolidation and focus on sustainable AI businesses",
      stats: {
        recovery: "15%",
        funding: "$10B"
      },
      tag: "Recovery"
    }
  ];

  return (
    <div className="timeline-section">
      <div className="timeline-header">
        <h2>Timeline to the Burst</h2>
        <p>Track the evolution of the AI startup bubble and explore key milestones</p>
      </div>
      <div className="timeline-container">
        <div className="timeline-events">
          {timelineData.map((event, index) => (
            <div key={index} className="timeline-event">
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-stats">
                  {Object.entries(event.stats).map(([key, value], statIndex) => (
                    <div key={statIndex} className="stat">
                      <span className="stat-value">{value}</span>
                      <span className="stat-label">{key}</span>
                    </div>
                  ))}
                </div>
                <div className="tag">{event.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurstTimeline; 