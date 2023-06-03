// #region Pre-defined variables for the game

let currentRoom = undefined;
let previousRoom = currentRoom;
let gameRunning = false;
let inputControls;
let ethnoamb = document.getElementById("forest-ambience");
const br = "<br><br>";
const inventory = [];
const startBtn = document.querySelector("#s-btn");
const reloadBtn = document.querySelector("#r-btn");
const persDiv = document.getElementById("pers-output");
const textAudio = new Audio("Sounds/typewriterKey.wav");
const footstepsGravelAudio = new Audio("Sounds/footstepsGravel.mp3");
const openInventoryAudio = new Audio("Sounds/openBag.mp3");
let inventoryTypingAudio = new Audio("Sounds/keyboardKey.wav");
const errorAudio = new Audio("Sounds/error.wav");
const successAudio = new Audio("Sounds/success4.wav");
const controlCheckbox = document.querySelector("#control-toggle");
const musicCheckbox = document.querySelector("#music-toggle");
const sfxCheckbox = document.querySelector("#sfx-toggle");
const textInputControl = document.querySelector("#input-container");
const btnInputControl = document.querySelector("#btn-controls-div");
textAudio.volume = 0.05;
// #endregion

// #region Controls display for ZONK! button

function controlToggle() {
  if (controlCheckbox.checked) {
    textInputControl.classList.add("hide");
    textInputControl.classList.remove("input-container-flex");
    btnInputControl.classList.remove("hide");
    btnInputControl.classList.add("btn-container-flex");
  } else {
    textInputControl.classList.remove("hide");
    textInputControl.classList.add("input-container-flex");
    btnInputControl.classList.add("hide");
    btnInputControl.classList.remove("btn-container-flex");
  }
}

function musicToggle() {
  if (musicCheckbox.checked) {
    ethnoamb.loop = true;
    ethnoamb.play();
  } else {
    ethnoamb.loop = false;
    ethnoamb.pause();
    ethnoamb.currentTime = 0;
  }
}

function sfxToggle() {
  if (sfxCheckbox.checked) {
    footstepsGravelAudio.volume = 1;
    textAudio.volume = 0.1;
    openInventoryAudio.volume = 1;
    inventoryTypingAudio.volume = 1;
    errorAudio.volume = 1;
    successAudio.volume = 1;
  } else {
    textAudio.volume = 0;
    footstepsGravelAudio.volume = 0;
    openInventoryAudio.volume = 0;
    inventoryTypingAudio.volume = 0;
    errorAudio.volume = 0;
    successAudio.volume = 0;
  }
}

// #endregion

// #region START GAME
function hideBtn() {
  let startBtn = document.querySelector("#s-btn");
  let reloadBtn = document.querySelector("#r-btn");
  // let persDiv = document.getElementById("pers-output");
  setTimeout(() => {
    if (startBtn.className === "play-btn" && reloadBtn.className === "hide") {
      startBtn.className = "hide";
      reloadBtn.className = "play-btn";
      startGame();
    } else if (
      startBtn.className === "hide" &&
      reloadBtn.className === "play-btn"
    ) {
      location.reload()
      // startBtn.className = "play-btn";
      // reloadBtn.className = "hide";
      // persDiv.innerHTML = "";
      // pauseLoop();
    }
  }, 150);
}
// #endregion

// #region START & END GAME
function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    currentRoom = 1;
    previousRoom = 1;
    document.getElementById("pers-output").innerHTML = "";
    document.getElementById("room-id").innerHTML = "";
    document.getElementById(
      "room-id"
    ).innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    musicToggle();
    sfxToggle();
    // playLoop();
    initializeControls();
    document.getElementById("pers-output").innerHTML +=
      "<p>Welcome to the game! Type 'help' for a list of commands. Or just use the buttons.</p>" +
      "<p>You awaken, confused. Your head aches with the furor of Jack Rebney.</p>";
    printRoomDescription();
  }
}

function endGame() {
  if (gameRunning) {
    gameRunning = false;
    initializeControls();
    document.getElementById("pers-output").innerHTML = "";
    currentRoom = undefined;
    document.getElementById("pers-output").innerHTML += "Game ended";
  }
}
// #endregion

// #region Audio Control  ===================================

