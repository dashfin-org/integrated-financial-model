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
    <div className="app-container" style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ borderBottom: '2px solid #e1e4e8', paddingBottom: '10px', marginBottom: '25px' }}>
        <h1 style={{ color: '#24292e', fontSize: '2em' }}>Integrated Financial Model (V37)</h1>
        <p style={{ color: '#586069', margin: 0 }}>AI Charting Co-Pilot Dashboard</p>
      </header>

      <main>
        <h2 style={{ color: '#24292e', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px' }}>Global Macro Market Indicators</h2>
        <div className="widgets-container" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Placeholder for other macro widgets like the Yield Curve */}
          <div className="yield-curve-widget macro-analysis-widget" style={{ border: '1px solid #d1d5da', padding: '15px', borderRadius: '8px', flex: 1, backgroundColor: 'white', minWidth: '300px' }}>
             <h3>10Y Yield Curve</h3>
             <p style={{ color: '#586069' }}>Analysis for the yield curve would be displayed here.</p>
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