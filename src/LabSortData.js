
//elements: (if multiple allotropes needed, add as addition element in main list?)
// 0: symbol
// 1: name
// 2: appearance
// 3: mp in K
// 4: bp in K
// 5: hardness (Mohs scale)
// 6: density
// 7: magnetic??
export const LabSortCompounds = {
    H: ['H', 'hydrogen', 'gas cylinder', 14, 20,false,false],
        He: ['He', "helium",'gas cylinder', 0, 4,false,false],
        Li: ['Li',"lithium", 'soft metal stored in oil', 454,false,0.6,0.535],
        Be: ['Be',"beryllium", 'light, brittle gray metal', 1560,false,5.5,1.848],
        B: ['B',"boron", 'hard, black solid', 2348,false,9.3,2.46],
        C: ['C', "carbon", 'black powder', 3823,false,0.5, 2.26],
        N: ['N', "nitrogen",'gas cylinder', 63, 77,false,false],
        O: ['O', "oxygen",'gas cylinder', 55, 90,false,false],
        F: ['F', "fluorine",'gas cylinder', 54, 85,false,false],
        Ne: ['Ne',"neon",'gas cylinder', 25, 27,false,false],
        Na: ['Na', 'sodium','soft metal stored in oil', 371,false,0.5, 0.968],
        Mg: ['Mg', 'magnesium', 'light silver metal', 923,false,2.5, 1.738],
        Al: ['Al', 'aluminum', 'light silver metal', 933,false,2.75, 2.7],
        Si: ['Si',"silicon", 'hard, shiny blue-gray solid', 1687,false,6.5,2.33],
        P: ['P',"phosphorus", 'waxy light yellow solid', 317, 554, "Don't test this, it spontaneously combusts", 1.823],
        S: ['S', 'sulfur', 'yellow powder', 388, 718, 2, 1.96],
        Cl: ['Cl','chlorine','gas cylinder', 172, 239,false,false],
        Ar: ['Ar', 'argon','gas cylinder', 84, 87,false,false],
        K: ['K', 'potassium','soft metal stored in oil', 337,false,0.4, 0.856],
        Ca: ['Ca', 'calcium', 'soft silvery metal', 1115,false,1.75, 1.55],
        Ti: ['Ti', 'titanium', 'hard, light, shiny metal', 1941,false,6, 4.507],
        Cr: ['Cr', 'chromium', 'shiny silver metal', 2180,false,8.5, 7.14],
        Mn: ['Mn', 'manganese', 'silver-gray metal', 1519,false,6, 7.47],
        Fe: ['Fe', 'iron','silver-gray metal', 1811,false,4, 7.874],
        Co: ['Co', 'cobalt','silver-gray metal', 1768,false,5, 8.9],
        Ni: ['Ni', 'nickel','silver metal with slight tinge of gold', 1728,false,4, 8.908],
        Cu: ['Cu', 'copper', 'soft orange-red metal', 1358,false,3, 8.92],
        Zn: ['Zn', 'zinc', 'silver-gray metal', 693,false,2.5, 7.14],
        Ge: ['Ge',"germanium", 'brittle, shiny gray-white solid', 1211,false,6, 5.323],
        As: ['As','arsenic', 'metallic gray solid', 1090,false,3.5, 5.727],
        Se: ['Se','selenium', 'reddish powder', 494, 958,2,4.819],
        Br: ['Br', 'bromine', 'red-brown liquid with red vapor above it', 266, 332,false,3.12],
        Rb: ['Rb', 'rubidium','soft metal stored in oil', 312, 961, 0.3, 1.532],
        Sr: ['Sr', 'strontium', 'silver metal with slight tinge of gold stored in oil', 1050,false,1.5, 2.63],
        Ag: ['Ag', 'silver', 'shiny white metal', 1235,false,2.5, 10.49],
        Sn: ['Sn', 'tin', 'soft silver metal with slight tinge of gold', 505,false,1.5, 7.31],
        Sb: ['Sb','antimony', 'shiny silver solid', 904,false,3, 6.697],
        Te: ['Te','tellurium', 'brittle silver solid', 723,false,2.25, 6.24],
        I: ['I','iodine', 'soft metallic solid with purple vapor', 387, 457, 0.2, 4.94], //hardness 2 can't be right, estimated 0.2
        Xe: ['Xe','xenon','gas cylinder', 161, 165,false,false],
        Cs: ['Cs', 'cesium','soft metal stored in oil', 302, 944,0.2, 1.879],
        Ba: ['Ba', 'barium','soft metal stored in oil', 1000,false,1.25, 3.51],
        Pt: ['Pt', 'platinum', 'shiny white metal', 2041,false,3.5, 21.09],
        Au: ['Au', 'gold', 'soft yellow metal', 1337,false,2.5, 19.3],
        Hg: ['Hg', 'mercury', 'heavy silver liquid', 234, 630,false,13.534],
        Pb: ['Pb', 'lead', 'heavy, soft gray metal', 601,false,1.5, 11.34]
}