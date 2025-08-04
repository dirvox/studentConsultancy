const express = require('express');
const router = express.Router();
const {addConsultant , getConsultants, addTimeSlots , getAllUsers , bookConsultant } = require('../controllers/adminController');
const upload = require('../middleware/upload');


// Add Consultant
router.post('/addConsultant', upload.single('image'), addConsultant);

// Get all Consultants
router.get('/getConsultants', getConsultants);
router.post("/AddSlots/:id", addTimeSlots)
router.get("/allconsultants", getConsultants);
router.get("/allusers", getAllUsers);
router.post("/bookConsulatnt", bookConsultant);



module.exports = router;