function audioControl(src, playPause) {
  if (playPause == "play") {
    new Audio(src).play();
  } else {
    new Audio(src).pause();
  }
}

function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

function playLoop() {
  ethnoamb.loop = true;
  ethnoamb.play();
}

function pauseLoop() {
  ethnoamb.loop = false;
  ethnoamb.pause();
  ethnoamb.currentTime = 0;
}
// #endregion

// #region Died and Win  ====================================

function died() {
  let startBtn = document.querySelector("#s-btn");
  let reloadBtn = document.querySelector("#r-btn");
  let persDiv = document.getElementById("pers-output");
  alert("You have died.");
  endGame();
  startBtn.className = "play-btn";
  reloadBtn.className = "hide";
}

function win() {
  let startBtn = document.querySelector("#s-btn");
  let reloadBtn = document.querySelector("#r-btn");
  let persDiv = document.getElementById("pers-output");
  endGame();
  startBtn.className = "play-btn";
  reloadBtn.className = "hide";
  audioControl(document.getElementById("forest-ambience"), "pause");
}

// #endregion

// #region Display Image  ===================================

function displayImage(src) {
  const img = document.createElement("img");
  img.src = src;
  const textElement = document.querySelector("#pers-output");
  textElement.appendChild(img);
}

// #endregion

// #region Open Bag  ========================================

function openBag() {
  invIndex = 0;
  speed = 50;
  persDiv.innerHTML += "<br>" + "You are carrying:" + "<br>";
  persDiv.scrollTop = persDiv.scrollHeight;
  openInventoryAudio.play();
  printInventory();
}

// #endregion

// #region Print Inventory  =================================
function printInventory() {
  speed = 50;
  if (invIndex < inventory.toString().length) {
    inventoryTypingAudio = new Audio("Sounds/keyboardKey.wav");
    if (sfxCheckbox.checked) {
      inventoryTypingAudio.volume = 1;
    } else {
      inventoryTypingAudio.volume = 0;
    }
    persDiv.innerHTML += inventory.toString().charAt(invIndex);
    console.log(inventory.toString().charAt(invIndex));
    console.log(inventory.toString().length);
    invIndex++;
    inventoryTypingAudio.play();
    setTimeout(printInventory, speed);
    if (invIndex >= inventory.toString().length) {
      persDiv.innerHTML += "<br>";
    }
  }
  persDiv.scrollTop = persDiv.scrollHeight;
}

// #endregion

// #region Mouse & Keyboard Movement Controls ================================
function initializeControls() {
  document.getElementById("north").addEventListener("click", function () {
    handleInput("north");
  });

  document.getElementById("south").addEventListener("click", function () {
    handleInput("south");
  });

  document.getElementById("east").addEventListener("click", function () {
    handleInput("east");
  });

  document.getElementById("west").addEventListener("click", function () {
    handleInput("west");
  });

  document.getElementById("look").addEventListener("click", function () {
    handleInput("look");
  });

  document.getElementById("take").addEventListener("click", function () {
    handleInput("take");
  });

  document.getElementById("inventory").addEventListener("click", function () {
    openBag();
  });

  // SUBMIT BUTTON
  document.getElementById("submit").addEventListener("click", function () {
    handleInput(document.getElementById("input").value.toLowerCase());
  });

  document
    .getElementById("input")
    .addEventListener("keydown", function (event) {
      enterSkip = document.getElementById("input").value;
      if (event.key === "Enter" && enterSkip !== "") {
        handleInput(enterSkip.toLowerCase());
      }
    });
}
// #endregion

// #region ROOMS ============================================

