// frontend/src/features/analytics/components/AnalyticsSummary.jsx
import React from 'react';
import SeverityChart from './SeverityChart';
import DamageTrendChart from './DamageTrendChart';

const AnalyticsSummary = ({ analyticsData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Structural Distribution Analysis Module */}
      <SeverityChart data={analyticsData?.severity} />

      {/* Historical Trend Logging Engine Vector */}
      <DamageTrendChart trends={analyticsData?.trends} />
    </div>
  );
};

export default AnalyticsSummary;