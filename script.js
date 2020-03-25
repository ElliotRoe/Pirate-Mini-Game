window.onload = function what() {

  let playerInventory = new Inventory(0,new Array(),[0,0,0],1000000000);
  //playerInventory.parseInventory("");
  let mainShop = new Shop("mainShop",Shop.allItemList,3,playerInventory);

  //updates all the inventory scrs extra VERY IMPORTANT
  //setInterval("update",100);

  var Boat = document.getElementById('Boat').style;
  var Background = document.getElementById('Background');
  var backgroundMusic = document.getElementsByClassName('backgroundMusic');
  var ambientMusic = document.getElementsByClassName('ambientMusic');
  var upgradeSFX = document.getElementById('upgradeSFX');
  var playButton = document.getElementById('playButton');
  var startScreen = document.getElementById('startScreen');
  var currentMusic = 0;
  playButton.onclick = function(){
    startScreen.classList.add("slideAnimation");
    backgroundMusic[currentMusic].volume = 0.1;
    backgroundMusic[currentMusic].play();
    ambientMusic[0].volume = 0.1;
    ambientMusic[0].play();

  };

  var cloudArray = [
    document.querySelector("body > div > div.clouds > .cloud:nth-child(1)"),
    document.querySelector("body > div > div.clouds > .cloud:nth-child(2)"),
    document.querySelector("body > div > div.clouds > .cloud:nth-child(3)"),
    document.querySelector("body > div > div.clouds > .cloud:nth-child(4)"),
  ];

  var wave = document.querySelector("body > div > div.waves");

  var mast = document.getElementsByClassName('Mast');
  //console.log(mast);
  var hull = document.getElementsByClassName('Hull');
  //console.log(hull);
  var cannon = document.getElementsByClassName('Cannon');

  var costTag = document.getElementsByClassName('costTag')[0];
  var costText = document.getElementById('costText');
  var costImg = document.querySelector("body > div > div:nth-child(1) > div > img")

  //adds cost tag hover functionality to all buttons of shop class
  var hoverButtons = document.getElementsByClassName('hoverButton');
  //sets hover events to cost tag
  Array.from(hoverButtons).forEach((item, i) => {
    item.addEventListener("mousemove",function showCost(event) {
      var x = event.clientX;
      var y = event.clientY;
      costTag.style.opacity = 1;
      costTag.style.transform = "translate("+(x+30)+"px,"+(y-30)+"px)";
       if (i<3) {
         costText.innerHTML = playerInventory.upgradeCosts[i];
         costImg.style.display = "block";
       } else if (!playerInventory.open) {
         costText.innerHTML = mainShop.displayItems[i-3].cost;
         costImg.style.display = "block";
       } else {
         var j = i-3;
         console.log(j);
         var temp = playerInventory.displayItems[j];
         if (temp === undefined) costText.innerHTML = "Empty";
         else {
           costText.innerHTML = playerInventory.displayItems[j].name;
         }
         costImg.style.display = "none";
       }
    });
    item.addEventListener("mouseout",function hideCost(event) {
      costTag.style.opacity = 0.001;
    });
  });


  var hullButton = document.getElementById('hullButton');
  hullButton.addEventListener("click",upgradeHull);

  var mastButton = document.getElementById('mastButton');
  mastButton.addEventListener("click",upgradeMast);
  mastButton.disabled = true;

  var cannonButton = document.getElementById('cannonButton');
  cannonButton.addEventListener("click",upgradeCannon);
  cannonButton.disabled = true;

  //handles switches of shop to inventory
  var transitionTime = 0.6;
  var shopButton = document.getElementById('shopButton');
  var shopItems = document.getElementsByClassName('shopItem');
  var shopText = document.getElementsByClassName('shopText');
  var arrows = document.getElementsByClassName('arrow');
  var inventoryItems = document.getElementsByClassName('inventoryItem');
  var shopMenuMover = document.getElementsByClassName('shopMenuMover')[0];
  var open = false;
  shopButton.addEventListener("click", function openShop() {
    playerInventory.open = !playerInventory.open;
    if (playerInventory.open) {
      shopButton.src = "UI\\ShopButton\\Regular.png";
      setTimeout(function() {
        toggleClass(shopItems, false);
        toggleClass(inventoryItems, true);
        toggleClass(arrows, true);
        toggleClass(shopText, false);
      },transitionTime*1000);

    } else {
      shopButton.src = "UI\\ShopButton\\RegularInvent.png";
      setTimeout(function() {
        toggleClass(shopItems, true);
        toggleClass(inventoryItems, false);
        toggleClass(arrows, false);
        toggleClass(shopText, true);
      }, transitionTime*1000);
    }
    shopMenuMover.classList.toggle("move",!open);
    setTimeout(function() {shopMenuMover.classList.toggle("move",open);},transitionTime*1000);
  });

  function toggleClass(classArray, toggle) {
    Array.from(classArray).forEach((item, i) => {
      if(toggle) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

  }

  var currentFlag = 0;
  var flag = document.getElementsByClassName('Flag')[currentFlag];

  console.log("Width: " + Background.offsetWidth);

  var amp = 12/2;
  var freq = 1/32;
  var position;
  var i = 0;

  var angleAmp = 2;

  var boatId = setInterval(boatAnim, 5);
  var cloudId = setInterval(cloudAnim, 40);
  var waveId = setInterval(waveAnim, 20);
  var riseId;

  var spawnWidth = 3000;
  var randomness = 40;
  var cloudHeight = 100;
  var cloudHeightRand = 300;

  var cloudCoors = [[0,0],[0,0],[0,0],[0,0]];

  cloudArray.forEach((cloud, i) => {
    cloudCoors[i] = [(Math.ceil(Math.random() * randomness)+ spawnWidth*i/4),(Math.ceil(Math.random() *cloudHeightRand)-cloudHeight)]
    cloud.style.transform = "scale(0.5)"+ " translate(" + cloudCoors[i][0] + "px," + cloudCoors[i][1] + "px)";
  });


//Animations
  function cloudAnim() {
    cloudArray.forEach((cloud, i) => {
      //if it hits the end reset the various things
      if (cloudCoors[i][0]>2200) {
        var cloudNum = Math.ceil(Math.random() * 5);
        cloudCoors[i][0] = -800;
        cloudCoors[i][1] = (Math.ceil(Math.random() *cloudHeightRand)-cloudHeight);
      }
      cloudCoors[i][0] += 1;
      cloud.style.transform = "scale(0.5)"+ " translate(" + cloudCoors[i][0] + "px," + cloudCoors[i][1] + "px)";
    });

  }

  var waveX = 0;
  //wave the entire wave snaps back exactly on top of itself so the movement looks seemless
  var breakPoint = 197;

  function waveAnim() {
    if (waveX == breakPoint) {
      waveX = 1;
    }else {
      waveX++;
    }

    wave.style.transform = "translateX(" + waveX + "px)";

  }

  function boatAnim() {
    position = amp*Math.sin(i*freq*Math.PI*2);
    angle = angleAmp*Math.atan(-amp*freq*Math.PI*2*Math.cos(i*freq*Math.PI*2));
    Boat.transform = "translateY(" + position + "px) " + "rotate(" + angle + "deg)";

    i += 0.05;
  }

  var j;
  var riseHeight;

  function riseAnim() {
    if (++j>riseHeight) {
      clearInterval(riseId);
      j = 0;
    } else {
      Boat.top = 111 - j - riseHeight*(playerInventory.upgrades[0]-2) + "px";
    }
  }

  //upgrade functions

  function playShopSFX() {
    upgradeSFX.currentTime = 0;
    upgradeSFX.play();
  }

  function playUpgradeSFX() {
    upgradeSFX.currentTime = 0;
    upgradeSFX.play();
  }

  function upgradeHull() {
    if (playerInventory.money > playerInventory.upgradeCosts[0]) {
      //plays buying sound effect
      playUpgradeSFX();

      //switches hull graphic to the next one in line
      hull[playerInventory.upgrades[0]].style.opacity = "0";
      hull[playerInventory.incremUpgrade(0)].style.opacity = "1";

      //enables purchase of other attributes
      mastButton.disabled = false;
      cannonButton.disabled = false;

      mainShop.buyUpgrade(0);

      //raises the boat up a little so the bigger hull can be accomadated for
      j = 0;
      riseHeight = 20;
      riseId = setInterval(riseAnim,100);
      costTag.style.opacity = 0.001;
    }
  }

  function upgradeMast() {
    if (playerInventory.money > playerInventory.upgradeCosts[1]) {
      //plays upgrade SFX
      playUpgradeSFX();

      //advances to next mast
      mast[playerInventory.upgrades[1]].style.opacity = "0";
      mast[playerInventory.incremUpgrade(1)].style.opacity = "1";
      mastButton.disabled = true;
      mainShop.buyUpgrade(1);
      costTag.style.opacity = 0.001;

      //Changes flag's position in the game because the mast position changes
      if (playerInventory.upgrades[1] == 2) {
        flag.style.top = "7px";
        flag.style.left = "210px";
      }
    }
  }

  function upgradeCannon() {
    if (playerInventory.money > playerInventory.upgradeCosts[2]) {
      playUpgradeSFX();

      cannon[playerInventory.upgrades[2]].style.opacity = "0";
      cannon[playerInventory.incremUpgrade(2)].style.opacity = "1";
      cannonButton.disabled = true;

      mainShop.buyUpgrade(2);
      costTag.style.opacity = 0.001;
    }
  }


  //shop functions begin here

  //sets all the images for the items
  flagImage = document.getElementsByClassName('rightShopItem')[0];
  flagImage.style.src = mainShop.displayItems[1].imageSrc;
  figureheadImage = document.getElementsByClassName('bottomShopItem')[0];
  figureheadImage.style.src = mainShop.displayItems[2].imageSrc;

  //on hover play sample of audio
  soundtrackImage = document.getElementById('leftButton');
  image = document.getElementsByClassName('leftShopItem')[0];
  var soundtrackAudioSource = document.getElementById(mainShop.displayItems[0].getName());

  console.log(soundtrackAudioSource);
  soundtrackImage.addEventListener('mouseenter', function () {
    backgroundMusic[currentMusic].pause();
    soundtrackAudioSource.play();
    soundtrackAudioSource.volume = 0.1;
    image.src = "UI\\ShopMenu\\soundtrackButton(2).png";
    setTimeout(function() {
      soundtrackAudioSource.pause();
      soundtrackAudioSource.currentTime = 0;
      backgroundMusic[currentMusic].play();
      image.src = "UI\\ShopMenu\\soundtrackButton.png";
    }, 6000);
  });
  soundtrackImage.addEventListener('mouseleave', function () {
    soundtrackAudioSource.pause();
    soundtrackAudioSource.currentTime = 0;
    backgroundMusic[currentMusic].play();
    image.src = "UI\\ShopMenu\\soundtrackButton.png";
  });

  //Buying functions
  shopButtons = document.getElementsByClassName("shopButton");
  Array.from(shopButtons).forEach((item, i) => {
    item.addEventListener('click', function() {
      console.log("time");
      mainShop.buyItem(i);
      playShopSFX();


    });
  });



  //inventory functions begin here
  var flags = playerInventory.flags[0];
  var figureheads = playerInventory.figureheads[0];
  if (flags === undefined) {
    inventoryItems[1].src = "noItem.png";
  } else {
    inventoryItems[1].src = flags.imageSrc;
  }
  if (figureheads === undefined) {
    inventoryItems[2].src = "noItem.png";
  } else {
    inventoryItems[2].src = figureheads.imageSrc;
  }




}
