const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_keahlian = require('../models/model_keahlian.js');

router.get('/', async function(req, res, next){
    let Rows = await model_keahlian.getAll();
    res.render('keahlian/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('keahlian/create', {
        nama_keahlian: '',
        tingkat_keahlian: '',
        id_mahasiswa: ''
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_keahlian.getId(id);

    res.render('keahlian/edit', {
        id:rows[0].id,
        nama_keahlian:rows[0].nama_keahlian,
        tingkat_keahlian: rows[0].tingkat_keahlian,
        id_mahasiswa: rows[0].id_mahasiswa
    })
})

router.post('/store', async function(req, res){
    try {
        let {nama_keahlian, tingkat_keahlian,id_mahasiswa} = req.body
        let Data = {
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        }
        await model_keahlian.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/keahlian')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.redirect('/keahlian')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama_keahlian, tingkat_keahlian,id_mahasiswa} = req.body
        let Data = {
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        }
        await model_keahlian.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/keahlian')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/keahlian')
    }
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_keahlian.Delete(id)
    req.flash('success','keahlian berhasil dihapus')
    res.redirect('/keahlian')
})

module.exports = router