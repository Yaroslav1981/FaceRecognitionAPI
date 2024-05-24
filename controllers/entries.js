const handleEntries = (req, res, knex)=>{
    const {id} = req.body;
    let flag = false;

    knex('users').where('id','=', +id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{res.json(entries[0].entries)})
    .catch(err=>res.json(err));
}

exports.handleEntries = handleEntries;