// Define function for printing room initial description
let typing = false;
let interrupt = false;
function printRoomDescription() {
  const descriptionByRoom = {
    1: `You are in a small clearing of the forest.`,
    2: `There is a large shack ahead.`,
    3: `The forest is bearing down on you.`,
    4: `The trees are thinner and a brook lies here.`,
    5: `You fall down the hill or something.`,
    6: `You are at the entrance to the forest.`,
    7: `A dilapidated manor stands before you.`,
    8: `You are in the foyer of the manor.`,
    9: `There is a staircase here.`,
    10: `The cellar reeks of earth and mildew.`,
    11: `It is pitch black.`,
    12: `You are in a small cave.`,
    13: `You are in large a cistern.`,
    14: `You are at the top landing.`,
    // Room 14
    141: `You approach the door to the north and attempt to open it. It shifts a small amount before stopping entirely. Something seems to be blocking the door from the other side.`,
    // Room 14
    142: `You approach the door to the south and attempt to open it. It doesn't budge at all.`,
    15: `You are in an antechamber.`,
    // Room 2
    16: `You slowly push the door open as you peek inside. The door groans and squeaks loudly as flakes of rust fall from the hinges onto the floor. 
    ${br}
    It's pitch black in here and you cannot see very well. As you push past the door and your eyes adjust to the dark, you notice a hole in the floor surrounded by splintered wood. Below the floorboards is yet another hole bored deep into the earth. 
    ${br}
    You cautiously step forward so as not to fall in. Suddenly, a large, dark hand reaches up and encircles your entire body, pulling you down into the abyss.`,
    // Room 3
    17: `You pick up the small ornate box, running your fingers along its edges and inspecting it carefully. The craftmanship of such a box seems inhuman, as it is covered in unknown runes and has such intricate, minute details carved into it.
    ${br}
    Curiously, you lift the lid of the box and are suddenly paralyzed by a blinding flash of light.
    ${br}
    As you stand there staring into the open box in your hand, which seems to infinitely extend past its insides, an ominous chorus of laughter emanates from the opening. 
    ${br}
    Your vision begins to narrow as you feel yourself being pulled into the box by some unknown force.
    ${br}
    Shortly after, the lid snaps closed and you were never seen again.
    `,
    // Room 4
    18: `You step into the den, scanning your surroundings for any signs of danger.
    ${br}
    Suddenly, a low growl echoes through the cavern, and you turn just in time to see a massive brown bear charging towards you. You try to run away, but there is no way you can outpace this massive beast. The bear is on you in an instant, there is no escape.`,
    // Room 7
    19: `You climb onto the rickety porch, the wood creaking ominously under your feet. Suddenly, there's a loud crack and the roof above you collapses.
    ${br}
    There is no time to react and you are immediately buried in a pile of splintered wood and rubble.`,
    // Room 11
    20: `You enter the large tunnel, marveling at its grandeur. As you make your way deeper into the cave, you hear a low growl coming from the darkness. Suddenly, a pair of glowing eyes appear, and you realize you're not alone.
    ${br}
    An imposing creature steps out of the shadows and blocks your way. Its eyes lock onto yours and you feel a sense of dread wash over you.
    ${br}
    It snatches you up with one unbelievably large hand and squeezes you tightly. You are unable to escape and your vision fades away to nothing.`,
    // Room 12
    21: `Carefully, you make your way down the slippery slope, your feet sliding out from under you with each step. Suddenly, you lose your footing completely and tumble down the slope. 
    ${br}
    You try to grab onto something to stop your fall, but there's nothing to hold onto. The walls are too slick to gain any purchse.
    ${br}
    You hit the bottom and were never seen again.`,
    default: `You are lost.`,
    999: `Please Start Game`,
  };
  const description = descriptionByRoom[currentRoom];
  const outputDiv = document.getElementById("temp-output");
  const persDiv = document.getElementById("pers-output");
  timer = false;
  setTimeout(() => {
    timer = true;
  }, 100);
  if (typing) {
    // Cancel printing by character and clear the printing field
    outputDiv.innerHTML += "";
    outputDiv.scrollTop = outputDiv.scrollHeight;
    typing = false;
    return;
  }

  typing = true;
  let typedDescription = "";
  let index = 0;
  const speed = 50;

  let audio = new Audio("Sounds/typewriterKey.wav");
  function typeNextChar() {
    textAudio.currentTime = 0;
    if (index < description.length) {
      // If printing has been cancelled, print full content into the text window, persDiv
      if (interrupt) {
        typedDescription += description.substring(index);
        persDiv.innerHTML += typedDescription + "<br>";
        // Scroll window to show most recent content
        persDiv.scrollTop = persDiv.scrollHeight;
        // Clear printing field
        outputDiv.innerHTML = "";
        // Switch typing & interrupt to stop printing
        typing = false;
        interrupt = false;
        // Hide the auto-complete button
        document.querySelector("#complete").classList.add("hide");
        return;
      }
      // Get the specified character in the description and print it while scrolling the window
      typedDescription += description.charAt(index);
      outputDiv.innerHTML = typedDescription;
      outputDiv.scrollTop = outputDiv.scrollHeight;
      index++;
      textAudio.play();
      setTimeout(typeNextChar, speed);
    } else {
      // Print the full content, scroll the window and clear the print field
      persDiv.innerHTML += typedDescription + "<br>";
      persDiv.scrollTop = persDiv.scrollHeight;
      outputDiv.innerHTML = "";
      typing = false;
      // Hide the auto-complete button
      document.querySelector("#complete").classList.add("hide");
    }
  }
  // Add interrupt functionality to button
  document.getElementById("complete").addEventListener("click", function () {
    interrupt = true;
  });

  document.getElementById("input").addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      document.getElementById("input").value === ""
    ) {
      if (timer) {
        interrupt = true;
        timer = false;
      }
    }
  });

  typeNextChar();
  if (typing) {
    // If typing is in progress, show the auto-complete button, otherwise hide it
    document.querySelector("#complete").classList.remove("hide");
  } else {
    document.querySelector("#complete").classList.add("hide");
  }
}

