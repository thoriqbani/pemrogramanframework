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

router.get('/create', function(req,res){
    res.render('kategori/create', {
        nama: ''
    })
})

router.get('/edit/(:id)', function(req, res){
    const id = req.params.id;
    connect.query('select * from kategori where id = ?', id, function(err, rows){
        if(err){
            req.flash('error','Query gagal')
        } else {
            res.render('kategori/edit',{
                id: rows[0].id,
                nama: rows[0].nama
            })
        }
    })
})

router.post('/store', function(req, res){
    try {
        const nama = req.body
        connect.query('insert into kategori set ? ', nama, function(err, result){
            if(err){
                req.flash('error','Gagal menyimpan data')
            } else {
                req.flash('success','Berhasil menyimpan data')
            }
            res.redirect('/kategori')
        })
    } catch(error) {
        console.error(error)
        req.flash('error', 'Terjadi Kesalahan')
        res.redirect('/kategori')
        
    }
})

router.post('/update/(:id)', function(req, res){
    try{
        const id = req.params.id;
        const Data = {
            nama: req.body.nama
        }
        connect.query('update kategori set ? where id = '+ id, Data, function(err){
            if(err){
                req.flash('error','gagal memperbaharui data')
            } else {
                res.redirect('/kategori')
            }
        })
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/kategori')
    }
})

router.get('/delete/(:id)', function(req, res) {
    const id = req.params.id
    connect.query('delete from kategori where id = ?', id, function(err){
        if(err){
            req.flash('error','Gagal menghapus')
        } else {
            req.flash('success','Data terhapus')
        }
        res.redirect('/kategori')
    })
})

module.exports = router