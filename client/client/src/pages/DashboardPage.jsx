import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import ExpenseChart from '../components/ExpenseChart';
import CategoryPieChart from '../components/CategoryPieChart';


function DashboardPage() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState('all');

  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: ''
  });

  // 🔹 Fetch transactions
  const fetchTransactions = async () => {
  try {

    setLoading(true);

    const response = await API.get('/api/transactions');

    setTransactions(response.data);

    setLoading(false);

  } catch (error) {

    console.log(error);

    setLoading(false);
  }
};

  // 🔹 Protect route + load data
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      fetchTransactions();
    }
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Add transaction
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingId) {

      await API.put(
        `/transactions/${editingId}`,
        formData
      );

      alert('Transaction updated');

      setEditingId(null);

    } else {

      await API.post(
        '/transactions',
        formData
      );

      alert('Transaction added');
    }

    setFormData({
      amount: '',
      type: 'expense',
      category: ''
    });

    fetchTransactions();

  } catch (error) {

    console.log(error);

    alert('Operation failed');
  }
};

  // 🔹 Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Create filteredTransactions
  const filteredTransactions =
  selectedMonth === 'all'
    ? transactions
    : transactions.filter((t) => {

        const transactionMonth =
          new Date(t.date).getMonth() + 1;

        return (
          transactionMonth === Number(selectedMonth)
        );
      });




  // 🔹 Calculations
  const income = filteredTransactions
  .filter((t) => t.type === 'income')
  .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = filteredTransactions
  .filter((t) => t.type === 'expense')
  .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

const startEdit = (transaction) => {

  setEditingId(transaction._id);

  setFormData({
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category
  });
};

// CATEGORY BREAKDOWN (FOR CHART)
const categoryTotals = transactions.reduce((acc, curr) => {
  const category = curr.category || 'Other';

  if (!acc[category]) {
    acc[category] = 0;
  }

  acc[category] += curr.amount;

  return acc;
}, {});


  return (
    <div className="dashboard-container">

      <div className="header">
        <h1>💰 Expense Tracker</h1>

        <button onClick={handleLogout}>
        Logout
        </button>
    </div>


    <select
  value={selectedMonth}
  onChange={(e) =>
    setSelectedMonth(e.target.value)
  }
>

  <option value="all">
    All Months
  </option>

  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>

</select>



      {/* SUMMARY */}
      <div className="summary">

        <div className="summary-box income">
        <h3>Income</h3>
         <p>+ {income}</p>
        </div>

        <div className="summary-box expense">
        <h3>Expense</h3>
        <p>- {expense}</p>
        </div>

        <div className="summary-box balance">
        <h3>Balance</h3>
        <p>{balance}</p>
        </div>

        <ExpenseChart income={income} expense={expense}/>

        <CategoryPieChart transactions={transactions} />

      </div>

      {/* ADD TRANSACTION */}
      <div className="card">

        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit}>

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Transport">Transport</option>
                <option value="Salary">Salary</option>
                <option value="Other">Other</option>
            </select>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

         <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange}
        />

          <button type="submit">
            {editingId
            ? 'Update Transaction'
            : 'Add Transaction'}
          </button>

        </form>

      </div>

      {/* TRANSACTIONS LIST */}
      <div className="card">

        <h2>Transactions</h2>

       {loading ? (
        <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
        <p>No transactions yet. Add your first one 👇</p>
        ) : (
        filteredTransactions.map((t) => (
        <div key={t._id} className="transaction-card">

         <p><strong>{t.category}</strong></p>

         <p>{t.type}</p>

        <p>{t.amount}</p>

      <button onClick={() => deleteTransaction(t._id)}>
        Delete
      </button>

      <button onClick={() => startEdit(t)}>
        Edit
        </button>

    </div>
  ))
)}

</div>

      </div>

    
  );
}

export default DashboardPage;