// #endregion

// #region printHelp() for commands

function printHelp() {
  persDiv.innerHTML += `<br><p><strong>For all commands, your capitalization does not matter.</strong></p>`
  persDiv.innerHTML += `<p>* <strong>North</strong> to move North.</p>`
  persDiv.innerHTML += `<p>* <strong>South</strong> to move South.</p>`
  persDiv.innerHTML += `<p>* <strong>East</strong> to move East.</p>`
  persDiv.innerHTML += `<p>* <strong>West</strong> to move West.</p>`
  persDiv.innerHTML += `<p>* <strong>Take</strong> to pick up an item.</p>`
  persDiv.innerHTML += `<p>* <strong>Inv</strong> to check your inventory.</p>`
  persDiv.innerHTML += `<p>* <strong>Look</strong> to examine your surroundings.</p>`
}

// #endregion

// #region printLook() for room description
function printLook() {
  const description = lookDescription[currentRoom];
  const outputDiv = document.getElementById("temp-output");
  const persDiv = document.getElementById("pers-output");
  timer = false;
  setTimeout(() => {
    timer = true;
  }, 100);
  if (typing) {
    // Cancel printing by character and clear the printing field
    outputDiv.innerHTML += "";
    outputDiv.scrollTop = outputDiv.scrollHeight;
    typing = false;
    return;
  }

  typing = true;
  let typedDescription = "";
  let index = 0;
  const speed = 50;

  let audio = new Audio("Sounds/typewriterKey.wav");
  function typeNextChar() {
    textAudio.currentTime = 0;
    if (index < description.length) {
      // If printing has been cancelled, print full content into the text window, persDiv
      if (interrupt) {
        typedDescription += description.substring(index);
        persDiv.innerHTML += typedDescription + "<br>";
        // Scroll window to show most recent content
        persDiv.scrollTop = persDiv.scrollHeight;
        // Clear printing field
        outputDiv.innerHTML = "";
        // Switch typing & interrupt to stop printing
        typing = false;
        interrupt = false;
        // Hide the auto-complete button
        document.querySelector("#complete").classList.add("hide");
        return;
      }
      // Get the specified character in the description and print it while scrolling the window
      typedDescription += description.charAt(index);
      outputDiv.innerHTML = typedDescription;
      outputDiv.scrollTop = outputDiv.scrollHeight;
      index++;
      textAudio.play();
      setTimeout(typeNextChar, speed);
    } else {
      // Print the full content, scroll the window and clear the print field
      persDiv.innerHTML += typedDescription + "<br>";
      persDiv.scrollTop = persDiv.scrollHeight;
      outputDiv.innerHTML = "";
      typing = false;
      // Hide the auto-complete button
      document.querySelector("#complete").classList.add("hide");
    }
  }
  // Add interrupt functionality to button
  document.getElementById("complete").addEventListener("click", function () {
    interrupt = true;
  });

  document.getElementById("input").addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      document.getElementById("input").value === ""
    ) {
      if (timer) {
        interrupt = true;
        timer = false;
      }
    }
  });

  typeNextChar();
  if (typing) {
    // If typing is in progress, show the auto-complete button, otherwise hide it
    document.querySelector("#complete").classList.remove("hide");
  } else {
    document.querySelector("#complete").classList.add("hide");
  }
}

