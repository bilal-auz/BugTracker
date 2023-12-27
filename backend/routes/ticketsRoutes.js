const express = require("express");
const router = express.Router();

const {
  getTickets,
  addTickets,
  deleteTicket,
} = require("../controllers/ticketController");

router.get("/getTickets", getTickets);
router.post("/addTicket", addTickets);
router.delete("/:ticketId", deleteTicket);

module.exports = router;
