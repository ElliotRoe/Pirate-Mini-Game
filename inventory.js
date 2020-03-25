class Inventory {
  constructor(playerID, items, upgrades, money, stringToParse) {
    this.playerID = playerID;
    this.items = items;
    //upgrade array notation: [hull level, sail level, cannon level]
    this.upgrades = upgrades;
    this.flags = new Array();
    this.figureheads = new Array();
    this.soundtracks = [Shop.allItemList[0]];

    //after default values are set the parse value will overide them
    if (stringToParse === undefined);
    else this.parseInventory(stringToParse);
    this.sortItems();

    this.open = false;

    //[soundtracks,flags,figureheads]
    this.displayItems = [this.soundtracks[0],this.flags[0],this.figureheads[0]];

    Inventory.upgradeIncr = [100,75,50];
    this.upgradeCosts = [
      50 + this.upgrades[0]*Inventory.upgradeIncr[0],
      100 + this.upgrades[1]*Inventory.upgradeIncr[1],
      175 + this.upgrades[2]*Inventory.upgradeIncr[2]];
    this.money = money;
  }

  sortItems() {
    this.items.forEach((item, i) => {
      switch (item.type.charAt(0)) {
        case 'S':
          soundtracks.push(item);
          break;
        case 'F':
          flags.push(item);
          break;
        case 'M':
          figureheads.push(item);
          break;
        default:

      }
    });

  }

  incremUpgrade(index) {
    var temp = ++this.upgrades[index];
    this.upgradeCosts = [
      50 + this.upgrades[0]*Inventory.upgradeIncr[0],
      100 + this.upgrades[1]*Inventory.upgradeIncr[1],
      175 + this.upgrades[2]*Inventory.upgradeIncr[2]
    ];
    return temp;

  }

  addItem(item) {
    this.items.push(item);
    console.log("items added");
    switch (item.type.charAt(0)) {
      case 'S':
        this.soundtracks.push(item);
        break;
      case 'F':
        this.flags.push(item);
        break;
      case 'M':
        this.figureheads.push(item);
        break;
      default:

    }

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