// #endregion

// #region Detailed Room Descriptions

const textElement = document.querySelector("#pers-output");

let north = '<span id="black-span"><strong>North</strong></span>';
let south = '<span id="white-span"><strong>South</strong></span>';
let east = '<span id="red-span"><strong>East</strong></span>';
let west = '<span id="yellow-span"><strong>West</strong></span>';

const lookDescription = {
  1: `<p>You are surrounded by trees on all sides. Birds and squirrels are flitting about in the treetops, chirping and chittering without a care in the world. The leaves rustle in the wind and you get a strong whiff of pine needles, damp leaves and dirt. There is a clear path to the ${north} and you can make out a building in the distance. There is also an overgrown path to the ${east}, leading deeper into the forest.</p>`,

  2: `<p>You see a large shack ahead; the door is slightly ajar and you can hear some slow shuffling and scraping on wood coming from inside. Could it be someone who can help you, or could it be your assailant? As you ponder this, a dark silhouette passes across the gap between the door and the doorframe. A dense line of trees are to the east and to the west. There is a path to the ${south} leading deeper into the forest and a path to the ${north} leading into the shack.</p>`,

  3: `<p>The canopy blocks most of the light here and you can barely see past the wall of brush and brambles around you. The forest floor is covered in a thick layer of leaves and sticks; the overgrowth is suffocating. You can barely make out a narrow track of dirt on the ground leading ${west}, as well as to the ${north} and to the ${south}. There is a hollowed out tree to the ${east}. There seems to be a small white box lying on the ground there.</p>`,

  4: `<p>You can see some sunlight coming through the tops of the trees. There is a brook nearby and the light is glinting off the water with a quiet brilliance. You wouldn't really mind staying here forever and you consider the option. After a few moments you snap out of your thoughts and rub your eyes. This place is bewitching and must hold some dark magic as it would be insane to stop here considering you can see what appears to be a bears den to the ${west}. However, you are very thirsty... There is a path to the ${south} through a dense wall of brambles and a path leading ${north} alongside the brook. There is a impassable cliff wall to the east.</p>`,

  5: `<p>There is a hill to the south which is much to steep to climb. The gentle sound of nature here soothes you and the forest seems to be getting thinner. A refreshing breeze blows across your face and through your disheveled hair. A brook winds down the hill in a zig-zag, babbling over a bed of stones and pebbles before entering spring. There are a few fish darting about beneath the surface of the spring, that water is clear enough you can see to the bottom. There is an impassable cliff wall to the east and a steep drop to the north. A well-worn path leads from the spring to the ${west}.</p>`,

  6: `<p>The trees sparsely line the side of the path, their trunks and limbs creating a natural archway. The forest floor is carpeted with a thin layer of fallen leaves and twigs, and shafts of sunlight filter through the branches overhead. The powerful aroma of pine needles and damp earth fills the air around you. There is a clear path leading ${west} and through the archway you can see a manor in the distance. The path extends into the ${east}, leading deeper into the forest. The edge of a cliff lies to the north and a thicket of trees to the south.</p>`,

  7: `<p>The manor is very old and falling apart. Boards hang from the walls at different angles, barely holding on by nails that are nearly rusted away. The rafters and purlins above the porch are bowed down as if a giant were resting on the roof. The balusters have nearly fallen away and the handrail is supported by the few remaining. There is a door to the ${south} leading into the manor, and an open doorway on the porch to the ${west} also leading inside. There is a path with few pieces of gravel embedded in the dirt leading to the east into a forest.</p>`,

  8: `<p>The foyer is littered with broken items and covered in a thick later of dust. Taking a closer look at the items laying about the floor, you can see what appears to be a rapier sticking halfway out of the floorboards. It would be useful to have a weapon, but you aren't sure if it would be wise to retrieve it not knowing who the owner is, or why it is stuck into the floor. There is an open doorway to the ${north} and a staircase to the ${south}.</p>`,

  9: `There is a staircase to the ${west} leading to the upper floors of the mansion. Its once-polished wood banister and ornate ironwork balustrade are now rusted and warped. A doorway to the ${south} leads down into a dark, musty cellar. The air emanating from below is thick with the smell of damp earth and mildew. It's a foreboding entrance, a place where secrets and danger lurk in the shadows. `,

  10: `The dark and musty cellar exudes an air of decay and disuse. Dampness clings to the air, and the walls are slick with moisture. To the ${west}, a doorway leads to what looks to be a cistern. To the ${east}, a large hole lined with smooth stones has been dug into the wall of dirt and rock. The darkness beyond suggest danger and promises the unknown.`,

  11: `You are inside a dark, damp grotto. The air here is cool and damp, with the scent of earth and moss. The echoes of dripping water and skittering creatures fill the space. A large tunnel leads to the ${south} deeper into the darkness. There is a doorway to the ${west}, its entrance is slightly obscured by hanging vines and shadows and o the ${east}, a dim light bleeds through a narrow passageway.`,

  12: `You are in a grotto room with sparkling stalactites hanging from the ceiling. The  sound of trickling water echoes through the room. Light streams in from a hole to the north, offering a tantalizing glimpse of the outside world, but it's too steep to climb. To the ${east}, a collapsed hole leads down into the unknown depths. To the ${west}, a narrow passageway promises the possibility of escape, but also the danger of the unknown.`,

  13: `The cistern walls are lined with thick moss and lichen. The smell of damp earth and stagnant water fills the air, adding to the eerie atmosphere. A staircase made of cobbled stone leads down into the floor to the west, offering a glimpse of the unknown depths below. To the east, a doorway leads back into the cellar, a reminder of the crumbling mansion above. It's a place where time seems to stand still, where the echoes of past secrets reverberate off the damp walls.`,

  14: `You are at the top landing of the staircase. There are barely discernable paintings hung along the wall running along the balconies to the north and south. Between each painting is a sconce, some of which have completely flipped upside down. The balusters seem barely able to stand and slightly lean askew over the room below. At each end of the balcony to the north and south is a door.`,

  15: `No description yet.`,

  16: `No description yet.`,

  17: `No description yet.`,
};

