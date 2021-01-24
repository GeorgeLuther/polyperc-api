const PatternsService = {
    
    getAllPatterns(db){
        return db('polyperc_patterns')
                .select('*')
    }
}
module.exports = PatternsService