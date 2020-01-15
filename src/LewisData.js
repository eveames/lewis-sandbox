//element data for drawing Lewis structures
    //1: valence e-
    //2: normal min e- (octet count)
    //3: normal max e- (octet count)
    //4: normal valence (num bonds)
    //5: max valence when oxidized (num bonds)
    //6: min valence (num bonds)
export const LewisElements = {
        H: ['H', 1, 2, 2, 1,1,1],
        He: ['He', 2, 2,2,0,0,0],
        Li: ['Li',1,2,8,1,4,1],
        Be: ['Be',2,4,8,2,4,2],
        B: ['B',3,6,8,3,4,3],
        C: ['C', 4, 8, 8, 4,4,3],
        N: ['N', 5,7,8,3,4,1],
        O: ['O', 6, 8, 8,2,3,1],
        F: ['F', 7, 8,8,1,1,1],
        Ne: ['Ne',8,8,8,0,0,0],
        Si: ['Si',4,8,8,4,4,3],
        P: ['P',5,8,12,3,5,2],
        S: ['S', 6, 8, 12,2,6,1],
        Cl: ['Cl',7,8,16,1,7,1],
        Ge: ['Ge',4,8,8,4,4,3],
        As: ['As',5,8,12,3,6,2],
        Se: ['Se',6,8,12,2,6,1],
        Br: ['Br', 7,8,16,1,7,1],
        Sb: ['Sb',5,8,12,3,5,2],
        Te: ['Te',6,8,12,2,6,1],
        I: ['I',7,8,16,1,7,1],
        Xe: ['Xe',8,8,16,0,8,0]
      }

export const LewisElementsBad = {
        H: ['H', 1, 2, 4, 1,2,1],
        He: ['He', 2, 2,2,0,0,0],
        Li: ['Li',1,2,8,1,4,1],
        Be: ['Be',2,4,8,2,4,2],
        B: ['B',3,6,8,3,4,3],
        C: ['C', 4, 6, 10, 4,5,2],
        N: ['N', 5,5,10,3,5,1],
        O: ['O', 6, 6,10,2,4,1],
        F: ['F', 7, 6,10,1,3,1],
        Ne: ['Ne',8,8,8,0,0,0],
        Si: ['Si',4,6,10,4,5,2],
        P: ['P',5,6,12,3,5,2],
        S: ['S', 6, 6, 12,2,6,1],
        Cl: ['Cl',7,6,16,1,7,1],
        Ge: ['Ge',4,6,10,4,4,3],
        As: ['As',5,6,12,3,6,2],
        Se: ['Se',6,6,12,2,6,1],
        Br: ['Br', 7,6,16,1,7,1],
        Sb: ['Sb',5,6,12,3,5,2],
        Te: ['Te',6,6,12,2,6,1],
        I: ['I',7,6,16,1,7,1],
        Xe: ['Xe',8,6,16,0,8,0]
      }
  
export const LewisHomo = ['H2', 'N2', 'O2', 'F2', 'Cl2', 'Br2', 'I2', 'S2', 'P2', 'Se2']

export const LewisHetero = ['HF', 'HCl', 'HBr', 'HI', 'ClF', 'BrF', 'IF', 'BrCl', 'ICl', 'IBr', 'CO', 'NO', 'SO', 'PN', 'ClO']

export const LewisMulti = ['BH3', 'CH4', 'NH3', 'OH2', 'SiH4', 'PH3', 'SH2', 'AsH3', 'SeH2', 'BF3', 'CF4', 'SiF4', 'GeF4', 'PF3',
      'PF5', 'AsF3','AsF5', 'SbF3', 'SbF5', 'SF2', 'SF4', 'SF6', 'SeF2', 'SeF4', 'SeF6', 'TeF2', 'TeF4', 'TeF6', 'ClF3', 'BrF3',
      'BrF5', 'IF3', 'IF5', 'BeCl2', 'BCl3', 'CCl4', 'SiCl4', 'NCl3', 'PCl3', 'PCl5', 'AsCl3', 'AsCl5','SbCl3', 'SbCl5', 'SCl2',
      'SCl4', 'SeCl2', 'SeCl4', 'TeCl2', 'TeCl4', 'BrCl3', 'ICl3', 'CBr4', 'CI4','CO2', 'CS2', 'SiO2', 'NO2', 'SO2', 'SO3', 'SeO2', 'SeO3',
      'TeO2', 'TeO3', 'XeO2', 'XeO4', 'XeF2', 'XeF4', 'O3']

export const LewisTriCentral = ['COCl2', 'COF2', 'COH2', 'CHF3', 'CH2F2', 'CH3F', 'CHCl3', 'CH2Cl2', 'CH3Cl', 'CHBr3', 'CH2Br2',
      'CH3Br', 'CHI3', 'CH2I2', 'CH3I', 'CSO', 'POCl3', 'POF3', 'XeOF2', 'XeOF4', 'CHN']
export const LewisIons = ['BF4-1', 'PF6-1', 'AsF6-1', 'SbF6-1','CO3-2', 'NO2-1', 'NO3-1', 'PO4-3', 'AsO4-3','SbO4-3', 'SO3-2', 'SO4-2',
        'SeO4-2', 'TeO4-2', 'ClO-1', 'ClO2-1', 'ClO3-1', 'ClO4-1', 'BrO-1', 'BrO2-1', 'BrO3-1', 'BrO4-1', 'IO-1', 'IO2-1', 'IO3-1',
        'IO4-1', 'CN-1', 'NH4+1', 'CNS-1', 'CNO-1', 'S2O3-2', 'NO2+1', 'OH3+1'
      ]