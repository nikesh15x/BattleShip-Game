$("document").ready(function () {
  $("#defaultModal").show();
  $("#defaultModal1").hide();

  $(".confetti").hide();
  $("#closeModel").on("click", () => {
    $("#defaultModal").hide("700");
  });
  $("#bTrigger").on("click", () => {
    $("#defaultModal").show("700");
    $("#closeModel").text("Close");
  });



  let oneShot = false;

  let chances = 10;
  let chan = $("#chances");
  let prDiv = $("#parent");
  let axis = generateRandomLetter();

  let shipCord = [];

  function generateRandomLetter() {
    const alphabet = "hv";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  function generateBattleBoard() {
    chances = 10;
    prDiv.text("");
    let row = 0;
    for (let index = 1; index < 11; index++) {
      let div = document.createElement("img");
      div.src = "img/water.gif";
      let col = index;
      div.className = "board__square border hover:border-slate-800";
      let id = row + "" + (col - 1);
      div.id = id;
      div.onclick = () => getId(div);
      prDiv.append(div);
      if ((row < 9) & (index >= 10)) {
        row++;
        index = 0;
      }
    }
  }

  function getId(div) {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    chances--;
    div.src = "./img/blast.gif";
    let cord = div.id;
    if (shipCord.includes(cord)) {
      let index = shipCord.indexOf(cord);
      if (axis == "h") {
        div.src = `./img/${4 - index}.png`;
      }
      if (axis == "v") {
        div.className = "rotateVertical";
        div.src = `./img/${index + 1}.png`;
      }
      if (chances == 9) {
        oneShot = true;
      }
      blastAll(0);
      return;
    }
    div.onclick = () => { };
    setInterval(() => {
      div.src = "img/water.gif";
      div.className = "board__square_disable disabled";
      if (chances === 0) {
        alert("You Lost")
        resetGame();
      }
    }, 400);
    chan.text(`Chances Left ${chances}`);
  }

  function blastAll(index) {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 220, 200, 100, 200]);
    }
    if (index > 3) {
      win()
    } else {
      let val = shipCord[index];
      let d = document.getElementById(val);
      d.src = "./img/blast.gif";
      let isn = setInterval(() => {
        if (axis == "h") {
          d.src = `./img/${4 - index}.png`;
        }
        if (axis == "v") {
          d.className = "rotateVertical";
          d.src = `./img/${index + 1}.png`;
        }
        clearInterval(isn);
        blastAll(index + 1);
      }, 1000);
    }
  }

  function resetGame() {
    $(".confetti").hide();
    $("#defaultModal1").hide();
    oneShot = false;
    generateBattleBoard();
    placeBattleShip();
  }

  function randomRange(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
  }

  function placeBattleShip() {
    let row = (col = 0);
    if (axis == "v") {
      row = randomRange(0, 6);
      col = randomRange(0, 9);
      shipCord[0] = row++ + "" + col;
      shipCord[1] = row++ + "" + col;
      shipCord[2] = row++ + "" + col;
      shipCord[3] = row++ + "" + col;
    }
    if (axis == "h") {
      row = randomRange(0, 9);
      col = randomRange(0, 6);
      shipCord[0] = row + "" + col++;
      shipCord[1] = row + "" + col++;
      shipCord[2] = row + "" + col++;
      shipCord[3] = row + "" + col++;
    }
    chan.text(`Chances Left : ${chances}  `);
  }

  const defaults = {
    disableForReducedMotion: true,
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(200 * particleRatio),
      })
    );
  }

  function confettiExplosion(origin) {
    fire(0.25, {
      spread: 56,
      startVelocity: 55,
      origin,
    });
    fire(0.2, {
      spread: 80,
      origin,
    });
    fire(0.35, {
      spread: 200,
      decay: 0.91,
      origin,
    });
    fire(0.1, {
      spread: 220,
      startVelocity: 25,
      decay: 0.92,
      origin,
    });
    fire(0.1, {
      spread: 320,
      startVelocity: 45,
      origin,
    });
  }

  function showWin() {
    let testD = document.getElementById("blast");
    const rect = testD.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const origin = {
      x: center.x / window.innerWidth,
      y: center.y / window.innerHeight,
    };
    confettiExplosion(origin);
  }

  function win() {
    $(".confetti").show();
    let x;
    if (oneShot) {
      x = setInterval(function () {
        showWin()
      }, 350);
      setTimeout(() => {
        alert("Game Over You Won!!!!");
        clearInterval(x)
        $(".confetti").hide();
        resetGame();
      }, 1200);
    } else {
      setTimeout(() => {
        alert("Game Over You Won!!!!");
        clearInterval(x)
        resetGame();
      }, 1200);
    }
  }

  placeBattleShip();
  generateBattleBoard();
});
