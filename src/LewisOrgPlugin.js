import _ from "lodash";

export default {
    install(Vue) {
      Vue.parseFormulaForOrg = function(formula, elements) {
        let structure = []
        //just finds next group (either contents of () or until next chain-able atom)
        function findGroup(formula, startIndex) {
          //split formula to start looking at startIndex
          let section = formula.slice(startIndex)
          let group = ""
          let groupMultiples = 1
          let endIndex = 0
          //console.log("section is ", section)
          if (section.charAt(0) == "(") {
              console.log("in paren")
            let parenRegex = /\((\w+)\)(\d*)/
            let temp = parenRegex.exec(section)
            console.log(temp)
            group = temp[1]
            if (temp[2] !== "") {
                groupMultiples = temp[2]
            }
            endIndex = parenRegex.lastIndex + temp[0].length -1
          }
          else {
            let noParenRegex = /.+?(?=C|Si|Se|S|N|P|O|\(|$)/
            let temp = noParenRegex.exec(section)
            group = temp[0]
            //console.log(group.length)
            //console.log("group is " + group)
            endIndex = noParenRegex.lastIndex + group.length - 1
          }
          return [group, groupMultiples, startIndex , endIndex + startIndex + 1]
        }

        //adds bond of multiplicity specified between atoms with given indices, returns structure if successful and false if not
        function connectAtoms(structure, index1, index2, bondOrder) {
            //console.log("structure is ", structure)
          let bondsAvailable1 = checkAvailableValence(structure, index1)
          let bondsAvailable2 = checkAvailableValence(structure, index2)
          //console.log("bonds available: ", bondsAvailable1, bondsAvailable2)
          if (bondsAvailable1 < bondOrder || bondsAvailable2 < bondOrder) {
            return false
          }
          else {
            structure[index1][3].push([index2, bondOrder])
            structure[index2][3].push([index1, bondOrder])
            if (bondsAvailable1 - bondOrder == 0) {
                structure[index1][8] = 1
            }
            if (bondsAvailable2 - bondOrder == 0) {
                structure[index2][8] = 1
            }
            //console.log("structure length is " + structure.length)
            return structure
          }
        }

        //tries to satisfy valence of at least one atom 
        function increaseBondOrder(structure, index1, index2) {
            let bondsAvailable1 = checkAvailableValence(structure, index1)
            let bondsAvailable2 = checkAvailableValence(structure, index2)
            let bondOrderIncrease = Math.min(bondsAvailable1, bondsAvailable2)
            let i1 = _.findIndex(structure[index1][3], element => {return (element[0] == index2)})
            console.log(structure[index1][3], index2, i1)
            structure[index1][3][i1][1] += bondOrderIncrease
            let i2 = _.findIndex(structure[index2][3], element => {return (element[0] == index1)})
            structure[index2][3][i2][1] += bondOrderIncrease
            if (bondsAvailable1 == bondOrderIncrease) {
                structure[index1][8] = 1
            }
            if (bondsAvailable2 == bondOrderIncrease) {
                structure[index2][8] = 1
            }
            return structure
        }
  
        //returns preferred valence - current bonds
        function checkAvailableValence(structure, index) {
          if (structure[index][3] !== undefined && structure[index][3].length > 0) {
              //console.log(structure[index][3])
            let numBonds = structure[index][3].reduce((total, entry) => {
                //console.log(entry[1])
                return total + entry[1]
              }, 0)
            //console.log("index, numBonds ", index, numBonds)
            return structure[index][6] - numBonds
          }
          else return structure[index][6]
        }

        //adds multiple bonds where needed (connected atoms both unsatisfied)
        //make sure it handles conjugated double bonds correctly
        function addMultipleBondsAsNeeded(structure) {
            let unsatisfiedAtoms = []
            structure.forEach(element => {
                if (element[8] == 0) {
                    unsatisfiedAtoms.push(element[0])
                }
            });
            let possibleMultipleBondPairs = []
            let atomConnectionsCount = {}
            unsatisfiedAtoms.forEach(index => {
                atomConnectionsCount[index] = 0
                structure[index][3].forEach(element => {
                    if (unsatisfiedAtoms.includes(element[0]) && !possibleMultipleBondPairs.includes([index, element[0]]) && !possibleMultipleBondPairs.includes([element[0], index])) {
                        possibleMultipleBondPairs.push([index, element[0]])
                        atomConnectionsCount[index]++
                        atomConnectionsCount[element[0]]++
                    }
                });
            })
            while (possibleMultipleBondPairs.length > 0) {
                let entry = possibleMultipleBondPairs.shift()
                if (atomConnectionsCount[entry[0]] == 1 || atomConnectionsCount[entry[1]] == 1) {
                    structure = increaseBondOrder(structure, entry[0], entry[1])
                }
                else possibleMultipleBondPairs.push(entry)
            }
            return structure
        }
  
        //find number of centers in group, and build this section of structure array
        //recursive
        //returns complete structure array
        function parseGroup(groupArray, formula, structure, elements, unsatisfiedGroupCenterIndices) {
          //find number of centers in group
          //console.log("structure length is " + structure.length)
          let centerFinder = /(C|Si|Se|S|N|P|O)(\d*)/g
          let perifFinder = /([A-Z][a-z]*)(\d*)/g
          let currentCenter = centerFinder.exec(groupArray[0])
          //console.log(currentCenter)
          let curCentralElement = elements[currentCenter[1]]
          let numCenters = 1
          //console.log(groupArray[0].slice(currentCenter[0].length))
          let numPerifElements = 0
          let tempArray = []
          let perifAtomsArray = []
          let currentCenterIndices = []

          //setup group once for each copy of group
          for (let k = 0; k < groupArray[1]; k++) {
            while((tempArray = perifFinder.exec(groupArray[0].slice(currentCenter[0].length))) !== null) {
                let numPerifAtoms = 1
                if (tempArray[2] != "") {
                    numPerifAtoms = parseInt(tempArray[2])
                }
                let arrayToAdd = _.fill(Array(numPerifAtoms), tempArray[1])
                //console.log("arrayToAdd is " + arrayToAdd)
                perifAtomsArray = perifAtomsArray.concat(arrayToAdd)
                //console.log("tempArray is " +tempArray)
                numPerifElements++
              }
              //console.log("perifAtomsArray is " + perifAtomsArray)
      
              if (currentCenter[2]) {
                numCenters = currentCenter[2]
                if (numPerifElements > 1) {
                  console.log("bad formula: multicenter groups should have only one type of peripheral element")
                }
              }
      
              //0: index
                //1: num unbondedE
                //2: symbol
                //3: connections (array: [[index1, bond order1], [index2...,BO2],...)
                //4: is loop
                //5: numUnpairedE
                //6: num bonds
                //7: formal charge
                //8: satisfied
              //console.log(currentCenter)
              let curCenterIndex = 0
              let prevCenterIndex = 0
              let perifPerCenter = perifAtomsArray.length / numCenters
              let perifToAdd = 0
              for (let i = 0; i < numCenters; i++){
                curCenterIndex = structure.length
                let atomEntry = [curCenterIndex, curCentralElement[1] - curCentralElement[4], currentCenter[1], [], 0,0, curCentralElement[4], 0, 0]
                structure.push(atomEntry)
                console.log("atomEntry is ", atomEntry)
                console.log("unsatisfiedGroupCenterIndices: ", unsatisfiedGroupCenterIndices)
                // connect to previous group centers if available
                if (unsatisfiedGroupCenterIndices && unsatisfiedGroupCenterIndices.length > 0 && i == 0) {
                    console.log("found unsatisfied group to connect to, connecting atoms: ", curCenterIndex, unsatisfiedGroupCenterIndices)
                    for (let m = unsatisfiedGroupCenterIndices.length - 1; m > -1; m--){
                        structure = connectAtoms(structure, curCenterIndex, unsatisfiedGroupCenterIndices[m], 1)
                        if (structure[unsatisfiedGroupCenterIndices[m]][8] == 1) {
                            let removedIndex = unsatisfiedGroupCenterIndices.pop()
                            console.log("removed index ", removedIndex)
                        }
                    }
                    
                }
                //console.log("structure length is " + structure.length)
    
                if (i + 1 == numCenters) {
                    perifToAdd = Math.ceil(perifPerCenter)
                }
                else if (i == 0 && Math.floor(perifPerCenter)*numCenters +1 < perifPerCenter*numCenters) {
                    perifToAdd = Math.ceil(perifPerCenter)
                }
                else {
                    perifToAdd = Math.floor(perifPerCenter)
                }
                //if not first center in group, attach to prior
                //if needed, use multiple bond
                if (i > 0) {
                    let bondOrder = 1
                    let curAvailableValence = atomEntry[6] - perifToAdd
                    if (curAvailableValence >1 && i + 1 == numCenters) {
                        let prevAvailableValence = checkAvailableValence(structure, prevCenterIndex)
                        if (prevAvailableValence>= curAvailableValence) {
                            bondOrder = curAvailableValence
                            console.log("bondOrder to attach to prev center is ", bondOrder)
                        }
                    }
                    structure = connectAtoms(structure, curCenterIndex, prevCenterIndex, bondOrder)
                }
                else {
                    currentCenterIndices.push(curCenterIndex)
                    console.log("currentCenterIndices is ", currentCenterIndices)
                }
                
                console.log("perifToAdd is ", perifToAdd)
                for (let j = 0; j < perifToAdd; j++) {
                    let curElementToAdd = elements[perifAtomsArray.pop()]
                    atomEntry = [structure.length, curElementToAdd[1] - curElementToAdd[4], curElementToAdd[0], [], 0,0, curElementToAdd[4], 0, 0]
                    structure.push(atomEntry)
                    console.log("about to add perif, atomEntry is ", atomEntry)
                    structure = connectAtoms(structure, structure.length -1, curCenterIndex, atomEntry[6])
                }
                //console.log("end parseGroup structure length is " + structure.length)
                prevCenterIndex = curCenterIndex
              }
          }
          //check for more groups
          if (formula.length > groupArray[3]) {
              let nextGroup = findGroup(formula, groupArray[3])
              console.log("nextGroup is ", nextGroup)
              console.log("currentCenterIndices is ", currentCenterIndices)
              let newUnsatIndices = currentCenterIndices.filter((i) => {
                return (structure[i][8] == 0)
                })
              if (unsatisfiedGroupCenterIndices) {
                unsatisfiedGroupCenterIndices = unsatisfiedGroupCenterIndices.concat(newUnsatIndices)
              }
              else {
                  unsatisfiedGroupCenterIndices = newUnsatIndices
              }
              structure = parseGroup(nextGroup, formula, structure, elements, unsatisfiedGroupCenterIndices)
          }

          //add additional multiple bonds if needed
          console.log("all groups found, structure is ", structure)
          structure = addMultipleBondsAsNeeded(structure)

          return structure
        }
  
        
        //ID center of first group
        // use recursion
        //let centerFinder = /(C|Si|Se|S|N|P|O(\d*))[A-Z]/g
        //let center = centerFinder.exec(formula)[1]
        let firstGroup = findGroup(formula, 0)
        console.log(firstGroup)
        structure = parseGroup(firstGroup, formula, structure, elements, false)
        //console.log(structure)
  
        return {structure: structure, answer: 'y', errors: false, org: true}
  
        
    }
}
}