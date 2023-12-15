const express = require("express");
const router = express.Router();

const { getTickets, addTickets } = require("../controllers/ticketController");

router.get("/getTickets", getTickets);
router.post("/addTicket", addTickets);

module.exports = router;
