const {Router} = require ('express');
const controler = require ("../Controler/Controler.js")
const router = Router()


router.get('/id', controler.getUser)
router.put('/getexclusivereport', controler.localize)
router.put('/login', controler.login)
router.post('/registrar', controler.registrar)
router.get('/getall', controler.getreport)
router.put('/getmyrepo', controler.getmyreports)
router.post('/imgrecieve', controler.imgConverter)
router.get('/sectors', controler.getSectors)
router.post('/postreport', controler.postReport)
router.post('/cadastrarunidade', controler.postunity)
router.get('/unidadesdisponiveis', controler.getUnitys)
router.post('/cadastrarcidade', controler.postCity)
router.get('/consultarcidade', controler.GetCity)
router.put('/getexclusive', controler.getExclusive)
router.post('/updateuser', controler.updateUser)


module.exports = router