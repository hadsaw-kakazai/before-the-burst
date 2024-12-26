import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Thermometer from './components/Thermometer';
import BlogStack from './components/BlogStack';
import StartupGraveyard from './components/StartupGraveyard';
import StartupAnalyzer from './components/StartupAnalyzer';
import BurstQuiz from './components/BurstQuiz';
import BurstTimeline from './components/BurstTimeline';
import BurstOMeter from './components/BurstOMeter';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Thermometer />
                            <BlogStack />
                            <StartupGraveyard />
                            <StartupAnalyzer />
                            <BurstQuiz />
                            <BurstTimeline />
                            <BurstOMeter />
                            <Footer />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
