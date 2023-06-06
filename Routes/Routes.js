const {Router} = require ('express');
const controler = require ("../Controler/Controler.js")
const router = Router()


router.get('/id', controler.getUser)
router.put('/nova', controler.localize)


module.exports = router