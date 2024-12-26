import React, { useState, useRef } from 'react';
import './StartupGraveyard.css';

const StartupGraveyard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const gridRef = useRef(null);

  const scroll = (direction) => {
    if (gridRef.current) {
      const container = gridRef.current;
      const cardWidth = container.querySelector('.tomb-card').offsetWidth;
      const gap = 32; // 2rem gap
      const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
      
      // Get current scroll position
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // Calculate new scroll position
      let newScroll = currentScroll + scrollAmount;
      
      // Ensure we don't scroll past the bounds
      if (newScroll < 0) newScroll = 0;
      if (newScroll > maxScroll) newScroll = maxScroll;
      
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const startups = [
    {
      id: 1,
      name: 'QuickBite',
      years: '2021 - 2023',
      epitaph: 'Burned through cash faster than customers could say "delivery"',
      cause: 'Oversaturated Market',
      stats: {
        funding: '$12M',
        employees: '150',
        burnRate: '$800K/month',
        lastValuation: '$50M'
      }
    },
    {
      id: 2,
      name: 'CryptoKittens',
      years: '2022 - 2023',
      epitaph: 'Nine lives weren\'t enough in the crypto winter',
      cause: 'Market Timing',
      stats: {
        funding: '$8M',
        employees: '45',
        burnRate: '$400K/month',
        lastValuation: '$30M'
      }
    },
    {
      id: 3,
      name: 'MetaOffice',
      years: '2020 - 2023',
      epitaph: 'Tried to revolutionize WFH, ended up NSFH (Not Suitable For Humans)',
      cause: 'Product-Market Fit',
      stats: {
        funding: '$25M',
        employees: '200',
        burnRate: '$1.2M/month',
        lastValuation: '$120M'
      }
    },
    {
      id: 4,
      name: 'AIWriter.io',
      years: '2021 - 2023',
      epitaph: 'Wrote its own obituary, then deprecated itself',
      cause: 'Founder Disputes',
      stats: {
        funding: '$5M',
        employees: '30',
        burnRate: '$300K/month',
        lastValuation: '$20M'
      }
    }
  ];

  return (
    <section className="graveyard-section" data-aos="fade-up">
      <div className="graveyard-header">
        <h2>Startup Graveyard</h2>
        <p>Lessons from the departed: AI-analyzed autopsies of startups that didn't make it</p>
      </div>

      <div className="graveyard-container">
        <div className="graveyard-grid" ref={gridRef}>
          {startups.map((startup) => (
            <div
              key={startup.id}
              className={`tomb-card ${hoveredCard === startup.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredCard(startup.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-aos="fade-up"
              data-aos-delay={startup.id * 100}
            >
              <div className="tomb-front">
                <div className="tomb-header">
                  <span className="rip">R.I.P.</span>
                  <span className="years">{startup.years}</span>
                </div>
                <h3>{startup.name}</h3>
                <p className="epitaph">"{startup.epitaph}"</p>
                <div className="cause-tag">{startup.cause}</div>
                <div className="tomb-glow"></div>
              </div>

              <div className="tomb-back">
                <h4>Startup Autopsy</h4>
                <div className="stats-grid">
                  <div className="stat">
                    <span className="label">Total Funding</span>
                    <span className="value">{startup.stats.funding}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Team Size</span>
                    <span className="value">{startup.stats.employees}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Monthly Burn</span>
                    <span className="value">{startup.stats.burnRate}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Last Valuation</span>
                    <span className="value">{startup.stats.lastValuation}</span>
                  </div>
                </div>
                <button className="analyze-btn">View Full Analysis →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-nav">
          <button className="scroll-btn" onClick={() => scroll('left')}>←</button>
          <button className="scroll-btn" onClick={() => scroll('right')}>→</button>
        </div>
      </div>

      <div className="graveyard-footer">
        <p>Don't let your startup join our collection. Learn from their mistakes.</p>
        <button className="primary-button">Get Risk Analysis</button>
      </div>
    </section>
  );
};

export default StartupGraveyard; 