var sql = require('./sql')
var handels = require('./handels')

let queryInfo = () => {
	return new Promise((resolve, reject) => {
		handels.query(sql.query, (err, result) => {
			if(err) {
				reject(err)
			}
			resolve({
				response: {
					data: {
						time: new Date(),
						result: result,
						code: '0'
					},
					status: 200
				}
			})
		})
	})
}

exports.queryInof = queryInfo
