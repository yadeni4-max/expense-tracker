import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ income, expense }) {

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          '#4CAF50',
          '#F44336'
        ]
      }
    ]
  };

  return (
    <div className="card">
      <h2>Financial Overview</h2>

      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;