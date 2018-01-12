var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM members", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });
    });
});


//jajal disini
router.put('/jajal/:id', function(req, res, next) {
	var postBody = req.body;
	res.send(postBody.name);
});



//=====================
module.exports = router;