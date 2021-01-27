const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const {makeTestPatternArray, seedPatternsTable, serializedTestPatterns, makeMaliciousPattern} = require('./patterns.fixtures')

describe('Patterns Endpoints', function(){
    
    const { testPatterns } = makeTestPatternArray()

    let db
    before('make knex instance',()=>{
        db=knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db',db)
    })

    after('disconnect db', ()=> db.destroy())
    before('clear table', ()=> db('polyperc_patterns').truncate())
    afterEach('cleanup',()=> db('polyperc_patterns').truncate())

    describe('GET /api/patterns', () => {
        context('Given no patterns in table',()=>{
            it('responds with 200 and empty array',()=>{
                return supertest(app)
                    .get('/api/patterns')
                    .expect(200, [])
            })
            it('with query, responds with 200 and empty array',()=>{
                return supertest(app)
                    .get('/api/patterns?columns=id')
                    .expect(200, [])
            })
        })

        context('Given polyperc_patterns is seeded',()=>{
            beforeEach('insert patterns',()=>{
                return db.into('polyperc_patterns').insert(makeTestPatternArray())
            })

            it('responds with 200 and the serialized patterns array',()=>{
                return supertest(app)
                        .get('/api/patterns')
                        .expect(200, serializedTestPatterns())
            })

            it('with query, responds with 200 and an array of ids',()=>{
                return supertest(app)
                        .get('/api/patterns?columns=id')
                        .expect(200, [1,2])
            })
        })
    })
    describe('POST /api/patterns', ()=>{
        it('responds with 201 and a template pattern',()=>{
            return supertest(app)
                    .post('/api/patterns')
                    .expect(201)
        })
    })



    describe(`GET /api/patterns/:id`, () => {
        context(`Given no patterns`, () => {
          it(`responds with 404`, () => {
            const patternId = 1
            return supertest(app)
              .get(`/api/patterns/${patternId}`)
              .expect(404, { error: { message: `Pattern does not exist` } })
          })
        })
    
        context('Given there are patterns in the database', () => {
          const testPatterns = serializedTestPatterns()
    
          beforeEach('insert patterns',()=>{
            return db.into('polyperc_patterns').insert(makeTestPatternArray())
          })
    
          it('responds with 200 and the specified pattern', () => {
            const patternId = 1
            const expectedPattern = testPatterns[patternId - 1]
            return supertest(app)
              .get(`/api/patterns/${patternId}`)
              .expect(200, expectedPattern)
          })
        })
    
        context(`Given an XSS attack pattern`, () => {
          const { maliciousPattern, expectedPattern } = makeMaliciousPattern()
    
          beforeEach('insert patterns',()=>{
            return db.into('polyperc_patterns').insert([maliciousPattern])
          })
    
          it('removes XSS attack content', () => {
            return supertest(app)
              .get(`/api/patterns/${maliciousPattern.id}`)
              .expect(200)
              .expect(res => {
                expect(res.body.name).to.eql(expectedPattern.name)
                expect(res.body.volume).to.eql(expectedPattern.volume)
              })
          })
        })
    })


    describe('DELETE /api/patterns/:pattern_id',()=>{
        context(`Given no patterns in database`, () => {
            it(`responds with 404`, () => {
              const patternId = 1
              return supertest(app)
                .delete(`/api/patterns/${patternId}`)
                .expect(404, { error: { message: `Pattern does not exist` } })
            })
          })
        context('Given polyperc_patterns is seeded',()=>{
            let testArray = serializedTestPatterns()
            beforeEach('insert patterns',()=>{
                return db.into('polyperc_patterns').insert(makeTestPatternArray())
            })
            it('responds with 204 and removes the pattern', ()=>{
                const idToRemove = 1
                const expectedPatterns = testArray.filter(pattern => pattern.id !== idToRemove)
                return supertest(app)
                        .delete(`/api/patterns/${idToRemove}`)
                        .expect(204)
                        .then(res => 
                            supertest(app)
                                .get('/api/patterns')
                                .expect(expectedPatterns)
                        )
            })
        })
    })
    describe('PUT /api/patterns/:id',()=>{
        context('Given no patterns',()=>{
            it('responds with 404',()=>{
                const patternId = 1
                return supertest(app)
                        .delete(`/api/patterns/${patternId}`)
                        .expect(404, {error: {message: 'Pattern does not exist'}})
            })
        })
        context('Given polyperc_patterns is seeded',()=>{
            const textPatters = serializedTestPatterns()
            beforeEach('insert patterns', ()=>{
                return db.into('polyperc_patterns').insert(makeTestPatternArray())
            })
            
            it('responds with 204 and replaces the pattern',()=>{
                const idToReplace = 1
                const replacementPattern = {
                    id: 1,
                    name: 'test-pattern-1',
                    isExpanded: false,
                    sound: 'snare.wav',
                    isSoloed: false,
                    isMuted: false,
                    volume: -20,
                    activeBeats: 3,
                    patternLength: 6,
                    method: 'even',
                    rotation: 0,
                    isReversed: false,
                    isOpposite: false,
                    pattern: [ 1, 0, 1, 0, 1, 0 ],
                    originalPattern: [ 1, 0, 1, 0, 1, 0 ]
                }
                return supertest(app)
                        .put(`/api/patterns/${idToReplace}`)
                        .send(replacementPattern)
                        .expect(204)
                        .then(res =>
                        supertest(app)
                            .get(`/api/patterns/${idToReplace}`)
                            .expect(replacementPattern)
                        )

            })
        })
    })

})