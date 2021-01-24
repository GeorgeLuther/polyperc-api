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
    original_pattern: pattern.original_pattern
});
PatternsRouter
    .route('/')
    .get((req, res, next)=>{
        PatternsService.getAllPatterns(req.app.get('db'))
            .then(patterns=>
                {res.json(patterns.map(serializePattern))
            }).catch(next)
    })
module.exports = PatternsRouter