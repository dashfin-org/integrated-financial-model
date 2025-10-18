import React, { useState, useEffect } from 'react';

async function generateVixSpreadAnalysis(vixLevel, creditSpread) {
  console.log(`Generating analysis for VIX: ${vixLevel}, Credit Spread: ${creditSpread}`);
  // In a real app, this would be a Gemini API call.
  return new Promise(resolve => setTimeout(() => {
    resolve(`Mock Analysis: With the VIX at ${vixLevel} and credit spreads at ${creditSpread}bps, the market is currently exhibiting signs of heightened risk aversion. The volatility index suggests significant fear, while the widening credit market spreads indicate a reduced appetite for corporate risk. This combination points towards a cautious short-term outlook for the global economy.`);
  }, 1500));
}

const VixSpreadAnalysis = ({ vixLevel, creditSpread }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!vixLevel || !creditSpread) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await generateVixSpreadAnalysis(vixLevel, creditSpread);
        setAnalysis(result);
      } catch (err) {
        console.error("Error generating VIX/Spread analysis:", err);
        setError("Failed to generate analysis. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalysis();
  }, [vixLevel, creditSpread]);

  return (
    <div className="vix-spread-analysis-container macro-analysis-widget" style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', flex: 1 }}>
      <h3>VIX & Credit Spread Analysis</h3>
      {isLoading && <p>Generating AI-powered risk assessment...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && (
        <p className="analysis-text">{analysis}</p>
      )}
    </div>
  );
};

export default VixSpreadAnalysis;