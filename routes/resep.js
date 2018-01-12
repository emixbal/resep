var express = require('express');
var router = express.Router();

//get reseps as list
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM resep", function(err, rows) {
            if (!err && rows.length > 0) {
				var reseps={reseps:rows}
                res.json(reseps);
            } else {
                res.json([]);
            }
        });
    });
});

//get resep by id
router.get('/:id', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var id = req.params.id;
        connection.query("SELECT * FROM resep WHERE id='" + id + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
				var reseps={reseps:rows[0]}
                res.json(reseps);
                
            } else {
                res.json([]);
            }
        });
    });
});

//add new resep
router.post('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var postBody = req.body;
        var resepName = postBody.name;
		var resepDescription = postBody.description;
        var resepIngredient = postBody.ingredient;
		var resepDirection = postBody.direction;
		
        connection.query("INSERT INTO resep (name, description, ingredient, direction) VALUES ('"+resepName+"','"+resepDescription+"' ,'" + resepIngredient + "','"+resepDirection+"')", function(err, rows) {
            if (rows.affectedRows) {
                connection.query("SELECT * FROM resep WHERE id='" + rows.insertId + "' LIMIT 1", function(err, rows) {
                    if (!err && rows.length > 0) {
                        //res.json(rows[0]);
						var resep={reseps:rows[0]}
						res.json(resep);
                    } else {
                        res.json([]);
                    }
                });
            }
        });
    });
});

//delete resep by id
router.delete('/:id', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var id = req.params.id;
        connection.query("DELETE FROM resep WHERE id='" + id + "'", function(err, rows) {
            if (!err) {
                res.json({
                    "status": true
                });
            } else {
                res.json([]);
            }
        });
    });
});


//update resep by id
router.put('/:id', function(req, res, next) {		
    pool.getConnection(function(err, connection) {
		var resepId = req.params.id;
		
        var postBody = req.body;
        var resepName = postBody.name;
		var resepDescription = postBody.description;
        var resepIngredient = postBody.ingredient;
		var resepDirection = postBody.direction;
		
        connection.query("UPDATE resep SET name='" + resepName + "', ingredient='" + resepIngredient + "', direction='" + resepDirection + "' WHERE id='" + resepId + "'", function(err, rows) {
            if (rows.affectedRows) {
                connection.query("SELECT * FROM resep WHERE id='" + resepId + "' LIMIT 1", function(err, rows) {
                    if (!err && rows.length > 0) {
                        res.json(rows[0]);
                    } else {
                        res.json([]);
                    }
                });
            }
        });
    });
});

//jajal disini
//add new resep
router.post('/update', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var postBody = req.body;
		
		var resepId = postBody.id;
        var resepName = postBody.name;
		var resepDescription = postBody.description;
        var resepIngredient = postBody.ingredient;
		var resepDirection = postBody.direction;
		
        connection.query("UPDATE resep SET name='" + resepName + "', ingredient='" + resepIngredient + "', direction='" + resepDirection + "' WHERE id='" + resepId + "'", function(err, rows) {
            if (rows.affectedRows) {
                connection.query("SELECT * FROM resep WHERE id='" + resepId + "' LIMIT 1", function(err, rows) {
                    if (!err && rows.length > 0) {
                        res.json(rows[0]);
                    } else {
                        res.json([]);
                    }
                });
            }
        });
    });
});



//=====================
module.exports = router;