const path = require("path")
const express = require("express")
const router = express.Router()
const FilesController = require("../controllers/files.controller")
const isLogin = require("../middlewares/is.login")
const multerConfig = require("../configs/multer.config")
const folder = path.join(__dirname,"../uploads/")
const uploader = multerConfig(folder)


router.post("/files/upload",isLogin,uploader.fields([
  { name: 'files', maxCount: 15 }]),FilesController.uploadFiles) 

router.get("/files/all-files",isLogin,FilesController.getFiles) 
router.post("/files/rename-file",isLogin,FilesController.renameFile) 
router.post("/files/delete-file",isLogin,FilesController.deleteFile) 

module.exports = router