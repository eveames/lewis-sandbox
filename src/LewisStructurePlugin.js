import _ from "lodash";
//import store from '../vuex/store';

export default {
  install(Vue) {
    Vue.parseFormulaForStructure = function(formula, elements) {
      let atomFinder = /([A-Z][a-z]*)(\d*)/g
      let chargeFinder = /([+|-]\d*)$/
      let tempArray = [];
      let structure = [];
      let numE = 0
      let octetTotalMax = 0
      let octetTotalMin = 0
      let extraEToAdd = 0
      let centralNotOrg = 0 //0 for org, 1 for central
      //detect whether it is central atom structure or "organic" structure
      console.log("formula is " + formula)
      let matchArray = [...formula.matchAll(atomFinder)];
      //for now, use org unless first atom in formula can expand octet
      //console.log("matchArray is " + matchArray)
      //console.log(elements[matchArray[0][1]])
      if (elements[matchArray[0][1]][3] > 8) {centralNotOrg = 1}
      let chargeArray = chargeFinder.exec(formula)
      //console.log(chargeArray)
      let charge = 0
      if (chargeArray) {
        //console.log(Number(chargeArray[0]))
        charge = Number(chargeArray[0])
        centralNotOrg = 1
      }
      console.log("centralNotOrg is " + centralNotOrg)

      while((tempArray = atomFinder.exec(formula)) !== null) {
        //console.log("tempArray is " + tempArray)
        //console.log("formula is " + formula)
        if (tempArray[2] === '') tempArray[2] = 1
        for (let i = 0; i < Number(tempArray[2]); i++) {
          //0: index
          //1: num unbondedE
          //2: symbol
          //3: connections (array: [[index1, bond order1], [index2...,BO2],...)
          //4: is loop
          //5: numUnpairedE
          //6: num bonds
          //7: formal charge
          //8: satisfied
          let atom = [0, 0, tempArray[1], [], 0, 0, 0, 0, 0]
          structure.push(atom)
          //console.log(elements[tempArray[1]][1])
          numE += elements[tempArray[1]][1]
          octetTotalMin += elements[tempArray[1]][2]
          octetTotalMax += elements[tempArray[1]][3]
          if (elements[tempArray[1]][2] === 7) extraEToAdd++
        }
      }
      console.log('in parse structure is ', structure)
      numE -= charge
      if (numE%2 === 0) octetTotalMin += extraEToAdd
      return {structure: structure, charge: charge, numE: numE, octetTotalMax: octetTotalMax, octetTotalMin: octetTotalMin};
    }
  
    
    //expects central atom first; diatomics ok; chains and rings not ok
    Vue.generalLewisStructure = function(formula, elements, maxBonds, alterationInstructions, maxErrors) {
      function checkConnection(struc, a, b) {
        let j = struc[b][3].findIndex((element) => {
          return element[0] === a
        })
        let k = struc[a][3].findIndex((element) => {
          return element[0] === b
        })
        if (j < 0 || k < 0) return false
        else return [j,k]
        }
      // returns false if ok, returns array with info about which checks failed if bad
      function checkAtom(struc, a, elements, numE) {
        // check octet and sensible number of bonds
        let trouble = [0,0,0,0]
        let totalE = struc[a][1] + 2*struc[a][6]
        let bonds = struc[a][6]
        let element = elements[struc[a][2]]
        let minE = element[2]
        if (minE === 7 && numE%2 === 0) minE = 8
        if (totalE > element[3]) trouble[0] = 1
        if (totalE < minE) trouble[1] = 1
        if (bonds < element[6]) trouble[2] = 1
        if (bonds > element[5]) trouble[3] = 1
        if (trouble == [0,0,0,0]) return false
        else return trouble
      }
      //add bond between indexes a, b
      function addBond(struc, a, b, elements, moveE) {
        console.log('in addBond, a, b: ', a, b)
        let jk = checkConnection(struc, a, b)
        if (!jk) return false
        //check number of bonds:
        if (struc[a][3][jk[1]][1] === 3 && struc[b][3][jk[0]][1] === 3) {
          console.log("tried to add bond between ", a, b, "but already triple")
          return false
        }
        if (moveE) struc[a][1] -= 2
        struc[a][3][jk[1]][1]++
        struc[a][6]++
        struc[a][7] = elements[struc[a][2]][1] - struc[a][1] - struc[a][6]
        struc[b][3][jk[0]][1]++
        struc[b][6]++
        struc[b][7] = elements[struc[b][2]][1] - struc[b][1] - struc[b][6]
        return true;
      }

      function removeMultipleBond(struc, a, b, elements) {
        // check at least double bond now
        let jk = checkConnection(struc, a, b)
        if (!jk) return false
        if (struc[a][3][jk[1]][1] === 1 && struc[b][3][jk[0]][1] === 1) {
          console.log("tried to remove bond between ", a, b, "but already single")
          return false
        }
        struc[a][1] += 2
        struc[a][3][jk[1]][1]--
        struc[a][6]--
        struc[a][7] = elements[struc[a][2]][1] - struc[a][1] - struc[a][6]
        struc[b][3][jk[0]][1]--
        struc[b][6]--
        struc[b][7] = elements[struc[b][2]][1] - struc[b][1] - struc[b][6]
        return true
      }

      function connectAtoms(struc, a, b, atomsWantingBonds, elements) {
        let jk = checkConnection(struc, a, b)
        if (jk) return 1
        struc[a][0] = i
        struc[a][6] = 1
        if (1 < elements[struc[a][2]][4]) atomsWantingBonds.push(a)
        struc[a][3].push([b,1])
        struc[b][3].push([a,1])
        struc[b][6] += 1
        struc[a][7] = elements[struc[a][2]][1] - struc[a][1] - struc[a][6]
        struc[b][7] = elements[struc[b][2]][1] - struc[b][1] - struc[b][6]
      }

      let strucObj = Vue.parseFormulaForStructure(formula, elements)
      let struc = strucObj.structure
      let charge = strucObj.charge
      let numE = strucObj.numE
      let altIns = alterationInstructions

      let errors = [0,0,0,0,0,0,0,0,0,0,0,0]

      //check and if needed alter numE
      if (altIns && altIns[8] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
        if (altIns[8] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[8]/100) {
          //alter numE to be wrong
          if (charge) numE += charge
          else if (numE%2 !== 0) {
            if (_.random() > 0.5) numE += 1
            else numE -= 1
          }
          else if (_.random() > 0.5) numE += 2
          else numE -= 2
          errors[8] = 1
        }
      }

      let maxBondsForOctet = _.floor((strucObj.octetTotalMax - numE)/2)
      let minBondsForOctet = _.ceil((strucObj.octetTotalMin - numE)/2)
      console.log("maxBondsForOctet, minBondsForOctet", maxBondsForOctet, minBondsForOctet)
      let numAtoms = struc.length
      let numBonds = 0
      let maxNewBondsToCentral = 0

      // set up connections; this part needs work to make connectivity general
      //each outside atom has one bond to central only
      let unusedE = numE
      let eToAdd = 0
      let atomsWantingBonds = []
      //let atomsWantingOctet = []
      //let tryNewConnectivity = 0
      let j = 0
      let i = 1
      let element = []
      for(i = 1; i < numAtoms; i++) {
        connectAtoms(struc, i, 0, atomsWantingBonds, elements)
        unusedE -= 2
        numBonds++
      }
      console.log("unusedE: ", unusedE)
      //check central element
      element = elements[struc[0][2]]
      maxNewBondsToCentral = element[5] - struc[0][6]
      if (struc[0][6] < element[6]) {
        console.log('central atom needs bonds')
        //atomsWantingBonds.push(0)
      }
      if (struc[0][6] > element[5]) {
        console.log('central atom has too many bonds already, need different structure')
        //tryNewConnectivity = 1
      }

      if (altIns) {
        // multiple bond to H
        if (/H/.test(formula) && unusedE >= 2 && (maxNewBondsToCentral > 0 || struc[0][2] === 'H') && altIns[2] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[2] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[2]/100) {
            for (i = 0; i < numAtoms; i++ ) {
              if (numBonds < minBondsForOctet) {
                if (_.reduce(errors, (sum, n) => sum + n, 0) + 1 >= maxErrors) break
                else errors[7] = 1
              }
              if (struc[i][2] === 'H') {
                if (i === 0) addBond(struc, i, 1, elements, false)
                else addBond(struc, struc[i][3][0][0], i, elements, false)
                errors[2] = 1
                unusedE -= 2
                maxNewBondsToCentral--
                if (maxNewBondsToCentral === 0) break
                if (unusedE < 2) break
                if (_.random() > 0.5) break
              }
            }
          }
        }
      }

      // add multiple bonds
      let multBonds = []
      if (numBonds < minBondsForOctet) {
        console.log('adding more bonds')
        //first check if central atom can have more bonds
        let newBondsNeeded = minBondsForOctet - numBonds
        if (newBondsNeeded > maxNewBondsToCentral) {
          console.log('need too many new bonds to central atom')
          //tryNewConnectivity = 1
        }
        while (newBondsNeeded > 0) {
          console.log("before adding bond unusedE: ", unusedE)
          i = atomsWantingBonds.shift()
          addBond(struc, i, 0, elements, false)
          multBonds.push([0,i])
          element = elements[struc[i][2]]
          if (struc[i][6] < element[4]) atomsWantingBonds.push(i)
          else if (struc[i][6] < element[5] && newBondsNeeded > atomsWantingBonds.length) {
            atomsWantingBonds.push(i)
          }
          unusedE -= 2
          console.log("after adding bond unusedE: ", unusedE)
          console.log("bonds to central: ", struc[0][6])
          newBondsNeeded -= 1
        }
      }
      console.log("unusedE: ", unusedE)
      let happyAtoms = 0

      j = 1
      while (unusedE > 0) {
        console.log('about to add LP to index: ', j)
        console.log('happyAtoms: ', happyAtoms)
        console.log('unusedE: ', unusedE)
        console.log(struc[j][1], struc[j][6])
        element = elements[struc[j][2]]
        if (element[2]%2 !== 0 && numE%2 === 0) eToAdd = element[2] - struc[j][1] - struc[j][6]*2 + 1
        else if (happyAtoms >= numAtoms - 1 && unusedE > 0) {
          eToAdd = element[3] - (struc[j][1] + struc[j][6]*2)
        }
        else eToAdd = element[2] - struc[j][1] - struc[j][6]*2
        if (eToAdd > unusedE) eToAdd = unusedE
        if (eToAdd < 0) eToAdd = 0
        else happyAtoms++
        struc[j][1] += eToAdd
        if (struc[j][1]%2 !== 0) struc[j][5] = 1
        struc[j][7] = element[1] - struc[j][1] - struc[j][6]
        struc[j][8] = 1
        if (struc[j][6] > element[5] || struc[j][6] < element[6]) console.log('bad number of bonds for index: ', j)
        console.log('eToAdd: ', eToAdd)
        unusedE -= eToAdd
        j++
        j = j%numAtoms
        console.log('unusedE: ', unusedE)
      }

      //check for formal charges next to each other
      // 0: central atom FC
      //1: number of outer atoms with neg fc
      //2: number of outer atoms with pos fc
      let formalChargeArray = [0, 0, 0]
      let periLP = []
      let extraRadicals = []
      for (i = 0; i < numAtoms; i++) {
        if (i === 0) formalChargeArray[0] = struc[i][7]
        else if (struc[i][7] < 0) formalChargeArray[1]++
        else if (struc[i][7] > 0) formalChargeArray[2]++
        if (i !== 0 && struc[i][1] > 1) periLP.push([i,struc[i][1]])
        if (struc[i][6] + struc[i][1]/2 < 4 && struc[i][1] >= 2) extraRadicals.push(i)
      }
      element = elements[struc[0][2]]
      maxNewBondsToCentral = _.floor(element[3]/2 - struc[0][1]/2 - struc[0][6])
      // if + charge on central and maxBonds, add bonds until central is neutral if possible
      if (formalChargeArray[0] > 0 && maxBonds) {
        while (struc[0][7] > 0 && maxNewBondsToCentral > 0) {
          i = struc.reduce((iMin, x, i, arr) => x[7] < arr[iMin][7] ? i : iMin, 0);
          console.log('adding bond to element ', i)
          addBond(struc,i,0, elements, true)
          multBonds.push([0,i])
          maxNewBondsToCentral--
        }
      }
      if (formalChargeArray[0] < 0 && formalChargeArray[1] > 0) {
        //neg charges on both, remove a double bond, unless we want this error
        //added break where {} was empty for if below; may need fixing
        if (!(altIns && altIns[10] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors && (altIns[10] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[10]/100))) {
            for (i = 1; i < numAtoms; i++) {
              if (struc[i][6] > 1 && struc[i][7] >= 0) {
                console.log('moving bond on element ', i)
                removeMultipleBond(struc, i, 0, elements, true)
                maxNewBondsToCentral++
                break
              }
            }
          }
      }
      else if (formalChargeArray[0] > 0 && formalChargeArray[2] > 0) {
        //pos charges on both, ??
        console.log('positive charges on both central atom and an outside atom, yikes!')
      }

      if (altIns) {
        //remove lp on central
        if (struc[0][1] > 0 && altIns[0] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[0] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[0]/100) {
            let numToRemove = _.random(1,_.ceil(struc[0][1]/2))*2
            if (struc[0][1]%2 !== 0) numToRemove -= 1 + _.random()
            struc[0][1] -= numToRemove
            errors[0] = 1
            errors[8] = 1
          }
        }
        //remove peripheral lp
        if (periLP.length > 0 && altIns[1] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[1] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[1]/100) {
            for (i = 0; i < periLP.length; i++ ) {
              struc[periLP[i][0]][1] -= 2
              if (_.random(0,1+i) < 1) break
            }
            errors[1] = 1
            errors[8] = 1
          }
        }

        // second period atom above octet
        if (/[BCNOF](?![a-z])/.test(formula) && altIns[3] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[3] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[3]/100) {
            // look for lp on atom bonded to second period with octet, when found add bond w/ moveE
            //look for second period central
            if (/[BCNOF](?![a-z])/.test(struc[0][2]) && struc[0][1] + struc[0][6]*2 >= 7) {
              console.log('in BCNOF if 1')
              let k = _.random(0, periLP.length -1)
              let i = 0
              while (i < periLP.length)
                if (struc[periLP[k][0]][1] >= 2)  {
                  console.log('in BCNOF if 1, while if')
                  addBond(struc, periLP[k][0], 0, elements, true)
                  errors[3] = 1
                  break
                }
                else {
                  k++
                  k = k%periLP.length
                  i++
              }
            }
            // find second period peripheral atom
            else if (struc[0][1] >= 2) {
              console.log('in BCNOF else if 2')
              for (i = 1; i < numAtoms; i++) {
                console.log('in BCNOF for 2')
                if (/[BCNOF](?![a-z])/.test(struc[i][2])) {
                  console.log('in BCNOF if 2')
                }
                 if (struc[i][1] + struc[i][6]*2 >= 7) {
                  console.log('in BCNOF if 2 octet')
                  addBond(struc, 0, i, elements, true)
                  errors[3] = 1
                  break
                }
              }
            }
          }
        }

        //extra radicals
        if (extraRadicals.length > 0 && altIns[4] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[4] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[4]/100) {
            let k = _.random(0, extraRadicals.length -1)
            struc[k][5] =+ 2
            errors[4] = 1
          }
        }

        // no formal charges
        if (_.reduce(formalChargeArray, (sum, n) => sum + n, 0) > 0 && altIns[5] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[5] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[5]/100) {
            for (i = 0; i < numAtoms; i++) {
              struc[0][7] = 0
            }
            errors[5] = 1
          }
        }

        // wrong formal charges
        if (altIns[6] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
          if (altIns[6] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[6]/100) {
            let change = 0
            for (i = 0; i < numAtoms; i++) {
              change = _.random(-2, 2)
              struc[0][7] += change
              if (change !== 0) {
                errors[6] = 1
                if (_.random() > 0.5) break
             }
          }
        }
      }

      // atom without octet
      if (!(maxBonds) && multBonds.length > 0 && altIns[7] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
        if (altIns[7] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[7]/100) {
          let k = _.random(0, multBonds.length -1)
          if (_.random() > 0.5) removeMultipleBond(struc, 0, multBonds[k][1], elements)
          else removeMultipleBond(struc, multBonds[k][1], 0, elements)
          errors[7] = 1
        }
      }

    // multiple bond split into radicals
    if (multBonds.length > 0 && altIns[9] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
      if (altIns[9] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[9]/100) {
        for (i = 0; i < multBonds.length; i++) {
          let k = _.random(0, multBonds.length -1)
          let success = removeMultipleBond(struc, 0, multBonds[k][1], elements)
          if (success) {
            struc[0][1] -= 1
            struc[0][5] += 1
            struc[multBonds[k][1]][1] += 1
            struc[multBonds[k][1]][5] += 1
            errors[9] = 1
            let checkk = checkAtom(struc, k, elements, numE)
            let check0 = checkAtom(struc, 0, elements, numE)
            if (checkk) {
              if (checkk[1] === 1) errors[7] = 1
            }
            if (check0) {
              if (check0[1] === 1) errors[7] = 1
            }
            break
          }
          else {
            k++
            k = k%multBonds.length
            i++
          }
        }
      }
    }

    // double bond to F
    if (/[^H]F/.test(formula) && maxNewBondsToCentral > 0 && altIns[11] !== -2 && _.reduce(errors, (sum, n) => sum + n, 0) < maxErrors) {
      if (altIns[11] === -1 || _.random(0,1,true) < 0.05 + maxErrors/100 + altIns[11]/100) {
        // find F
        for (i = 1; i < numAtoms.length; i++) {
          if (/[F]/.test(struc[i][2])) {
            addBond(struc, i, 0, elements, true)
            errors[11] = 1
            let check0 = checkAtom(struc, 0, elements, numE)
            if (check0) {
              if (check0[1] === 1) errors[7] = 1
            }
            if (_.random() > 0.5) break
          }
        }
      }
    }
  }
  if (_.reduce(errors, (sum, n) => sum + n, 0) > 0) {
    return {structure: struc, answer: 'n', errors: errors}
  }
  else return {structure: struc, answer: 'y', errors: false, org: false};
}
}
  }
