import React from 'react';
import VixSpreadAnalysis from './components/VixSpreadAnalysis';

// Mock data for the macro indicators
const MOCK_MACRO_DATA = {
  vixLevel: 25.5,
  creditSpread: 450, // in basis points
  tenYearYield: 4.2,
};

function App() {
  return (
    <div className="app-container" style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1>Integrated Financial Model (V37)</h1>
        <p>AI Charting Co-Pilot Dashboard</p>
      </header>

      <main style={{ marginTop: '20px' }}>
        <h2>Global Macro Market Indicators</h2>
        <div className="widgets-container" style={{ display: 'flex', gap: '20px' }}>
          
          {/* Placeholder for other macro widgets like the Yield Curve */}
          <div className="yield-curve-widget macro-analysis-widget">
             <h3>10Y Yield Curve</h3>
             <p>Analysis for yield curve would be displayed here.</p>
          </div>

          {/* Our new, active component */}
          <VixSpreadAnalysis 
            vixLevel={MOCK_MACRO_DATA.vixLevel} 
            creditSpread={MOCK_MACRO_DATA.creditSpread} 
          />

        </div>
      </main>
    </div>
  );
}

export default App;