import React, { useState, useCallback, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, Cell } from 'recharts';
import './BurstOMeter.css';

const mockData = [
  {
    name: "TechVibe AI",
    marketSaturation: 85,
    founderExpertise: 45,
    riskLevel: 78,
    industry: "AI",
    details: {
      funding: "$5M",
      teamSize: 20,
      description: "AI-powered content generation platform",
      monthlyBurn: "$200K",
      revenue: "$50K/month",
      growth: "+120% MoM"
    }
  },
  {
    name: "HealthTech Pro",
    marketSaturation: 45,
    founderExpertise: 80,
    riskLevel: 35,
    industry: "HealthTech",
    details: {
      funding: "$8M",
      teamSize: 30,
      description: "AI-driven healthcare diagnostics",
      monthlyBurn: "$300K",
      revenue: "$400K/month",
      growth: "+40% MoM"
    }
  },
  {
    name: "CryptoFlow",
    marketSaturation: 95,
    founderExpertise: 30,
    riskLevel: 92,
    industry: "Crypto",
    details: {
      funding: "$3M",
      teamSize: 12,
      description: "DeFi trading platform",
      monthlyBurn: "$150K",
      revenue: "$20K/month",
      growth: "+60% MoM"
    }
  },
  {
    name: "EduTech Plus",
    marketSaturation: 60,
    founderExpertise: 75,
    riskLevel: 45,
    industry: "EdTech",
    details: {
      funding: "$4M",
      teamSize: 25,
      description: "Personalized learning platform",
      monthlyBurn: "$180K",
      revenue: "$250K/month",
      growth: "+30% MoM"
    }
  },
  {
    name: "AISecure",
    marketSaturation: 70,
    founderExpertise: 65,
    riskLevel: 55,
    industry: "AI",
    details: {
      funding: "$6M",
      teamSize: 28,
      description: "AI cybersecurity solution",
      monthlyBurn: "$250K",
      revenue: "$200K/month",
      growth: "+45% MoM"
    }
  }
];

const getRiskColor = (riskLevel) => {
  if (riskLevel >= 80) return '#FF4D4D';
  if (riskLevel >= 60) return '#FFA64D';
  if (riskLevel >= 40) return '#FFE14D';
  return '#4DFF88';
};

const BurstOMeter = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [viewMode, setViewMode] = useState('all');

  const filteredData = useCallback(() => {
    let filtered = [...mockData];
    
    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(item => item.industry === selectedIndustry);
    }
    
    // Filter by view mode
    if (viewMode === 'promising') {
      filtered = filtered.filter(item => item.riskLevel < 50);
    } else if (viewMode === 'risky') {
      filtered = filtered.filter(item => item.riskLevel >= 50);
    }
    
    return filtered;
  }, [selectedIndustry, viewMode]);

  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const style = {
        left: coordinate?.x + 20,
        top: coordinate?.y - 10
      };
      
      return (
        <div className="burst-tooltip" style={style}>
          <h3>{data.name}</h3>
          <div className="tooltip-risk">
            Risk Level: <span style={{ color: getRiskColor(data.riskLevel) }}>{data.riskLevel}%</span>
          </div>
          <div className="tooltip-metrics">
            <div>Market Saturation: {data.marketSaturation}%</div>
            <div>Founder Expertise: {data.founderExpertise}%</div>
          </div>
          <div className="tooltip-details">
            <div className="tooltip-row">
              <span>Funding:</span>
              <span>{data.details.funding}</span>
            </div>
            <div className="tooltip-row">
              <span>Team Size:</span>
              <span>{data.details.teamSize}</span>
            </div>
            <div className="tooltip-row">
              <span>Monthly Burn:</span>
              <span>{data.details.monthlyBurn}</span>
            </div>
            <div className="tooltip-row">
              <span>Revenue:</span>
              <span>{data.details.revenue}</span>
            </div>
            <div className="tooltip-row">
              <span>Growth:</span>
              <span>{data.details.growth}</span>
            </div>
          </div>
          <div className="tooltip-description">
            {data.details.description}
          </div>
        </div>
      );
    }
    return null;
  };

  const industries = ['all', ...new Set(mockData.map(item => item.industry))];

  return (
    <div className="burst-o-meter">
      <div className="burst-header">
        <h2>Burst-o-Meter</h2>
        <p>Interactive startup risk analysis based on market saturation and founder expertise</p>
      </div>

      <div className="controls">
        <select 
          value={selectedIndustry} 
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="industry-select"
        >
          {industries.map(industry => (
            <option key={industry} value={industry}>
              {industry === 'all' ? 'All Industries' : `${industry} Startups`}
            </option>
          ))}
        </select>
        
        <div className="view-toggle">
          <button 
            className={viewMode === 'promising' ? 'active' : ''}
            onClick={() => setViewMode('promising')}
          >
            Most Promising
          </button>
          <button 
            className={viewMode === 'all' ? 'active' : ''}
            onClick={() => setViewMode('all')}
          >
            All Startups
          </button>
          <button 
            className={viewMode === 'risky' ? 'active' : ''}
            onClick={() => setViewMode('risky')}
          >
            High Risk
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ScatterChart
          width={600}
          height={350}
          margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
        >
          <XAxis 
            type="number" 
            dataKey="marketSaturation" 
            name="Market Saturation" 
            unit="%" 
            domain={[0, 100]}
            label={{ value: 'Market Saturation (%)', position: 'bottom', offset: 5 }}
            tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            stroke="rgba(255, 255, 255, 0.1)"
            fontSize={12}
          />
          <YAxis 
            type="number" 
            dataKey="founderExpertise" 
            name="Founder Expertise" 
            unit="%" 
            domain={[0, 100]}
            label={{ 
              value: 'Founder Expertise (%)', 
              angle: -90, 
              position: 'insideLeft', 
              offset: -5,
              style: {
                fill: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                textAnchor: 'middle'
              }
            }}
            tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            stroke="rgba(255, 255, 255, 0.1)"
            fontSize={12}
            tickMargin={5}
          />
          <ZAxis 
            type="number" 
            dataKey="riskLevel" 
            range={[300, 750]} 
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
            offset={20}
          />
          <Scatter 
            name="Startups" 
            data={filteredData()} 
            className="startup-bubble"
          >
            {filteredData().map((entry, index) => (
              <Cell
                key={index}
                fill={getRiskColor(entry.riskLevel)}
                fillOpacity={0.7}
                stroke={getRiskColor(entry.riskLevel)}
                strokeWidth={2}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </div>

      <div className="risk-legend">
        <div className="risk-level">
          <span className="risk-dot" style={{ backgroundColor: '#4DFF88' }}></span>
          <span>Low Risk</span>
          <span style={{ opacity: 0.7 }}>(0-40%)</span>
        </div>
        <div className="risk-level">
          <span className="risk-dot" style={{ backgroundColor: '#FFE14D' }}></span>
          <span>Medium Risk</span>
          <span style={{ opacity: 0.7 }}>(40-60%)</span>
        </div>
        <div className="risk-level">
          <span className="risk-dot" style={{ backgroundColor: '#FFA64D' }}></span>
          <span>High Risk</span>
          <span style={{ opacity: 0.7 }}>(60-80%)</span>
        </div>
        <div className="risk-level">
          <span className="risk-dot" style={{ backgroundColor: '#FF4D4D' }}></span>
          <span>Very High Risk</span>
          <span style={{ opacity: 0.7 }}>(80-100%)</span>
        </div>
      </div>
    </div>
  );
};

export default BurstOMeter; 