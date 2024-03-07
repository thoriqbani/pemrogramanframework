const connect = require('../config/db.js')

class model_kategori {
    static async getAll(){
        return new Promise((resolve, reject) => {
            connect.query('select * from kategori order by id desc', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Store(Data){
        return new Promise((resolve, reject) =>{
            connect.query('insert into kategori set ? ', Data, function(err, result){
                if(err){
                    reject(err)
                    console.log(err)
                } else {
                    resolve(result);
                }
            })
        })
    }

    static async getId(id){
        return new Promise((resolve, reject) => {
            connect.query('select * from kategori where id = ?', id, function(err, rows){
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async Update(id, Data){
        return new Promise((resolve, reject) => {
        connect.query('update kategori set ? where id = '+ id, Data, function(err, result){
            if(err){
                reject(err)
            } else {
                resolve(result)
            }
            
        })
    })
    }

    static async Delete(id){
        return new Promise((resolve, reject) => {

            connect.query('delete from kategori where id = ?', id, function(err, result){
                if(err){
                    reject(err)
                } else {
                    resolve(result)
                }
                
            })
        })
    }

}

module.exports = model_kategori;