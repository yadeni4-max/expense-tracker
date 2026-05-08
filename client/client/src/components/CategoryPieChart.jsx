import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart({ transactions }) {
  // group by category
  const categoryTotals = transactions.reduce((acc, t) => {
  // 🔥 ONLY EXPENSES
  if (t.type !== 'expense') return acc;

  const category = t.category || 'Other';

  acc[category] = (acc[category] || 0) + Number(t.amount);

  return acc;
}, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  return (
    <div className="card">
      <h2>📊 Category Breakdown</h2>
      <Pie data={data} />
    </div>
  );
}

export default CategoryPieChart;