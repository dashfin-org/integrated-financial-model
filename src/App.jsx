import React from 'react';
import { ChartComponent } from './components/ChartComponent';
import VixSpreadAnalysis from './components/VixSpreadAnalysis';
import { initialData } from './data/initialData'; // We will create this file next

// Mock data for the macro indicators
const MOCK_MACRO_DATA = {
  vixLevel: 25.5,
  creditSpread: 450, // in basis points
};

function App() {
  return (
    <div className="app-container" style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ borderBottom: '2px solid #e1e4e8', paddingBottom: '10px', marginBottom: '25px' }}>
        <h1 style={{ color: '#24292e', fontSize: '2em' }}>Integrated Financial Model (V37)</h1>
        <p style={{ color: '#586069', margin: 0 }}>AI Charting Co-Pilot Dashboard</p>
      </header>

      <main>
        <div className="main-layout" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Main Chart Component */}
          <div className="chart-container" style={{ flex: 3, minWidth: '600px', backgroundColor: 'white', border: '1px solid #d1d5da', borderRadius: '8px', padding: '15px' }}>
            <h2>SPY - S&P 500 ETF</h2>
            <ChartComponent data={initialData} />
          </div>

          {/* Sidebar for Macro Indicators */}
          <div className="sidebar" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ color: '#24292e', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px', marginBottom: '0' }}>Macro Indicators</h2>
            <VixSpreadAnalysis 
              vixLevel={MOCK_MACRO_DATA.vixLevel} 
              creditSpread={MOCK_MACRO_DATA.creditSpread} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;