window.onload = function what() {
  var Boat = document.getElementById('Boat').style;
  var Background = document.getElementById('Background');
  var backgroundMusic = document.getElementsByClassName('backgroundMusic');
  var upgradeSFX = document.getElementById('upgradeSFX');
  var playButton = document.getElementById('playButton');
  var startScreen = document.getElementById('startScreen');
  playButton.onclick = function(){
    startScreen.classList.add("slideAnimation");
    Array.from(backgroundMusic).forEach(track => {
      track.volume = 0.1;
      track.play();
    });

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
      Boat.top = 450 - j - riseHeight*(currentHull-2) + "px";
    }
  }

  //upgrade functions

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
