const SigninHandler=(req,res,knex,bcrypt)=>{
    const {email,paw}=req.body;
    // bcrypt.compare("kaunghtetmon","$2a$10$rFGCHKH41edEnQdr1uMVpu265gl5sskQ5SR2QbqlLZK.peHutenfS",function(err,res){
    //     console.log('first guess',res);
    // })
    // let status=false;
    // knex('users').select()
    // db.users.forEach(users=>{
    //     if(users.name===name && users.pw===paw){
    //         status=true;
    //         return res.json("success");
    //     }
    //     else{
    //        return res.status(400).json('error logging in')
    //     }
    // })
    // console.log(paw);
    knex.select('hash','email').from('login').where('email','=',email)
    .then(
        data=>{
            if(data.length!=[]){
                const check=bcrypt.compareSync(paw,data[0].hash);
                if(check){
                    return knex.select('*').from('users').where('email','=',email).then(users=>{
                        res.json(true);
                    })
                }
                else{
                
                    res.json(false);
                }
            }
            else {
                res.json(false);
            }
            
        }
    )
    .catch(err=>{console.log(err)})
}
module.exports={
    SigninHandler:SigninHandler
}