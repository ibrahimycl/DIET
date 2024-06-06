const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

const {
  accessChats,
  fetchAllChats,
  creatGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require ('../controller/chatController.js');
router.post('/', authMiddleware, accessChats);
router.get('/', authMiddleware, fetchAllChats);
router.post('/group', authMiddleware, creatGroup);
router.post('/group/rename', authMiddleware, renameGroup);
router.post('/groupAdd', authMiddleware, addToGroup);
router.post('/groupRemove', authMiddleware, removeFromGroup);
router.delete('/removeuser', authMiddleware);

module.exports = router;