// #endregion

// #region itemList

const itemList = {
  1: " Stick",
  2: " Rusted Key",
  3: " Dirty Twinkie",
  4: " Jamie Flynt",
  5: " John Hunter",
  6: " Your Mom",
  7: " What even is this?",
  8: "No item yet.",
  9: "No item yet.",
  10: "No item yet.",
  11: "No item yet.",
  12: "No item yet.",
  13: "No item yet.",
  14: "No item yet.",
  15: "No item yet.",
  16: "No item yet.",
  17: "No item yet.",
  18: "No item yet.",
  19: "No item yet.",
  20: "No item yet.",
  21: "No item yet.",
};

// #endregion

// #region Take Item  ========================================

function takeItem() {
  const roomItem = itemList[currentRoom];

  if (roomItem === undefined) {
    errorAudio.play();
    persDiv.innerHTML += `${br}There is nothing worth taking.`;
    persDiv.scrollTop = persDiv.scrollHeight;
    return;
  }

  if (inventory.includes(roomItem)) {
    errorAudio.play();
    persDiv.innerHTML += `${br}You have already searched this room.`;
    persDiv.scrollTop = persDiv.scrollHeight;
    return;
  }

  inventory.push(roomItem);
  itemList[currentRoom] = undefined;
  successAudio.play();

  persDiv.innerHTML += `${br}You picked up a ${roomItem}`;
  persDiv.scrollTop = persDiv.scrollHeight;
}
// #endregion

// #region Room Connections & Transitions  =========================================

