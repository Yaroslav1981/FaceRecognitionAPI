const handleSingin =  (req, res, knex, bcrypt)=>{
    const {email, password} = req.body;
    if( !email || !password ){
        return res.status(400).json({status:400, err: err});
    }
   knex.select('email','hash').from('login').where('email', '=', email)
   .then(data=>{
    //console.log(data[0])
    
    const isPasswordCorrect = bcrypt.compareSync(password, data[0].hash);
    if(isPasswordCorrect){
        console.log(data[0]);
        
        return knex.select("*").from('users').where('email', '=',email)
            .then(user=>res.json({status:200, user:user[0]}))
            .catch(err => res.status(400).json({status:400, err: err}));
        
    };
    }).catch(err => res.status(400).json({status:400, err: err}));
    //return res.json({status: 404, comment:"There arent any youser"})
}
exports.handleSingin =handleSingin;