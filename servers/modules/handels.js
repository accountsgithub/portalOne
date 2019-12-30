var mysql = require('mysql')
var mysqlconfig = require('../config/mysql')

var pool = mysql.createPool(mysqlconfig)

function query(sql, callback) {
	pool.getConnection(function (err, connection) {
		connection.query(sql, function (err, result) {
			callback(err, result)
			connection.release()
		})
	})
}

exports.query = query
