class Inventory {
  constructor(playerID, items, upgrades) {
    this.playerID = playerID;
    this.items = items;
    //upgrade array notation: [hull level, sail level, cannon level]
    this.upgrades = upgrades;
  }

  addItem(item) {
    this.items.push(item);
  }

  findItem(itemName) {
    Shop.allItemList.forEach((item, i) => {
      if(item.name == itemName) return item.clone();
    });

  }

  contains(itemToSearch) {
    this.items.forEach((item, i) => {
      if (item.getName() == itemToSearch.getName()) {
        return true
      }
    });
    return false;
  }

  parseInventory(inventory) {
    var temp = inventory;
    var colonIndex = temp.indexOf(':');
    this.playerID = temp.substring(0,colonIndex);
    temp = temp.substring(colonIndex+1,temp.length);
    var i;
    var commaIndex;
    while (true) {
      commaIndex = temp.indexOf(',');
      if (commaIndex != -1) {
        this.items[i] = this.findItem(temp.substring(0,commaIndex));
        temp = temp.substring(commaIndex+1,temp.length);
      } else break;
    }
    var periodIndex = temp.indexOf('.');
    this.upgrades.forEach((item, i) => {
      this.upgrades[i] = temp.substring(0,periodIndex);
      temp = temp.substring(periodIndex+1,temp.length);
    });

  }

  toString() {
    var temp = this.playerID + ":";
    this.items.forEach((item, i) => {
      temp += item.getName() + ",";
    });
    temp += this.upgrades[0] +"." + this.upgrades[1] + "." + this.upgrades[2] + ".";
    return temp;
  }
}
