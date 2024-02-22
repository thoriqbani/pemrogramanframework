const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')

router.get('/', function(req, res, next){
    connect.query('select * from kategori order by id desc', function(err, rows){
        if(err){
            req.flash('error', err);
        } else {
            res.render('kategori/index', {
                data: rows
            });
        }
    })
})

module.exports = router