// DIRECTIONS
let waitingForDescription = false;
function handleInput(input) {
  const roomTransitions = {
    1: {
      north: 2,
      east: 3,
      look: "look",
      take: "take",
      help: "help",
    },

    2: {
      north: 16,
      south: 1,
      look: "look",
      take: "take",
      help: "help",
    },

    3: {
      north: 4,
      south: 12,
      east: 17,
      west: 1,
      look: "look",
      take: "take",
      help: "help",
    },

    4: {
      north: 5,
      south: 3,
      west: 18,
      look: "look",
      take: "take",
      help: "help",
    },

    5: {
      west: 6,
      look: "look",
      take: "take",
      help: "help",
    },

    6: {
      east: 5,
      west: 7,
      south: 16,
      look: "look",
      take: "take",
      help: "help",
    },

    7: {
      east: 6,
      west: 19,
      south: 8,
      look: "look",
      take: "take",
      help: "help",
    },

    8: {
      north: 7,
      south: 9,
      look: "look",
      take: "take",
      help: "help",
    },

    9: {
      north: 8,
      south: 10,
      west: 14,
      look: "look",
      take: "take",
      help: "help",
    },

    10: {
      north: 9,
      west: 13,
      east: 11,
      look: "look",
      take: "take",
      help: "help",
    },

    11: {
      west: 10,
      east: 12,
      south: 20,
      look: "look",
      take: "take",
      help: "help",
    },

    12: {
      east: 21,
      west: 11,
      look: "look",
      take: "take",
      help: "help",
    },

    13: {
      west: 15,
      look: "look",
      take: "take",
      help: "help",
    },

    14: {
      east: 9,
      look: "look",
      take: "take",
      help: "help",
      north: 141,
      south: 142,
    },

    15: {
      north: "win",
      south: "win",
      west: "win",
      look: "look",
      take: "take",
      help: "help",
    },
  };

  const transition = roomTransitions[currentRoom]?.[input];
  const transNorth = roomTransitions[currentRoom]?.["north"];
  const transSouth = roomTransitions[currentRoom]?.["south"];
  const transEast = roomTransitions[currentRoom]?.["east"];
  const transWest = roomTransitions[currentRoom]?.["west"];
  const north =
    '<p>You head <span id="black-span"><strong>North</strong></span>.</p>';
  const south =
    '<p>You head <span id="white-span"><strong>South</strong></span>.</p>';
  const east =
    '<p>You head <span id="red-span"><strong>East</strong></span>.</p>';
  const west =
    '<p>You head <span id="yellow-span"><strong>West</strong></span>.</p>';
  if (currentRoom === 141 || currentRoom === 142) {
    currentRoom = 14;
  } else if (transition === undefined) {
    deadEnd();
  } else if (transition === transNorth) {
    previousRoom = currentRoom;
    currentRoom = transition;
    document.getElementById("room-id").innerHTML = "";
    document.getElementById(
      "room-id"
    ).innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    footstepsGravelAudio.play();
    document.getElementById("pers-output").innerHTML += north;
    printRoomDescription();
  } else if (transition === transSouth) {
    previousRoom = currentRoom;
    currentRoom = transition;
    document.getElementById("room-id").innerHTML = "";
    document.getElementById(
      "room-id"
    ).innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    footstepsGravelAudio.play();
    document.getElementById("pers-output").innerHTML += south;
    printRoomDescription();
  } else if (transition === transEast) {
    previousRoom = currentRoom;
    currentRoom = transition;
    document.getElementById("room-id").innerHTML = "";
    document.getElementById(
      "room-id"
    ).innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    footstepsGravelAudio.play();
    document.getElementById("pers-output").innerHTML += east;
    printRoomDescription();
  } else if (transition === transWest) {
    previousRoom = currentRoom;
    currentRoom = transition;
    document.getElementById("room-id").innerHTML = "";
    document.getElementById(
      "room-id"
    ).innerHTML += `Current Room: ${currentRoom}, Previous Room: ${previousRoom}`;
    footstepsGravelAudio.play();
    document.getElementById("pers-output").innerHTML += west;
    printRoomDescription();
  } else if (transition === "help"){
    printHelp();
  } else if (transition === "look") {
    printLook();
  } else if (transition === "take") {
    takeItem();
  } else if (transition === "win") {
    alert("You Win!");
    win();
  } else {
    previousRoom = currentRoom;
    currentRoom = transition;
    footstepsGravelAudio.play();
    printRoomDescription();
  }
  document.getElementById("input").value = "";
}

function deadEnd() {
  blocked = `<p>You can't go that way.</p>`;
  errorAudio.play();
  persDiv.innerHTML += blocked;
  persDiv.scrollTop = persDiv.scrollHeight;
}

// #endregion

// MAP
// 1 = '   ',
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
