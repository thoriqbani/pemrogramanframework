const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_kategori = require('../models/model_kategori.js');

router.get('/', async function(req, res, next){
    let Rows = await model_kategori.getAll();
    res.render('kategori/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('kategori/create', {
        nama: ''
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_kategori.getId(id);

    res.render('kategori/edit', {
        id:rows[0].id,
        nama: rows[0].nama
    })
})

router.post('/store', async function(req, res){
    try {
        let {nama} = req.body
        let Data = {
            nama
        }
        await model_kategori.Store(Data)
        req.flash('sucess', 'Berhasil menyimpan')
        res.redirect('/kategori')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.redirect('/kategori')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama} = req.body
        const Data = {
            nama        
        }
        await model_kategori.Update(id, Data) 
        res.redirect('/kategori')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/kategori')
    }
    
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_kategori.Delete(id)
    req.flash('success','Kategori berhasil dihapus')
    res.redirect('/kategori')
})

module.exports = router