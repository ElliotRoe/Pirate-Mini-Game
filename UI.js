window.onload = function what() {
  var costTag = document.getElementsByClassName('costTag')[0];
  var timeTag = document.getElementById('timeTag');
  var timeText = document.getElementById('timeText')
  var costText = document.getElementById('costText');

  var hullButton = document.getElementById('hullButton');
  hullButton.addEventListener("click",upgradeHull);
  hullButton.addEventListener("mousemove",function showCost(event) {
  var x = event.clientX;
  var y = event.clientY;
  costTag.style.opacity = 1;
  costTag.style.transform = "translate("+(x+30)+"px,"+(y-30)+"px)";
  costText.innerHTML = hullUpgradeCost;
  });
  hullButton.addEventListener("mouseout",function hideCost(event) {
    costTag.style.opacity = 0.001;
  });


  var mastButton = document.getElementById('mastButton');
  mastButton.addEventListener("click",upgradeMast);
  mastButton.disabled = true;
  mastButton.addEventListener("mousemove",function showCost(event) {
  var x = event.clientX;
  var y = event.clientY;
  costTag.style.opacity = 1;
  costTag.style.transform = "translate("+(x+30)+"px,"+(y-30)+"px)";
  costText.innerHTML = mastUpgradeCost;
  });
  mastButton.addEventListener("mouseout",function hideCost(event) {
    costTag.style.opacity = 0.001;
  });

  var cannonButton = document.getElementById('cannonButton');
  cannonButton.addEventListener("click",upgradeCannon);
  cannonButton.disabled = true;
  cannonButton.addEventListener("mousemove",function showCost(event) {
  var x = event.clientX;
  var y = event.clientY;
  costTag.style.opacity = 1;
  costTag.style.transform = "translate("+(x+30)+"px,"+(y-30)+"px)";
  costText.innerHTML = cannonUpgradeCost;
  });
  cannonButton.addEventListener("mouseout",function hideCost(event) {
    costTag.style.opacity = 0.001;
  });

  var shopButton = document.getElementById('shopButton');
  var shopMenuMover = document.getElementsByClassName('shopMenuMover')[0];
  var open = false;
  shopButton.addEventListener("click", function openShop() {
    shopMenuMover.classList.toggle("move",!open);
    open = !open;
  });

  /*var bottomButton = document.getElementById('bottomButton');
  bottomButton.addEventListener("click",buyBottomItem);
  bottomButton.addEventListener("mousemove",function showCost(event) {
    var x = event.clientX;
    var y = event.clientY;
    timeTag.style.opacity = 1;
    timeTag.style.transform = "translate("+(x+30)+"px,"+(y-30)+"px)";
    costText.innerHTML = bottomCost;
    currentItemTime = "bottom";
  });
  setInterval(updateShop,1000);*/

  var currentFlag = 0;
  var flag = document.getElementsByClassName('Flag')[currentFlag];

  var currentHull = 1;
  var currentMast = 1;
  var currentCannon = 1;
  var playerCoin = 1000;

  var hullUpgradeCost = 50;
  var mastUpgradeCost = 100;
  var cannonUpgradeCost = 175;

  function upgradeHull() {
    if (playerCoin > hullUpgradeCost) {
      upgradeSFX.currentTime = 0;
      upgradeSFX.play();
      hull[currentHull-1].style.opacity = "0";
      hull[++currentHull-1].style.opacity = "1";
      mastButton.disabled = false;
      cannonButton.disabled = false;
      hullUpgradeCost += 100;
      j = 0;
      riseHeight = 20;
      riseId = setInterval(riseAnim,100);
      costTag.style.opacity = 0.001;
    }
  }

  function upgradeMast() {
    if (playerCoin > mastUpgradeCost && currentHull>currentMast) {
      upgradeSFX.currentTime = 0;
      upgradeSFX.play();
      mast[currentMast-1].style.opacity = "0";
      mast[++currentMast-1].style.opacity = "1";
      mastButton.disabled = true;
      mastUpgradeCost += 75;
      costTag.style.opacity = 0.001;
      if (currentMast == 2) {
        flag.style.top = "7px";
        flag.style.left = "210px";
      }
    }
  }

  function upgradeCannon() {
    if (playerCoin > cannonUpgradeCost && currentHull>currentCannon) {
      upgradeSFX.currentTime = 0;
      upgradeSFX.play();
      cannon[currentCannon-1].style.opacity = "0";
      cannon[++currentCannon-1].style.opacity = "1";
      cannonButton.disabled = true;
      cannonUpgradeCost += 50;
      costTag.style.opacity = 0.001;
    }
  }

}
