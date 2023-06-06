const HandleRegister=(req,res,knex,bcrypt)=>{
    const {id,name,email,paw}=req.body;
    const hash=bcrypt.hashSync(paw);
    knex.transaction(trx=>{
        trx.insert({
            email:email,
            hash:hash
        }).into('login')
        .then(m=>{
            trx('users').returning('*').insert({
                name:name,
                email:email,
                joined:new Date()
            }).then(response=>{
                return res.json("success")
            }).catch(err=>{
                res.json("unable to register");
            });
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>{
        console.log(err);
        res.json("Unable to register")
    })

    
    // bcrypt.hash("kaunghtetmon",null,null,function(err,hash){
    //     console.log(hash);
    // })
    // db.users.push({
    //     id:id,
    //     name:name,
    //     entries:entries,
    //     pw:paw
    // });
    // knex.transaction(function(trx) {
    //     knex('users').returning('*')
    //       .transacting(trx)
    //       .insert({name:name,
    //              email:email,
    //              joined:new Date()})
    //       .then(
    //         response=>{
    //             return res.json("success")
    //       })
    //       .catch(err =>{
    //         console.log(err);
    //         trx.rollback();
    //       });
    //   });
    
    
}

module.exports={
    HandleRegister:HandleRegister
};