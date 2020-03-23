class Shop {
  constructor(name, items, numItems, inventory) {
    this.itemList = items;
    this.shopName = name;
    this.numberOfItemsDisplayed = numItems;
    this.displayItems = new Array();
    this.alreadyDisplayed = new Array();
    this.boughtItems = new Array();
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
      temp[i] = this.getNewItem();
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
    this.boughtItems.push(this.displayItems[itemIndex]);
    this.connectedInven.addItem(this.displayItems[itemIndex]);
    this.displayItems[itemIndex].disabled = true;
    console.log(this.boughtItems);
  }

  getNewItem() {
    while (true) {
      var temp = this.itemList[Math.floor(Math.random() * this.itemList.length)];
      if (this.alreadyDisplayed.length >= this.itemList.length) this.alreadyDisplayed = this.displayItems.slice();
      if (this.alreadyDisplayed.indexOf(temp) == -1) {
        this.alreadyDisplayed.push(temp);
        return temp;
      }
    }
  }

  logItems() {
    //i think this is just a toString method
    var temp = "";
    this.displayItems.forEach((item, i) => {
      temp += item.name + ", ";
    });

    console.log(temp);

    temp = "";

    this.alreadyDisplayed.forEach((item, i) => {
      temp += item.name + ", ";
    });

    console.log(temp);

    this.displayItems[0].expired = true;
    this.updateDisplayItems();
  }
}

class Item {
  constructor(name, t, scr, cost, type) {
    this.name = name;
    //should be an array [H,M,S]
    //time kept in milliseconds
    this.timeParam = t;
    this.time = t[0]*60*60*1000 + t[1]*60*1000 + t[2]*1000;

    var today = new Date();
    this.startTime = today.getTime();
    this.finishTime = today.getTime() + this.time;
    this.timeLeft = this.finishTime - today.getTime();
    this.source = scr;
    this.itemCost = cost;
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
    return new Item(this.itemName, this.timeParam, this.source, this.itemCost, this.type);
  }

  timeLeftToString() {
    var left = testItem.timeLeft;
    var time = [Math.floor(left/3600000),Math.floor(left/60000)%60,Math.round(left/1000)%60];
    var timePrint = Math.floor(time[0]/10) + "" + time[0]%10+":"+Math.floor(time[1]/10) + "" + time[1]%10+":"+Math.floor(time[2]/10) + "" + time[2]%10
    return timePrint;
  }

}

Shop.allItemList = [
  new Item("Item 1",[2,0,0],"",120,"Flag"),
  new Item("Item 2",[2,0,0],"",100,"Mast"),
  new Item("Item 3",[2,0,0],"",130,"Soundtrack"),
  new Item("Item 4",[2,0,0],"",100,"Mast"),
  new Item("Item 5",[2,0,0],"",100,"Mast")
];
