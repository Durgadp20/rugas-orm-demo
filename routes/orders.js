const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create an order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders with optional filters: status, customer, category
router.get("/", async (req, res) => {
  try {
    const { status, customer, category } = req.query;
    let query = {};

    if (status) query.status = status;
    if (customer) query.customer = customer;

    let orders = await Order.find(query)
      .populate("customer")
      .populate("product");

    if (category) {
      // Filter after populating since category is in product
      orders = orders.filter((o) => o.product?.category === category);
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (placed → shipped → delivered/cancelled)
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order statistics for dashboard
router.get("/stats", async (req, res) => {
  try {
    const orders = await Order.find().populate("product");

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.product?.price || 0) * (order.quantity || 1);
    }, 0);

    const statusCounts = {
      placed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
      }
    });

    res.json({
      totalOrders,
      totalRevenue,
      statusCounts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
