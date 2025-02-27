const express=require("express");
const { getData, searchItem, textIndex } = require("../controllers/search");
const router=express.Router()

router.get("/data",getData)

router.get("/search",searchItem)

router.get("/text",textIndex)

module.exports=router;