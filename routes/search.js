const express=require("express");
const { getData, searchItem, textIndex, atlasSearch } = require("../controllers/search");
const { embedded } = require("../controllers/embedded");
const router=express.Router()

router.get("/data",getData)

router.get("/search",searchItem)

router.get("/text",textIndex)


router.get("/atlas",atlasSearch)

router.get("/embedded",embedded)

module.exports=router;