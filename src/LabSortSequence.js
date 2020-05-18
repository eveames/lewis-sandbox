// list of lists; each list is for a given level
// move to next list as each is mastered
// within each list, each item is an array
// array:
// 0: which component to use for this item (0 is Match)
// for Match: 
// 1: header data (which properties we are matching to, for example, appearance and formula, or name); specify with digit or string?
// 2: [keys of items in data object to include in header]
// 3: match data (which property we match to header) 
// 4: additional distractor items as match possibilities
export const LabSortSequence = [
    [
        [0, 1, ["C","Cu","Ca"], 2,],
        [0, 2, ["Cl","Cr","Cs"], 1,["C","Ca"]]
    ]
]