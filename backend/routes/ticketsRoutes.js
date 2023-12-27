const express = require("express");
const router = express.Router();

const {
  getTickets,
  addTickets,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

router.get("/getTickets", getTickets);
router.post("/addTicket", addTickets);
router.delete("/:ticketId", deleteTicket);
router.patch("/:ticketId", updateTicket);

module.exports = router;
