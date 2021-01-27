const express = require('express')
const {json}=require('express')
const path = require('path');
const xss = require('xss')
const PatternsService = require('./patterns-service')
const PatternsRouter = express.Router()
const jsonParser = express.json()

const serializePattern = pattern => ({
    id: pattern.id,
    name: xss(pattern.pattern_name),
    isExpanded: pattern.is_expanded,

    sound: xss(pattern.sound),
    isSoloed: pattern.is_soloed,
    isMuted: pattern.is_muted,
    volume: pattern.volume,

    activeBeats: pattern.active_beats,
    patternLength: pattern.pattern_length,
    method: pattern.pattern_method,
    rotation: pattern.rotation,
    isReversed: pattern.is_reversed,
    isOpposite: pattern.is_opposite,

    pattern: pattern.pattern,
    originalPattern: pattern.original_pattern
});
PatternsRouter.route('/')
    .get((req, res, next)=>{
        const { columns } = req.query
        if (columns==='id') {
            PatternsService.getAllPatternIds(req.app.get('db'))
            .then(patternIds=>{
                res.json(patternIds.map( obj => obj.id))
            }).catch(next)
        }
        else {
            PatternsService.getAllPatterns(req.app.get('db'))
            .then(patterns=>{
                res.json(patterns.map(serializePattern))
            }).catch(next)
        }
    })
    .post(jsonParser,(req,res,next)=>{
        const blankPattern = {
            pattern_name: 'Untitled',
            sound: 'kick.wav',
            volume: -20,
        
            active_beats: 0,
            pattern_length: 0,
            pattern_method: 'random',
        
            pattern: [],
            original_pattern: []
        }
        PatternsService.insertPattern(req.app.get('db'), blankPattern)
            .then(pattern =>{
                res
                    .status(201)
                    .json(serializePattern(pattern))
            })
            .catch(next)
    })

PatternsRouter.route('/:id')
    .all((req, res, next)=>{
        PatternsService.getPatternById(
            req.app.get('db'),
            req.params.id
        )
        .then(pattern=>{
            if (!pattern){
                return res.status(404).json({
                    error: {message: 'Pattern does not exist'}
                })
            }
            res.pattern = pattern
            next()
        })
        .catch(next)
    })
    .get((req, res, next)=>{
        res.json(serializePattern(res.pattern))
    })
    .delete((req, res, next)=>{
        PatternsService.deletePattern(req.app.get('db'), req.params.id)
            .then(()=>{res.status(204).end()})
            .catch(next)
    })
    .put(jsonParser,(req,res,next)=>{
        const {   
            id,
            name,
            isExpanded,
        
            sound,
            isSoloed,
            isMuted,
            volume,
        
            activeBeats,
            patternLength,
            method,
            rotation,
            isReversed,
            isOpposite,
            pattern,
            originalPattern,
        } = req.body
        const newData = {
            id: id,
            pattern_name: name,
            is_expanded: isExpanded,

            sound: sound,
            is_soloed: isSoloed,
            is_muted: isMuted,
            volume: volume,

            active_beats: activeBeats,
            pattern_length: patternLength,
            pattern_method: method,
            rotation: rotation,
            is_reversed: isReversed,
            is_opposite: isOpposite,

            pattern: pattern,
            original_pattern: originalPattern
        }
        PatternsService.updatePattern(req.app.get('db'), req.params.id, newData)
            .then(()=>{res.status(204).end()})
            .catch(next)
})
module.exports = PatternsRouter