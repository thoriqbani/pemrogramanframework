const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_pendidikan = require('../models/model_pendidikan.js');

router.get('/', async function(req, res, next){
    let Rows = await model_pendidikan.getAll();
    res.render('pendidikan/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('pendidikan/create', {
        nama_instansi: '',
        jurusan: '',
        tahun_masuk: '',
        tahun_lulus: '',
        nomor_ijazah: '',
        id_mahasiswa: '',
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_pendidikan.getId(id);

    res.render('pendidikan/edit', {
        id:rows[0].id,
        nama_instansi:rows[0].nama_instansi,
        jurusan:rows[0].jurusan,
        tahun_masuk: rows[0].tahun_masuk,
        tahun_lulus: rows[0].tahun_lulus,
        nomor_ijazah: rows[0].nomor_ijazah,
        id_mahasiswa: rows[0].id_mahasiswa,
    })
})

router.post('/store', async function(req, res){
    try {
        let {nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa} = req.body
        let Data = {
            nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa
        }
        await model_pendidikan.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/pendidikan')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.redirect('/pendidikan')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa} = req.body
        let Data = {
            nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa
        }
        await model_pendidikan.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/pendidikan')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/pendidikan')
    }
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_pendidikan.Delete(id)
    req.flash('success','pendidikan berhasil dihapus')
    res.redirect('/pendidikan')
})

module.exports = router