
  const handleRegister = (req, res, knex, bcrypt)=>{

    const {email, password,name} = req.body;
    const hash = bcrypt.hashSync(password, 10)
    if( !email || !password || !name){
        return res.status(400).json({status:400, err: err});
    }else if( knex.select("email").form('users').then(true).catch(false)){
        return res.status(400).json({status:401, err: err});
    }
    knex.transaction(trx=>{
        trx.insert(
            {   hash: hash,
                email: email
            }
        )
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
                .returning('*')
                .insert(
                    {   name: name,
                        email: loginEmail[0].email,
                        joined: new Date, 
                    }
                ).then(user=>{
                res.json({status:200,user: user[0]})
                })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json({status:400, err: err}));
}


exports.handleRegister = handleRegister;