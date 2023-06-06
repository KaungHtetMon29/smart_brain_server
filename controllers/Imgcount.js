const Imgcounter =(req,res)=>{
    const {id}= req.body;
    let found=false;
    knex('users').where('id','=',id)
    .increment('entries',1).returning('entries').then(entries=>{
       res.json(entries);
    })
    .catch(err=>{
       res.json('error');
    })
   //  db.users.forEach(users=>{
   //     if(users.name===name){
   //         found=true;
   //         users.entries++;
   //         return res.json(users.entries);
   //     }
   //  })
   //  if(!found){
   //     res.json('errrr');
   // }
    
}

module.exports={
    Imgcounter:Imgcounter
}