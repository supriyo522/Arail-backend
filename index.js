const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ In-memory array (data stored here)
let customers = [];

/**
 * POST - Add customer
 */
app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newCustomer = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

/**
 * GET - All customers
 */
app.get("/customers", (req, res) => {
  res.json(customers);
});

/**
 * DELETE - Remove customer
 */
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;

  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customers.splice(index, 1);

  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});