const RESTURL = "http://bexleycodingcamp.com/?rest_route=/wp/v2/users/"

var userID = getUrlParam('id',null);

let playerInventory;
let mainShop;

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

//gets user's data
var playerData = new Promise((resolve, reject) => {
  $.ajax({
    url: RESTURL + userID,
    method: 'GET',
    beforeSend: function ( xhr ) {
       xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'Elliot:L@mboghini1' ) );
    }

  }).done(function(response) {
      try {
        resolve(JSON.parse(response.meta.user_game_data));
      } catch (err) {
        resolve("");
      }
    });
});

//makes sure player data has loaded
playerData.then(function(data) {
  //makes sure page elements have loaded
  window.onload = function what() {

    console.log(data);

    playerInventory = new Inventory(0, [Shop.allItemList[1]], [0, 0, 0], 100);
    mainShop = new Shop("mainShop", Shop.allItemList.slice(2), 3, playerInventory);

    //if it's a new player set the defaults
    if (data != "") {
      playerInventory.playerID = data.inventory.playerID;
      playerInventory.items = Item.generateItemArray(data.inventory.items);
      playerInventory.displayIndex = data.inventory.displayIndex;
      playerInventory.upgrades = data.inventory.upgrades;
      playerInventory.flags = data.inventory.flags;
      playerInventory.figureheads = Item.generateItemArray(data.inventory.figureheads);
      playerInventory.soundtracks = Item.generateItemArray(data.inventory.soundtracks);
      playerInventory.displayItems = Item.generateItemArray(data.inventory.displayItems);
      playerInventory.money = data.inventory.money;

      mainShop.displayItems = Item.generateItemArray(data.shop.displayItems);
      mainShop.alreadyDisplayed = Item.generateItemArray(data.shop.alreadyDisplayed);
      mainShop.boughtItems = Item.generateItemArray(data.shop.boughtItems);
      mainShop.executed = data.shop.boughtItems.executed;
      mainShop.connectedInven = playerInventory;
    }

    mainShop.beginUpdate();

    //updates all the disabled buttons VERY IMPORTANT
    flag = document.getElementById('mainFlag');
    figurehead = document.getElementById('mainFigureHead');
    setInterval(update, 100);

    var Boat = document.getElementById('Boat').style;
    var Background = document.getElementById('Background');
    var backgroundMusic = document.getElementsByClassName('backgroundMusic');
    var ambientMusic = document.getElementsByClassName('ambientMusic');
    var playButton = document.getElementById('playButton');
    var startScreen = document.getElementById('startScreen');
    var currentMusic = document.getElementById(playerInventory.displayItems[0].name);
    playButton.onclick = function() {
      startScreen.classList.add("slideAnimation");
      currentMusic.volume = 0.1;
      currentMusic.play();
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
      item.addEventListener("mousemove", function showCost(event) {
        var x = event.clientX;
        var y = event.clientY;
        costTag.style.opacity = 1;
        costTag.style.transform = "translate(" + (x + 30) + "px," + (y - 30) + "px)";
        if (i < 3) {
          costText.innerHTML = playerInventory.upgradeCosts[i];
          costImg.style.display = "block";
        } else if (!playerInventory.open) {
          if (!mainShop.displayItems[i - 3].disabled) {
            costText.innerHTML = mainShop.displayItems[i - 3].cost;
            costImg.style.display = "block";
          } else {
            costText.innerHTML = "Sold";
            if (playerInventory.upgrades[0] < 3 && (i - 3) == 2) {
              costText.innerHTML = "Must have lvl. 4 hull to purchase";
            }
            costImg.style.display = "none";
          }
        } else {
          var j = i - 3;
          var temp = playerInventory.displayItems[j];
          if (temp === null || temp === undefined) costText.innerHTML = "Empty";
          else {
            costText.innerHTML = playerInventory.displayItems[j].name;
          }
          costImg.style.display = "none";
        }
      });
      item.addEventListener("mouseout", function hideCost(event) {
        costTag.style.opacity = 0.001;
      });
    });


    var upgradeButtons = document.getElementsByClassName('upgradeButton');
    initUpgrades();
    var riseHeight = 20;
    initRise();

    var hullButton = document.getElementById('hullButton');
    hullButton.addEventListener("click", upgradeHull);


    var mastButton = document.getElementById('mastButton');
    mastButton.addEventListener("click", upgradeMast);
    mastButton.disabled = true;

    var cannonButton = document.getElementById('cannonButton');
    cannonButton.addEventListener("click", upgradeCannon);
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
          //toggleClass(arrows, true);
          toggleClass(shopText, false);
        }, transitionTime * 1000);

      } else {
        shopButton.src = "UI\\ShopButton\\RegularInvent.png";
        setTimeout(function() {
          toggleClass(shopItems, true);
          toggleClass(inventoryItems, false);
          //toggleClass(arrows, false);
          toggleClass(shopText, true);
        }, transitionTime * 1000);
      }
      shopMenuMover.classList.toggle("move", !open);
      setTimeout(function() {
        shopMenuMover.classList.toggle("move", open);
      }, transitionTime * 1000);
    });

    function toggleClass(classArray, toggle) {
      Array.from(classArray).forEach((item, i) => {
        if (toggle) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

    }

    console.log("Width: " + Background.offsetWidth);

    var amp = 12 / 2;
    var freq = 1 / 32;
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

    var cloudCoors = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ];

    cloudArray.forEach((cloud, i) => {
      cloudCoors[i] = [(Math.ceil(Math.random() * randomness) + spawnWidth * i / 4), (Math.ceil(Math.random() * cloudHeightRand) - cloudHeight)]
      cloud.style.transform = "scale(0.5)" + " translate(" + cloudCoors[i][0] + "px," + cloudCoors[i][1] + "px)";
    });


    //Animations
    function cloudAnim() {
      cloudArray.forEach((cloud, i) => {
        //if it hits the end reset the various things
        if (cloudCoors[i][0] > 2200) {
          var cloudNum = Math.ceil(Math.random() * 5);
          cloudCoors[i][0] = -800;
          cloudCoors[i][1] = (Math.ceil(Math.random() * cloudHeightRand) - cloudHeight);
        }
        cloudCoors[i][0] += 1;
        cloud.style.transform = "scale(0.5)" + " translate(" + cloudCoors[i][0] + "px," + cloudCoors[i][1] + "px)";
      });

    }

    var waveX = 0;
    //wave the entire wave snaps back exactly on top of itself so the movement looks seemless
    var breakPoint = 197;

    function waveAnim() {
      if (waveX == breakPoint) {
        waveX = 1;
      } else {
        waveX++;
      }

      wave.style.transform = "translateX(" + waveX + "px)";

    }

    function boatAnim() {
      position = amp * Math.sin(i * freq * Math.PI * 2);
      angle = angleAmp * Math.atan(-amp * freq * Math.PI * 2 * Math.cos(i * freq * Math.PI * 2));
      Boat.transform = "translateY(" + position + "px) " + "rotate(" + angle + "deg)";

      i += 0.05;
    }

    var j;

    function initRise() {
      Boat.top = 60 - riseHeight * (playerInventory.upgrades[0]) + "px";
    }

    function riseAnim() {
      if (++j > riseHeight) {
        clearInterval(riseId);
        j = 0;
      } else {
        Boat.top = 60 - j - riseHeight * (playerInventory.upgrades[0] - 1) + "px";
      }
    }

    //upgrade functions
    var SFX = document.getElementsByClassName('SFX');
    //sets volume
    Array.from(SFX).forEach((item, i) => {
      item.volume = 0.2;
    });



    function playShopSFX() {
      //Cash Register
      SFX[0].currentTime = 0;
      SFX[0].play();
    }

    function playUpgradeSFX() {
      SFX[1].currentTime = 0;
      SFX[1].play();
      SFX[2].currentTime = 0;
      SFX[2].play();
      currentMusic.pause();
      setTimeout(function() {
        currentMusic.play();
      }, 3500);
    }

    function initUpgrades() {
      var partsArray = [hull, mast, cannon]
      partsArray.forEach((boatPart, h) => {
        Array.from(boatPart).forEach((item, k) => {
          if (k > playerInventory.upgrades[h]) {
            item.style.opacity = "0.001";
          } else if (k == playerInventory.upgrades[h]) {
            item.style.opacity = "1";
          } else {
            item.style.opacity = "0";
          }
        });
      });
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
        riseId = setInterval(riseAnim, 40);
        costTag.style.opacity = 0.001;
        exportData(playerInventory, mainShop);
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
        console.log("position" + playerInventory.upgrades[1]);
        flag.classList.toggle("position" + playerInventory.upgrades[1], true);
        exportData(playerInventory, mainShop);
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
        exportData(playerInventory, mainShop);
      }
    }


    //shop functions begin here

    //sets all the images for the items
    flagImage = document.getElementsByClassName('rightShopItem')[0];
    flagImage.src = mainShop.displayItems[1].imageSrc;

    figureheadImage = document.getElementsByClassName('bottomShopItem')[0];
    figureheadImage.src = mainShop.displayItems[2].imageSrc;

    //on hover play sample of audio
    soundtrackImage = document.getElementById('leftButton');
    image = document.getElementsByClassName('leftShopItem')[0];
    var soundtrackAudioSource = document.getElementById(mainShop.displayItems[0].name);

    console.log(soundtrackAudioSource);
    soundtrackImage.addEventListener('mouseenter', function() {
      if (!playerInventory.open) {
        if (!mainShop.displayItems[0].disabled) {
          currentMusic.pause();
          soundtrackAudioSource.play();
          soundtrackAudioSource.volume = 0.1;
          image.src = "UI\\ShopMenu\\soundtrackButton(2).png";
          setTimeout(function() {
            if (!mainShop.displayItems[0].disabled) {
              soundtrackAudioSource.pause();
              soundtrackAudioSource.currentTime = 0;
              currentMusic.play();
              image.src = "UI\\ShopMenu\\soundtrackButton.png";
            }
          }, 6000);
        }
      }
    });
    soundtrackImage.addEventListener('mouseleave', function() {
      if (!playerInventory.open) {
        if (!mainShop.displayItems[0].disabled) {
          soundtrackAudioSource.pause();
          soundtrackAudioSource.currentTime = 0;
          currentMusic.play();
          image.src = "UI\\ShopMenu\\soundtrackButton.png";
        }
      }
    });

    //Buying function and inventory cycle function
    shopButtons = document.getElementsByClassName("shopButton");
    Array.from(shopButtons).forEach((item, i) => {
      item.addEventListener('click', function() {
        if (!playerInventory.open) {
          if (!mainShop.displayItems[i].disabled) {
            playShopSFX();
            //if music bought then it sets it as the current background music
            if (i == 0) {
              currentMusic.pause();
              currentMusic = document.getElementById(mainShop.displayItems[0].getName());
              currentMusic.play();
            }
            inventoryItems[i].src = mainShop.buyItem(i).imageSrc;
            if (i == 1) {
              flag.src = playerInventory.displayItems[1].imageSrc;
            }
            exportData(playerInventory, mainShop);
          }
        } else {
          //inventory display functions
          if (inventoryItems[i].src.indexOf("noItem") != -1);
          else {
            inventoryItems[i].src = playerInventory.nextItem(i).imageSrc;
            if (i == 0) {
              currentMusic.pause();
              var songName = playerInventory.displayItems[0].getName();
              currentMusic = document.getElementById(songName);
              //updates name on costTag
              costText.innerHTML = songName;
              currentMusic.play();
            }
            exportData(playerInventory, mainShop);
          }
        }
      });
    });

    //disable updater
    var shopButtonWrappers = document.getElementsByClassName('shopButtonWrapper');

    function update() {
      currentMusic.volume = 0.1;

      //sets flag source
      flag.src = playerInventory.displayItems[1].imageSrc;
      flag.classList.toggle("position" + playerInventory.upgrades[1], true);
      //sets figurehead source
      if (playerInventory.displayItems[2] === null || playerInventory.displayItems[2] ===undefined);
      else
        figurehead.src = playerInventory.displayItems[2].imageSrc;

      Array.from(shopButtonWrappers).forEach((item, i) => {
        if (!playerInventory.open)
          item.classList.toggle("disabled", mainShop.displayItems[i].disabled);
        else
          setTimeout(function() {
            item.classList.toggle("disabled", false);
          }, transitionTime * 1000);


      });
      mastButton.disabled = !(playerInventory.upgrades[1] < playerInventory.upgrades[0]);
      cannonButton.disabled = true;
      hullButton.disabled = playerInventory.upgrades[0] >= 3;


    }


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
});
