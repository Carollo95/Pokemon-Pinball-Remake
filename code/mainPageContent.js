function setPageContents() {
  const instructionsElement = document.getElementById("keyboard-instructions-text");
  const desktopHighScoresElement = document.getElementById("desktop-high-scores");
  const desktopHighScoresTitleElement = document.getElementById("desktop-high-scores-title");
  const desktopHighScoresRedTitleElement = document.getElementById("desktop-high-scores-red-title");
  const desktopHighScoresBlueTitleElement = document.getElementById("desktop-high-scores-blue-title");
  const desktopHighScoresRedTableElement = document.getElementById("desktop-high-scores-red-table");
  const desktopHighScoresBlueTableElement = document.getElementById("desktop-high-scores-blue-table");
  const desktopPokedexStatsElement = document.getElementById("desktop-pokedex-stats");
  const desktopPokedexTitleElement = document.getElementById("desktop-pokedex-title");
  const lastCapturedTitleElement = document.getElementById("desktop-last-captured-title");

  if (!instructionsElement) {
    return;
  }

  instructionsElement.innerHTML = I18NManager.translate("keyboard_instructions");

  if (desktopHighScoresElement) {
    desktopHighScoresElement.setAttribute("aria-label", I18NManager.translate("desktop_high_scores_aria"));
  }

  if (desktopHighScoresTitleElement) {
    desktopHighScoresTitleElement.textContent = I18NManager.translate("desktop_high_scores_title");
  }

  if (desktopHighScoresRedTitleElement) {
    desktopHighScoresRedTitleElement.textContent = I18NManager.translate("desktop_high_scores_red_title");
  }

  if (desktopHighScoresBlueTitleElement) {
    desktopHighScoresBlueTitleElement.textContent = I18NManager.translate("desktop_high_scores_blue_title");
  }

  if (desktopHighScoresRedTableElement) {
    desktopHighScoresRedTableElement.setAttribute("aria-label", I18NManager.translate("desktop_high_scores_red_aria"));
  }

  if (desktopHighScoresBlueTableElement) {
    desktopHighScoresBlueTableElement.setAttribute("aria-label", I18NManager.translate("desktop_high_scores_blue_aria"));
  }

  if (desktopPokedexStatsElement) {
    desktopPokedexStatsElement.setAttribute("aria-label", I18NManager.translate("desktop_pokedex_stats_aria"));
  }

  if (desktopPokedexTitleElement) {
    desktopPokedexTitleElement.textContent = I18NManager.translate("desktop_pokedex_title");
  }

  if (lastCapturedTitleElement) {
    lastCapturedTitleElement.textContent = I18NManager.translate("last_captured_pokemon_title");
  }

  updateDesktopStatsFromLocalStorage();
}

function initializeMainPageContent() {
  setPageContents();
  window.setInterval(updateDesktopStatsFromLocalStorage, 1000);
}

function updateDesktopStatsFromLocalStorage() {
  updateDesktopHighScores("RED", "desktop-high-scores-red");
  updateDesktopHighScores("BLUE", "desktop-high-scores-blue");
  updateDesktopPokedexStats();
}

function updateDesktopHighScores(table, listElementId) {
  const listElement = document.getElementById(listElementId);

  if (!listElement) {
    return;
  }

  listElement.innerHTML = "";

  const defaultHighScoreData = [
    { name: [13, 8, 13], points: "500000000" },
    { name: [2, 17, 4], points: "400000000" },
    { name: [6, 0, 12], points: "300000000" },
    { name: [7, 0, 11], points: "200000000" },
    { name: [9, 20, 15], points: "100000000" }
  ];

  const rawData = readJsonFromLocalStorage(`highScoreData-${table}`, defaultHighScoreData);
  const data = Array.isArray(rawData) ? rawData.slice(0, 5) : defaultHighScoreData;

  data.forEach((entry) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const pointsCell = document.createElement("td");

    const name = decodeHighScoreName(entry.name);
    const points = Number(entry.points || 0).toLocaleString();

    nameCell.className = "score-name";
    pointsCell.className = "score-points";

    nameCell.textContent = name;
    pointsCell.textContent = points;

    row.appendChild(nameCell);
    row.appendChild(pointsCell);
    listElement.appendChild(row);
  });
}

function decodeHighScoreName(nameFrames) {
  if (!Array.isArray(nameFrames)) {
    return "---";
  }

  return nameFrames
    .slice(0, 3)
    .map((value) => {
      if (value >= 0 && value <= 25) {
        return String.fromCharCode(65 + value);
      }

      if (value === 46) {
        return " ";
      }

      return "-";
    })
    .join("");
}

function updateDesktopPokedexStats() {
  const countElement = document.getElementById("desktop-caught-seen-count");
  const lastCapturedElement = document.getElementById("desktop-last-captured-list");

  if (!countElement || !lastCapturedElement) {
    return;
  }

  const obtainedPokemon = readJsonFromLocalStorage("obtainedPokemon", []);
  const seenPokemon = readJsonFromLocalStorage("seenPokemon", []);

  const capturedCount = Array.isArray(obtainedPokemon) ? obtainedPokemon.length : 0;
  const seenCount = Array.isArray(seenPokemon) ? seenPokemon.length : 0;
  countElement.textContent = `${capturedCount}/${seenCount}`;

  lastCapturedElement.innerHTML = "";

  if (!Array.isArray(obtainedPokemon) || obtainedPokemon.length === 0) {
    return;
  }

  const latestFive = obtainedPokemon.slice(-5).reverse();
  latestFive.forEach((pokemonId) => {
    const pokemon = getPokemonById(pokemonId);
    if (!pokemon) {
      return;
    }

    const item = document.createElement("li");
    item.textContent = capitalizeFirstLetter(I18NManager.translate(pokemon.name));
    lastCapturedElement.appendChild(item);
  });
}

function capitalizeFirstLetter(text) {
  if (typeof text !== "string" || text.length === 0) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function readJsonFromLocalStorage(key, fallbackValue) {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return fallbackValue;
    }

    return JSON.parse(value);
  } catch (error) {
    return fallbackValue;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("red-field").addEventListener("click", CheatEngine.startRedField);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("blue-field").addEventListener("click", CheatEngine.startBlueField);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ghost-stage").addEventListener("click", CheatEngine.startGhostStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("mole-stage").addEventListener("click", CheatEngine.startMoleStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cat-stage").addEventListener("click", CheatEngine.startCatStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("seal-stage").addEventListener("click", CheatEngine.startSealStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("clone-stage").addEventListener("click", CheatEngine.startCloneStage);
});

document.addEventListener('DOMContentLoaded', function () {
  const bonusStageSelectorButtons = document.getElementById('bonus-stage-selector-buttons');
  if (bonusStageSelectorButtons && typeof DEBUG !== 'undefined' && DEBUG) {
    bonusStageSelectorButtons.style.display = 'flex';
  }
});
