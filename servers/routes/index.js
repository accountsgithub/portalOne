var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getInfo', async (req, res, next) => {
	try {
		let result = await require('../modules/servers').queryInof()
		res.send(result)
	} catch (e) {
		res.send(e)
	}
});

module.exports = router;
