var itemArray = [
  new Item("Item 1",[2,0,0],"",120,"Flag"),
  new Item("Item 2",[2,0,0],"",100,"Mast"),
  new Item("Item 3",[2,0,0],"",130,"Soundtrack"),
  new Item("Item 4",[2,0,0],"",100,"Mast"),
  new Item("Item 5",[2,0,0],"",100,"Mast")
];

let testInventory = new Inventory(0,new Array(),[0,0,1]);
let testShop = new Shop("Test Shop",itemArray,3,testInventory);
console.log(testShop.displayItems);

testShop.buyItem(0);
console.log(testShop.displayItems);
console.log(testInventory.toString());
