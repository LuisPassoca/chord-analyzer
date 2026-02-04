const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

class chord {
    constructor(name, short, intervals) {
        this.name = name;
        this.short = short;
        this.intervals = intervals;
    }
}

const added = [
    new chord('Added Major 7th', '(addmaj7)', 11), 
    new chord('Added Minor 7th', '(addb7)', 10), 
    new chord('Added Flat 9th', '(addb9)', 1), 
    new chord('Added 9th', '(add9)', 2), 
    new chord('Added Sharp 9th', '(add#9)', 3), 
    new chord('Added 11th', '(add11)', 5),
    new chord('Added Sharp 11th', '(add#11)', 6),
    new chord('Added Flat 13th', '(addb13)', 8),
    new chord('Added 13th', '(add13)', 9),
]

const dyads = [
    new chord('Perfect 5th', '5', [0, 7]),
    new chord('Perfect 4th', 'P4', [0, 5]),
    new chord('Minor 2nd', 'm2', [0, 1]),
    new chord('Major 2nd', 'M2', [0, 2]),
    new chord('Minor 3rd', 'm3', [0, 3]),
    new chord('Major 3rd', 'M3', [0, 4]),
    new chord('Tritone', 'TT', [0, 6]),
    new chord('Minor 6th', 'm6', [0, 8]),
    new chord('Major 6th', 'M6', [0, 9]),
    new chord('Minor 7th', 'm7', [0, 10]),
    new chord('Major 7th', 'M7', [0, 11]),
]

const triads = [
    new chord('Major', 'maj', [0, 4, 7]),
    new chord('Minor', 'min', [0, 3, 7]),
    new chord('Diminished', 'dim', [0, 3, 6]),
    new chord('Augmented', 'aug', [0, 4, 8]),
    new chord('Suspended 2nd', 'sus2', [0, 2, 7]),
    new chord('Suspended 4th', 'sus4', [0, 5, 7]),

    //new chord('Quartal', 'Q4', [0, 5, 10]),
    //new chord('Quintal', 'Q5', [0, 2, 7]),
]

const tetrads = [
    new chord('Major 7th', 'maj7', [0, 4, 7, 11]),
    new chord('Minor 7th', 'min7', [0, 3, 7, 10]),
    new chord('Dominant 7th', '7', [0, 4, 7, 10]),
    new chord('Half Diminished 7th', 'm7b5', [0, 3, 6, 10]),
    new chord('Diminished 7th', 'dim7', [0, 3, 6, 9]),
    new chord('Minor Major 7th', 'min(maj7)', [0, 3, 7, 11]),
    new chord('Dominant 7th Flat 5', '7b5', [0, 4, 6, 10]),
    new chord('Dominant 7th Sharp 5', '7#5', [0, 4, 8, 10]),
    new chord('Dominant 7th Suspended 4th', '7sus4', [0, 5, 7, 10]),

    //new chord('Augmented 7th', 'aug7', [0, 4, 8, 10]),
    //new chord('Quartal', 'Q4', [0, 3, 5, 10]),
    //new chord('Quintal', 'Q5', [0, 2, 7, 9]),
]

const pentads = [
    new chord('Dominant 9th', '9', [0, 2, 4, 7, 10]),
    new chord('Major 9th', 'maj9', [0, 2, 4, 7, 11]),
    new chord('Minor 9th', 'min9', [0, 2, 3, 7, 10]),
]

const heptads = [
    new chord('Dominant 11th', '11', [0, 2, 4, 5, 7, 10]),
    new chord('Major 11th', 'maj11', [0, 2, 4, 5, 7, 11]),
    new chord('Minor 11th', 'min11', [0, 2, 3, 5, 7, 10]),
]

const hexads = [
    new chord('Dominant 13th', '13', [0, 2, 4, 5, 7, 9, 10]),
    new chord('Major 13th', 'maj13', [0, 2, 4, 5, 7, 9, 11]),
    new chord('Minor 13th', 'min13', [0, 2, 3, 5, 7, 9, 10]),
]

const knownChords = [
    dyads, triads, tetrads, pentads, heptads, hexads
]

function getAbsolutePosition(chord) {
    const absPos = [];
    chord.forEach(element => absPos.push(notes.indexOf(element)));
    return absPos;
}

function getInversions(chord) {
    const inversions = [];

    for (let i = 0; i < chord.length; i++) {
        const inversion = [];
        for (let j = i; j < chord.length + i; j++) {
            const index = j % chord.length;
            inversion.push(chord[index]);
        }
        inversions.push(inversion);
    }
    
    return inversions;
}

