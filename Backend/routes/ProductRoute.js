const express = require('express')
const {getAllproduct,createProduct,Updateproduct,deleteProduct,getProductdetails} = require('../controllers/Productcontroller')

const router = express.Router()

router.route('/products').get(getAllproduct);
router.route('/products/new').post(createProduct);
router.route('/product/:id').put(Updateproduct).delete(deleteProduct).get(getProductdetails);







module.exports=router