class Shop {
  constructor(name, items, numItems, inventory) {
    this.itemList = items;
    this.shopName = name;
    this.open = true;
    this.numberOfItemsDisplayed = numItems;
    this.displayItems = new Array();
    this.alreadyDisplayed = new Array();
    this.boughtItems = new Array();

    //index 0 is left (Soundtrack); 1 is right (Flag); 2 is bottom (Figurehead);
    this.displayItems = this.setInitalDisplayItems(this.numberOfItemsDisplayed);
    this.connectedInven = inventory;

    var self = this;
    self.updateDisplayItems();
    setInterval(function() {
      self.updateDisplayItems();
    }, 10);
  }

  setInitalDisplayItems(num) {
    var temp = new Array();
    for (var i = 0; i < num; i++) {
      temp[i] = this.getNewItem(i);
    }
    return temp;
  }

  updateDisplayItems() {
    this.displayItems.forEach((item, i) => {
      if (item.isExpired()) {
        this.displayItems[i] = this.getNewItem();
      }
      if (this.connectedInven.contains(item)) {
        item.disabled = true;
      }

    });

  }

  buyItem(itemIndex) {
    var item = this.displayItems[itemIndex];
    this.boughtItems.push(item);
    this.connectedInven.addItem(item);
    item.disabled = true;
    this.connectedInven.money -= item.cost;
    return item;
  }

  buyUpgrade(upgradeIndex) {
    //0 is hull; 1 is mast; 2 is cannon;
    this.connectedInven.upgrades[upgradeIndex]++;
    this.connectedInven.money -= this.connectedInven.upgradeCosts[upgradeIndex];
  }

  getNewItem(type) {
    var cont = true;
    while (cont) {
      var temp = this.itemList[Math.floor(Math.random() * this.itemList.length)];
      switch(type) {
        case 0:
          if (temp.type == 'Soundtrack') cont = false;
          break;
        case 1:
          if (temp.type == 'Flag') cont = false;
          break;
        case 2:
          if (temp.type == 'Mast') cont = false;
          break;
      }
    }
    return temp;
  }
}

class Item {
  constructor(name, t, cost, type, imageSrc, audioSrc) {
    this.name = name;
    //should be an array [H,M,S]
    //time kept in milliseconds
    this.timeParam = t;
    this.time = t[0]*60*60*1000 + t[1]*60*1000 + t[2]*1000;

    var today = new Date();
    this.startTime = today.getTime();
    this.finishTime = today.getTime() + this.time;
    this.timeLeft = this.finishTime - today.getTime();
    this.imageSrc = imageSrc;
    if (audioSrc === undefined) audioSrc = ""; else
    this.audioSrc = audioSrc;
    this.cost = cost;
    this.itemType = type;
    this.expired = false;
    this.ID;
    this.type = type;
    this.disabled = false;
  }

  isExpired() {
    return this.expired;
  }

  startTimer() {
    var self = this;
    this.ID = setInterval(function() {
     self.updateItem();
   },1);
  }

  updateItem() {
    var today = new Date();
    this.timeLeft = this.finishTime - today.getTime();
    if (this.timeLeft<=0) {
      clearInterval(this.ID);
      this.expired = true;
    }
  }

  setTime(t) {
    this.time = t;
  }

  getName() {
    return this.name;
  }

  clone() {
    return new Item(this.itemName, this.timeParam, this.source, this.cost, this.type);
  }

  timeLeftToString() {
    var left = testItem.timeLeft;
    var time = [Math.floor(left/3600000),Math.floor(left/60000)%60,Math.round(left/1000)%60];
    var timePrint = Math.floor(time[0]/10) + "" + time[0]%10+":"+Math.floor(time[1]/10) + "" + time[1]%10+":"+Math.floor(time[2]/10) + "" + time[2]%10
    return timePrint;
  }

}

Shop.allItemList = [
  new Item("Theme 1",[24,0,0], 0,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 01.wav"),
  new Item("Theme 2",[24,0,0],75,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 05.wav"),
  new Item("Peaceful 1",[24,0,0],100,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 09.wav"),
  new Item("Peaceful 2",[24,0,0],100,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 11.wav"),
  new Item("Halloween 1",[24,0,0],125,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 14.wav"),
  new Item("Halloween 2",[24,0,0],150,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 16 - Halloween.wav"),
  new Item("Hawaiian",[24,0,0],150,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 19.wav"),
  new Item("Excited",[24,0,0],150,"Soundtrack","UI\\ShopMenu\\soundtrackButton(2).png","Audio\\Music Loops\\Casual Game Music 20.wav"),
  new Item("Bexley Coding Flag",[24,0,0],150,"Flag","Flag(1).png"),
  new Item("Wolf Mast Head",[24,0,0],150,"Mast","FigureIcon(1).png"),
];
