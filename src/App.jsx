import { useState } from 'react'

function App() {
  const [milkTaken, setMilkTaken] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const rate = 62;

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const savedEntries =
    JSON.parse(localStorage.getItem("milkEntries")) || [];

  const selectedMonthEntries = savedEntries.filter(
    (entry) => entry.date.slice(0, 7) === selectedMonth
  );

  const totalMilk = selectedMonthEntries.reduce(
    (total, entry) => total + entry.quantity,
    0
  );

  const totalBill = selectedMonthEntries.reduce(
    (total, entry) => total + entry.amount,
    0
  );

  const availableMonths = [
    ...new Set(savedEntries.map((entry) => entry.date.slice(0, 7)))
  ];

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];
    const existingEntries =
      JSON.parse(localStorage.getItem("milkEntries")) || [];

    const alreadyExists = existingEntries.some(
      (entry) => entry.date === today
    );

    if (alreadyExists) {
      alert("आज की एंट्री पहले ही सेव हो चुकी है।");
      return;
    }

    const entry = {
      date: today,
      milkTaken: milkTaken,
      quantity: quantity,
      rate: rate,
      amount: quantity * rate
    };

    existingEntries.push(entry);

    localStorage.setItem("milkEntries", JSON.stringify(existingEntries));

    alert("आज की दूध की एंट्री सेव हो गई!");
  };

  return (
    <div>
      <h1>🥛 MilkMeter</h1>

      <h2>Today's Milk</h2>
      <button onClick={() => setMilkTaken(true)}>Yes</button>
      <button onClick={() => setMilkTaken(false)}>No</button>

      {milkTaken === true && (
        <div>
          <h3>Quantity</h3>
          {quantity && (
            <p>
              आज का अमाउंट: ₹{quantity * rate}
              <button onClick={handleSave}>Save Today's Entry</button>
            </p>
          )}

          <button onClick={() => setQuantity(0.5)}>0.5 L</button>
          <button onClick={() => setQuantity(1)}>1 L</button>
          <button onClick={() => setQuantity(1.5)}>1.5 L</button>
          <button onClick={() => setQuantity(2)}>2 L</button>

          <p>Selected: {quantity} </p>
        </div>
      )}

      <p>
        {milkTaken === true && "Milk has been taken today."}
        {milkTaken === false && "Milk has not been taken today."}
      </p>

      <h2>Monthly Bill</h2>
      <button onClick={() => setShowBill(true)}>View Monthly Bill</button>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {new Date(month + "-01").toLocaleDateString("en-US", {
              month: "long",
              year: "numeric"
            })}
          </option>
        ))}
      </select>

      {showBill && (
        <div>
          <p>Total Milk: {totalMilk} L</p>
          <p>Total Bill: ₹{totalBill}</p>
        </div>
      )}

      <h2>Milk History</h2>
      <button onClick={() => setShowHistory(!showHistory)}>View History</button>

      {showHistory && (
        <div>
          {selectedMonthEntries.map((entry, index) => (
            <p key={index}>
              {entry.date} — {entry.quantity} L — ₹{entry.amount}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
