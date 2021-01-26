function makeTestPatternArray() {
    return [
        {
            id: 1,
            pattern_name: 'test-pattern-1',
            
            project_id: '1',
            
            date_created: '2023-01-18T16:28:32.615Z',
            date_edited: '2023-01-18T16:28:32.615Z',
        
            is_expanded: false,
        
            tempo: 120,
            ratio: '1:1',
            source: 'master',
            
            sound: 'kick.wav',
            is_muted: false,
            is_soloed: false,
            is_playing: false,
            current_beat: 0,
            volume: -20,
        
            pattern_length: 5,
            active_beats: 2,
            rotation: 0,
            is_reversed: false,
            is_opposite: false,
        
            pattern: [1,0,1,0,0],
            original_pattern: [1,0,1,0,0],
            pattern_method: 'random'
        },
        {
            id: 2,
            pattern_name: 'test-pattern-2',
            
            project_id: '1',
            
            date_created: '2023-01-18T16:28:39.615Z',
            date_edited: '2023-01-18T16:28:39.615Z',
        
            is_expanded: true,
        
            tempo: 150,
            ratio: '1:1',
            source: 'master',
            
            sound: 'hihatC.wav',
            is_muted: false,
            is_soloed: false,
            is_playing: false,
            current_beat: 0,
            volume: -20,
        
            pattern_length:3,
            active_beats: 3,
            rotation: 0,
            is_reversed: true,
            is_opposite: false,
        
            pattern: [1,0,0],
            original_pattern: [0,0,1],
            pattern_method: 'beat'
        }
    ]
}
function serializedTestPatterns(){
    return [ {
        id: 1,
        name: 'test-pattern-1',
        isExpanded: false,
        sound: 'kick.wav',
        isSoloed: false,
        isMuted: false,
        volume: -20,
        activeBeats: 2,
        patternLength: 5,
        method: 'random',
        rotation: 0,
        isReversed: false,
        isOpposite: false,
        pattern: [ 1, 0, 1, 0, 0 ],
        originalPattern: [ 1, 0, 1, 0, 0 ]
      },
      {
        id: 2,
        name: 'test-pattern-2',
        isExpanded: true,
        sound: 'hihatC.wav',
        isSoloed: false,
        isMuted: false,
        volume: -20,
        activeBeats: 3,
        patternLength: 3,
        method: 'beat',
        rotation: 0,
        isReversed: true,
        isOpposite: false,
        pattern: [ 1, 0, 0 ],
        originalPattern: [ 0, 0, 1 ]
      }
    ]
}
function makeMaliciousPattern() {
    const maliciousPattern = {
        id: 3,
        pattern_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        project_id: '1',
        date_created: '2023-01-18T16:28:32.615Z',
        date_edited: '2023-01-18T16:28:32.615Z',
        is_expanded: false,
        tempo: 120,
        ratio: '1:1',
        source: 'master',
        sound: 'kick.wav',
        is_muted: false,
        is_soloed: false,
        is_playing: false,
        current_beat: 0,
        volume: -20,
        pattern_length: 5,
        active_beats: 2,
        rotation: 0,
        is_reversed: false,
        is_opposite: false,
        pattern: [1,0,1,0,0],
        original_pattern: [1,0,1,0,0],
        pattern_method: 'random'
    }
    const expectedPattern =  {
        id: 3,
        name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        isExpanded: false,
        sound: 'kick.wav',
        isSoloed: false,
        isMuted: false,
        volume: -20,
        activeBeats: 2,
        patternLength: 5,
        method: 'random',
        rotation: 0,
        isReversed: false,
        isOpposite: false,
        pattern: [ 1, 0, 1, 0, 0 ],
        originalPattern: [ 1, 0, 1, 0, 0 ]
    }
    return {
      maliciousPattern,
      expectedPattern,
    }
  }
function cleanAllTables(db){
    return db.raw(
        'TRUNCATE polyperc_patterns, polyperc_projects, polyperc_users RESTART IDENTITY CASCADE'
    )
}
function cleanPatternsTable(db) {
    return db.raw(
        'TRUNCATE polyperc_patterns RESTART IDENTITY CASCADE'
    )
}
function seedPatternsTable(db) {
    db.into('polyperc_tables').insert(makeTestPatternArray())
}

module.exports = { makeTestPatternArray, cleanAllTables, cleanPatternsTable, seedPatternsTable, serializedTestPatterns, makeMaliciousPattern }