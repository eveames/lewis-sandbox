//import _ from "lodash";
export default {
  install: function (Vue) {

    //produces a string of given length; increasing zeros increases probability
    //that any given digit in string is zero
    Vue.bondPositioner = function(textRect, direction) {
      let bondLength = 20
      let start = [0,0]
      let end=[20,20]
      let height = textRect.height
      let width = textRect.width
      if (direction === 0) {
        start = [textRect.left - 5,textRect.centery]
        end = [start[0] - bondLength, start[1]]
      }
      if (direction === 6) {
        start = [textRect.right +5, textRect.centery]
        end = [start[0] + bondLength, start[1]]
      }
      if (direction === 3) {
        start = [textRect.centerx, textRect.top -5]
        end = [start[0], start[1]-bondLength]
      }
      if (direction === 9) {
        start = [textRect.centerx, textRect.bottom]
        end = [start[0], start[1]+bondLength]
      }
      if (direction === 1) {
        start = [textRect.left -4, textRect.centery-height/3]
        end = [start[0] - bondLength*0.866, start[1]-bondLength/2]
      }
      if (direction === 11) {
        start = [textRect.left -4, textRect.centery+height/3]
        end = [start[0] - bondLength*0.866, start[1]+bondLength/2]
      }
      if (direction === 5) {
        start = [textRect.right +3, textRect.centery-height/3]
        end = [start[0] + bondLength*0.866, start[1]-bondLength/2]
      }
      if (direction === 7) {
        start = [textRect.right+3, textRect.centery+height/3]
        end = [start[0] + bondLength*0.866, start[1]+bondLength/2]
      }
      if (direction === 2) {
        start = [textRect.centerx - width/3, textRect.top-3]
        end = [start[0] - bondLength/2, start[1]-bondLength*0.866]
      }
      if (direction === 10) {
        start = [textRect.centerx - width/3, textRect.bottom]
        end = [start[0] - bondLength/2, start[1]+bondLength*0.866]
      }
      if (direction === 4) {
        start = [textRect.centerx + width/3, textRect.top-3]
        end = [start[0]+ bondLength/2, start[1]-bondLength*0.866]
      }
      if (direction === 8) {
        start = [textRect.centerx + width/3, textRect.bottom]
        end = [start[0]+ bondLength/2, start[1]+bondLength*0.866]
      }

      return [start,end]
  }
  Vue.newAtomPositioner = function(textRect, direction) {
    let bondLength = 35;
    let end = [0,0]
    let start =[20,20]
    let height = textRect.height
    let width = textRect.width
    if (direction === 0) {
      start = [textRect.left - 5,textRect.centery]
      end = [start[0] - bondLength, start[1]]
    }
    if (direction === 6) {
      start = [textRect.right +5, textRect.centery]
      end = [start[0] + bondLength, start[1]]
    }
    if (direction === 3) {
      start = [textRect.centerx, textRect.top -5]
      end = [start[0], start[1]-bondLength]
    }
    if (direction === 9) {
      start = [textRect.centerx, textRect.bottom]
      end = [start[0], start[1]+bondLength]
    }
    if (direction === 1) {
      start = [textRect.left -4, textRect.centery-height/3]
      end = [start[0] - bondLength*0.866, start[1]-bondLength/2]
    }
    if (direction == 11) {
      start = [textRect.left -4, textRect.centery+height/3]
      end = [start[0] - bondLength*0.866, start[1]+bondLength/2]
    }
    if (direction === 5) {
      start = [textRect.right +3, textRect.centery-height/3]
      end = [start[0] + bondLength*0.866, start[1]-bondLength/2]
    }
    if (direction === 7) {
      start = [textRect.right+3, textRect.centery+height/3]
      end = [start[0] + bondLength*0.866, start[1]+bondLength/2]
    }
    if (direction === 2) {
      start = [textRect.centerx - width/3, textRect.top-3]
      end = [start[0] - bondLength/2, start[1]-bondLength*0.866]
    }
    if (direction === 10) {
      start = [textRect.centerx - width/3, textRect.bottom]
      end = [start[0] - bondLength/2, start[1]+bondLength*0.866]
    }
    if (direction == 4) {
      start = [textRect.centerx + width/3, textRect.top-3]
      end = [start[0]+ bondLength/2, start[1]-bondLength*0.866]
    }
    if (direction === 8) {
      start = [textRect.centerx + width/3, textRect.bottom]
      end = [start[0]+ bondLength/2, start[1]+bondLength*0.866]
    }
    return end
  }
  Vue.lpPositioner = function(textRect, direction, radical) {
    //console.log(textRect, direction, radical)
    let start = [0,0]
    let height = textRect.height
    let width = textRect.width
    let first, second = [0,0];
    if (direction === 0) {
      start = [textRect.left - 5,textRect.centery]
      if (radical) return start;
      else {
        first = [start[0], start[1]+4]
        second = [start[0], start[1]-4]
        return [first, second]
      }
    }
    if (direction === 6) {
      start = [textRect.right +5, textRect.centery]
      if (radical) return start;
      else {
        first = [start[0], start[1]+4]
        second = [start[0], start[1]-4]
        return [first, second]
      }
    }
    if (direction === 3) {
      start = [textRect.centerx, textRect.top -5]
      if (radical) return start;
      else {
        first = [start[0]+4, start[1]]
        second = [start[0]-4, start[1]]
        return [first, second]
      }
    }
    if (direction === 9) {
      start = [textRect.centerx, textRect.bottom]
      if (radical) return start;
      else {
        first = [start[0]+4, start[1]]
        second = [start[0]-4, start[1]]
        return [first, second]
      }
    }
    if (direction === 1) {
      start = [textRect.left -4, textRect.centery-height/3]
      if (radical) return start;
      else {
        first = [start[0]+1, start[1]-4]
        second = [start[0]-1, start[1]+4]
        return [first, second]
      }
    }
    if (direction === 11) {
      start = [textRect.left -4, textRect.centery+height/3]
      if (radical) return start;
      else {
        first = [start[0]+1, start[1]+4]
        second = [start[0]-1, start[1]-4]
        return [first, second]
      }
    }
    if (direction === 5) {
      start = [textRect.right +3, textRect.centery-height/3]
      if (radical) return start;
      else {
        first = [start[0]+1, start[1]+4]
        second = [start[0]-1, start[1]-4]
        return [first, second]
      }
    }
    if (direction === 7) {
      start = [textRect.right+3, textRect.centery+height/3]
      if (radical) return start;
      else {
        first = [start[0]+1, start[1]-4]
        second = [start[0]-1, start[1]+4]
        return [first, second]
      }
    }
    if (direction === 2) {
      start = [textRect.centerx - width/2, textRect.top-3]
      if (radical) return start;
      else {
        first = [start[0]+3, start[1]-1]
        second = [start[0]-3, start[1]+1]
        return [first, second]
      }
    }
    if (direction === 10) {
      start = [textRect.centerx - width/2, textRect.bottom]
      if (radical) return start;
      else {
        first = [start[0]+3, start[1]+1]
        second = [start[0]-3, start[1]-1]
        return [first, second]
      }
    }
    if (direction === 4) {
      start = [textRect.centerx + width/2, textRect.top-3]
      if (radical) return start;
      else {
        first = [start[0]+3, start[1]+1]
        second = [start[0]-3, start[1]-1]
        return [first, second]
      }
    }
    if (direction === 8) {
      start = [textRect.centerx + width/2, textRect.bottom]
      if (radical) return start;
      else {
        first = [start[0]+3, start[1]-1]
        second = [start[0]-3, start[1]+1]
        return [first, second]
      }
    }
    else return [start, 0]
  }
  Vue.doubleBondPositioner = function(textRect, direction) {
    let bondLength = 20
    let start, first, second = [0,0]
    let end1, end2 =[20,20]
    let height = textRect.height
    let width = textRect.width
    if (direction === 0) {
      start = [textRect.left - 5,textRect.centery]
      first = [start[0], start[1]+4]
      second = [start[0], start[1]-4]
      end1 = [first[0] - bondLength, first[1]]
      end2 = [second[0] - bondLength, second[1]]
    }
    if (direction === 6) {
      start = [textRect.right +5, textRect.centery]
      first = [start[0], start[1]+4]
      second = [start[0], start[1]-4]
      end1 = [first[0] + bondLength, first[1]]
      end2 = [second[0] + bondLength, second[1]]
    }
    if (direction === 3) {
      start = [textRect.centerx, textRect.top -5]
      first = [start[0]+4, start[1]]
      second = [start[0]-4, start[1]]
      end1 = [first[0], first[1]-bondLength]
      end2 = [second[0], second[1]-bondLength]
    }
    if (direction === 9) {
      start = [textRect.centerx, textRect.bottom]
      first = [start[0]+4, start[1]]
      second = [start[0]-4, start[1]]
      end1 = [first[0], first[1]+bondLength]
      end2 = [second[0], second[1]+bondLength]
    }
    if (direction === 1) {
      start = [textRect.left -4, textRect.centery-height/3]
      first = [start[0]+1, start[1]-4]
      second = [start[0]-1, start[1]+4]
      end1 = [first[0] - bondLength*0.866, first[1]-bondLength/2]
      end2 = [second[0] - bondLength*0.866, second[1]-bondLength/2]
    }
    if (direction === 11) {
      start = [textRect.left -4, textRect.centery+height/3]
      first = [start[0]+1, start[1]+4]
      second = [start[0]-1, start[1]-4]
      end1 = [first[0] - bondLength*0.866, first[1]+bondLength/2]
      end2 = [second[0] - bondLength*0.866, second[1]+bondLength/2]
    }
    if (direction === 5) {
      start = [textRect.right +3, textRect.centery-height/3]
      first = [start[0]+1, start[1]+4]
      second = [start[0]-1, start[1]-4]
      end1 = [first[0] + bondLength*0.866, first[1]-bondLength/2]
      end2 = [second[0] + bondLength*0.866, second[1]-bondLength/2]
    }
    if (direction === 7) {
      start = [textRect.right+3, textRect.centery+height/3]
      first = [start[0]+1, start[1]-4]
      second = [start[0]-1, start[1]+4]
      end1 = [first[0] + bondLength*0.866, first[1]+bondLength/2]
      end2 = [second[0] + bondLength*0.866, second[1]+bondLength/2]
    }
    if (direction === 2) {
      start = [textRect.centerx - width/3, textRect.top-3]
      first = [start[0]+3, start[1]-1]
      second = [start[0]-3, start[1]+1]
      end1 = [first[0] - bondLength/2, first[1]-bondLength*0.866]
      end2 = [second[0] - bondLength/2, second[1]-bondLength*0.866]
    }
    if (direction === 10) {
      start = [textRect.centerx - width/3, textRect.bottom]
      first = [start[0]+3, start[1]+1]
      second = [start[0]-3, start[1]-1]
      end1 = [first[0] - bondLength/2, first[1]+bondLength*0.866]
      end2 = [second[0] - bondLength/2, second[1]+bondLength*0.866]
    }
    if (direction == 4) {
      start = [textRect.centerx + width/3, textRect.top-3]
      first = [start[0]+3, start[1]+1]
      second = [start[0]-3, start[1]-1]
      end1 = [first[0]+ bondLength/2, first[1]-bondLength*0.866]
      end2 = [second[0]+ bondLength/2, second[1]-bondLength*0.866]
    }
    if (direction === 8) {
      start = [textRect.centerx + width/3, textRect.bottom]
      first = [start[0]+3, start[1]-1]
      second = [start[0]-3, start[1]+1]
      end1 = [first[0]+ bondLength/2, first[1]+bondLength*0.866]
      end2 = [second[0]+ bondLength/2, second[1]+bondLength*0.866]
    }
    return [first, end1, second, end2]
  }
  Vue.tripleBondPositioner = function(textRect, direction) {
    let bondLength = 20
    let start, first, second = [0,0]
    let end, end1, end2 =[20,20]
    let height = textRect.height
    let width = textRect.width
    if (direction === 0) {
      start = [textRect.left - 5,textRect.centery]
      end = [start[0] - bondLength, start[1]]
      first = [start[0], start[1]+4]
      second = [start[0], start[1]-4]
      end1 = [first[0] - bondLength, first[1]]
      end2 = [second[0] - bondLength, second[1]]
    }
    if (direction === 6) {
      start = [textRect.right +5, textRect.centery]
      end = [start[0] + bondLength, start[1]]
      first = [start[0], start[1]+4]
      second = [start[0], start[1]-4]
      end1 = [first[0] + bondLength, first[1]]
      end2 = [second[0] + bondLength, second[1]]
    }
    if (direction === 3) {
      start = [textRect.centerx, textRect.top -5]
      end = [start[0], start[1]-bondLength]
      first = [start[0]+4, start[1]]
      second = [start[0]-4, start[1]]
      end1 = [first[0], first[1]-bondLength]
      end2 = [second[0], second[1]-bondLength]
    }
    if (direction === 9) {
      start = [textRect.centerx, textRect.bottom]
      end = [start[0], start[1]+bondLength]
      first = [start[0]+4, start[1]]
      second = [start[0]-4, start[1]]
      end1 = [first[0], first[1]+bondLength]
      end2 = [second[0], second[1]+bondLength]
    }
    if (direction === 1) {
      start = [textRect.left -4, textRect.centery-height/3]
      end = [start[0] - bondLength*0.866, start[1]-bondLength/2]
      first = [start[0]+1, start[1]-4]
      second = [start[0]-1, start[1]+4]
      end1 = [first[0] - bondLength*0.866, first[1]-bondLength/2]
      end2 = [second[0] - bondLength*0.866, second[1]-bondLength/2]
    }
    if (direction === 11) {
      start = [textRect.left -4, textRect.centery+height/3]
      end = [start[0] - bondLength*0.866, start[1]+bondLength/2]
      first = [start[0]+1, start[1]+4]
      second = [start[0]-1, start[1]-4]
      end1 = [first[0] - bondLength*0.866, first[1]+bondLength/2]
      end2 = [second[0] - bondLength*0.866, second[1]+bondLength/2]
    }
    if (direction === 5) {
      start = [textRect.right +3, textRect.centery-height/3]
      end = [start[0] + bondLength*0.866, start[1]-bondLength/2]
      first = [start[0]+1, start[1]+4]
      second = [start[0]-1, start[1]-4]
      end1 = [first[0] + bondLength*0.866, first[1]-bondLength/2]
      end2 = [second[0] + bondLength*0.866, second[1]-bondLength/2]
    }
    if (direction === 7) {
      start = [textRect.right+3, textRect.centery+height/3]
      end = [start[0] + bondLength*0.866, start[1]+bondLength/2]
      first = [start[0]+1, start[1]-4]
      second = [start[0]-1, start[1]+4]
      end1 = [first[0] + bondLength*0.866, first[1]+bondLength/2]
      end2 = [second[0] + bondLength*0.866, second[1]+bondLength/2]
    }
    if (direction === 2) {
      start = [textRect.centerx - width/3, textRect.top-3]
      end = [start[0] - bondLength/2, start[1]-bondLength*0.866]
      first = [start[0]+3, start[1]-1]
      second = [start[0]-3, start[1]+1]
      end1 = [first[0] - bondLength/2, first[1]-bondLength*0.866]
      end2 = [second[0] - bondLength/2, second[1]-bondLength*0.866]
    }
    if (direction === 10) {
      start = [textRect.centerx - width/3, textRect.bottom]
      end = [start[0] - bondLength/2, start[1]+bondLength*0.866]
      first = [start[0]+3, start[1]+1]
      second = [start[0]-3, start[1]-1]
      end1 = [first[0] - bondLength/2, first[1]+bondLength*0.866]
      end2 = [second[0] - bondLength/2, second[1]+bondLength*0.866]
    }
    if (direction === 4) {
      start = [textRect.centerx + width/3, textRect.top-3]
      end = [start[0]+ bondLength/2, start[1]-bondLength*0.866]
      first = [start[0]+3, start[1]+1]
      second = [start[0]-3, start[1]-1]
      end1 = [first[0]+ bondLength/2, first[1]-bondLength*0.866]
      end2 = [second[0]+ bondLength/2, second[1]-bondLength*0.866]
    }
    if (direction === 8) {
      start = [textRect.centerx + width/3, textRect.bottom]
      end = [start[0]+ bondLength/2, start[1]+bondLength*0.866]
      first = [start[0]+3, start[1]-1]
      second = [start[0]-3, start[1]+1]
      end1 = [first[0]+ bondLength/2, first[1]+bondLength*0.866]
      end2 = [second[0]+ bondLength/2, second[1]+bondLength*0.866]
    }
    return [start, end, first, end1, second, end2]
  }
}
}
