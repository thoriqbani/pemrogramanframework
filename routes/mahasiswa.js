const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_mahasiswa = require('../models/model_mahasiswa.js');

router.get('/', async function(req, res, next){
    let Rows = await model_mahasiswa.getAll();
    res.render('mahasiswa/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('mahasiswa/create', {
        nrp: '',
        nama_depan: '',
        nama_belakang: '',
        jenis_kelamin: '',
        agama: '',
        umur: '',
        tinggi_badan: '',
        gol_darah: '',
        alamat: '',
        hobi: '',
        email: '',
        no_telpon: ''
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_mahasiswa.getId(id);

    res.render('mahasiswa/edit', {
        id:rows[0].id,
        nrp: rows[0].nrp,
        nama_depan: rows[0].nama_depan,
        nama_belakang: rows[0].nama_belakang,
        jenis_kelamin: rows[0].jenis_kelamin,
        agama: rows[0].agama,
        umur: rows[0].umur,
        tinggi_badan: rows[0].tinggi_badan,
        gol_darah: rows[0].gol_darah,
        alamat: rows[0].alamat,
        hobi: rows[0].hobi,
        email: rows[0].email,
        no_telpon: rows[0].no_telpon,
    })
})

router.post('/store', async function(req, res){
    try {
        let {id, nrp, nama_depan,nama_belakang,jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon } = req.body
        let Data = {
            id,
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon,
        }
        await model_mahasiswa.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/mahasiswa')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.redirect('/mahasiswa')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nrp, nama_depan,nama_belakang,jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon } = req.body
        let Data = {
            
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon,
        }
        await model_mahasiswa.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/mahasiswa')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/mahasiswa')
    }
    
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_mahasiswa.Delete(id)
    req.flash('success','mahasiswa berhasil dihapus')
    res.redirect('/mahasiswa')
})

module.exports = router