const PatternsService = {
    
    getAllPatterns(db){
        return db('polyperc_patterns')
                .select('*')
    },
    getPatternById(db, id){
        return db('polyperc_patterns')
                .select('*')
                .where('id',id)
                .first()
    },
    //create new pattern
    insertPattern(db, newPattern){
        return db('polyperc_patterns')
                .insert(newPattern)
                .returning('*')
                .then(rows => {
                    return rows[0]
                })
    },
    //replace pattern by id
    updatePattern(db, id, newData){
        return db('polyperc_patterns')
                .where({ id })
                .update(newData)
    },
    deletePattern(db, id){
        return db('polyperc_patterns')
                .where({id})
                .delete()
    }
}
module.exports = PatternsService