function getIntervals(inversions) {
    const intervals = []

    for (let i = 0; i < inversions.length; i++) {
        const rootNote = inversions[i][0];
        let interval = {root: rootNote, intervals: []};

        for (let j = 0; j < inversions[i].length; j ++) {
            if (inversions[i][j] < rootNote) {inversions[i][j] += 12}
            interval.intervals.push(inversions[i][j] - rootNote)
        }
        interval.intervals.sort((a, b) => (a - b))
        intervals.push(interval)
    }

    return intervals
}

function searchChords(intervals) {
    const candidates = [];
    const noteNumber = intervals.length - 2;

    if (noteNumber < knownChords.length) {
        for (const interval of intervals) {
            for (const chord of knownChords[noteNumber]) {
                if (JSON.stringify(interval.intervals) == JSON.stringify(chord.intervals)) {
                    candidates.push({chordRoot: notes[intervals[0].root], inversionRoot: notes[interval.root], chordInfo: {...chord}})
                }
            }
        }
    }

    if (candidates.length == 0) {
        for (const interval of intervals) {
            const candidate = buildCustomChord(interval, intervals[0].root);
            if (candidate != undefined) {candidates.push(candidate)};
        }
        candidates.sort((a, b) => (a.additions - b.additions))
    }
    return candidates;
}

function buildCustomChord(interval, root) {
    const foundChord = findClosestChord(interval);
    if (foundChord === undefined) {return undefined}

    let baseChord = {chordRoot: notes[root], inversionRoot:  notes[interval.root], chordInfo: {... knownChords[foundChord.chordType][foundChord.chordIndex]}}
    const elementsToSearch = interval.intervals.filter(element => (!baseChord.chordInfo.intervals.includes(element)));
    let numberOfElements = elementsToSearch.length;
    baseChord.additions = numberOfElements;

    baseChord.chordInfo.name += ' -';
    for (const add of added) {
        if (elementsToSearch.includes(add.intervals)) {
            numberOfElements -= 1;
            baseChord.chordInfo.name += ' ' + add.name;
            baseChord.chordInfo.short += add.short;
        }
    }
    
    if (numberOfElements != 0) {return undefined}
    return baseChord;
}

function findClosestChord(interval) {
    for (let i = knownChords.length - 1; i >= 0; i--) {
        for (let j = 0; j < knownChords[i].length; j++) {
            const bestMatch = knownChords[i][j].intervals.every(element => interval.intervals.includes(element))
            if (bestMatch) {return {chordType: i, chordIndex: j, root: interval.root}}
        }
    }
    
    return undefined;
}

function displayMatches(candidates) {
    console.log('Best match:')
    console.log(candidates[0].inversionRoot + 
        candidates[0].chordInfo.short + 
        (candidates[0].inversionRoot != candidates[0].chordRoot ? ('/' + candidates[0].chordRoot) : ''))
        console.log(
        '> ' + candidates[0].inversionRoot + ' ' +
        candidates[0].chordInfo.name)

    if (candidates.length > 1) {
        const remainingCandidates = candidates.slice(1)
        console.log('')
        console.log('Other possible matches:')

        for (const candidate of remainingCandidates) {
             console.log(candidate.inversionRoot + 
            candidate.chordInfo.short + 
            (candidate.inversionRoot != candidate.chordRoot ? ('/' + candidate.chordRoot) : '') )
        }
    }
}

function findChord(chordInput) {
    const filteredChord = [...new Set(chordInput)];
    if (filteredChord.length == 1) {console.log('Please input at least 2 different notes!'); return}
    const chord = getAbsolutePosition(filteredChord);
    const inversions = getInversions(chord);
    const intervals = getIntervals(inversions);
    const candidates = searchChords(intervals);

    if (candidates.length == 0) {console.log('Unable to find a match!'); return}

    displayMatches(candidates)
    //For exported function usage:
    //return candidates;
}

if (require.main === module) {
    const userInput = process.argv.slice(2)
    findChord(userInput)
}

//Function usage with Node:
//node chordAnalyzer.js (notes)
//e.g.: node chordAnalyzer.js C E G
//You can input as many notes as you want, but duplicates are not taken into consideration
//Flats are currently unavailable, so please use only sharp notes

//If you wish to use this script as an export function, you can tweak the findChord() function.
//Remove the displayMatches() function and allow it to return the chord candidates
//The input in this case must be an array containing the desired notes, e.g.: ['C', 'E', 'G']

//For exported function usage:
//export default findChord;