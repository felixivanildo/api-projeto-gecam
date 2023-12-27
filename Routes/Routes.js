const {Router} = require ('express');
const controler = require ("../Controler/Controler.js")
const router = Router()


router.get('/id', controler.getUser)
router.get('/colecttypes', controler.getColectType)
router.get('/interesteds', controler.getInterested)
router.get('/getall', controler.getreport)
router.get('/sectors', controler.getSectors)
router.get('/unidadesdisponiveis', controler.getUnitys)
router.get('/consultarcidade', controler.GetCity)
router.get('/getbuilding', controler.getBuilding)
router.get('/notifications', controler.notification)
router.put('/getexclusivereport', controler.localize)
router.put('/login', controler.login)
router.put('/getexclusive', controler.getExclusive)
router.put('/deleteimage', controler.deleteImage)
router.put('/getmyrepo', controler.getmyreports)
router.put('/print', controler.print)
router.post('/imgrecieve', controler.imgConverter)
router.post('/registrar', controler.registrar)
router.post('/postreport', controler.postReport)
// router.post('/cadastrarunidade', controler.postunity)
router.post('/cadastrar', controler.postModules)
router.post('/updateuser', controler.updateUser)






module.exports = router