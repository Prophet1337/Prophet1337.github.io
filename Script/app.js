const user_score_span = document.getElementById("user_score");
const comp_score_span = document.getElementById("comp_score");
const result_p = document.getElementById("result");
const comp_choice_p = document.getElementById("comp_choice");
const combat_div = document.getElementById("combat");
const choices_div = document.getElementById("choices");
const paper_div = document.getElementById("p");
const rock_div = document.getElementById("r");
const scissors_div = document.getElementById("s");
const combat_div_childs = combat_div.children;
const choices_div_childs = choices_div.children;

let userScore = 0;
let compScore = 0;
let listener = true;

const main = () => {
  paper_div.addEventListener("click", function() {
    if (listener) {
      listener = false;
      style_choice(this);
      setTimeout(() => {
        game("p");
      }, 500);
    }
  });
  rock_div.addEventListener("click", function() {
    if (listener) {
      listener = false;
      style_choice(this);
      setTimeout(() => {
        game("r");
      }, 500);
    }
  });
  scissors_div.addEventListener("click", function() {
    if (listener) {
      listener = false;
      style_choice(this);
      setTimeout(() => {
        game("s");
      }, 500);
    }
  });
};

const game = player => {
  const comp = comp_choice_generator();
  style_combat();
  style_count_down(comp);
  switch (player + comp) {
    case "pr":
    case "rs":
    case "sp":
      setTimeout(() => {
        win(player, comp);
      }, 4000);
      break;
    case "ps":
    case "rp":
    case "sr":
      setTimeout(() => {
        lose(player, comp);
      }, 4000);
      break;
    case "pp":
    case "rr":
    case "ss":
      setTimeout(() => {
        draw(player);
      }, 4000);
  }
  setTimeout(() => {
    style_back_to_start();
  }, 5500);
};

// ----- STYLES -----

const style_choice = that => {
  that.classList.add("on_top");
  choices_div.classList.toggle("hover_effect");
  rock_div.style.transform = "translate(-110px)";
  scissors_div.style.transform = "translate(-220px)";
};

const style_combat = () => {
  combat_div.style.opacity = "1";
  for (i = 0; i < 3; i++) {
    Object.assign(choices_div_childs[i].style, {
      transition: "1s",
      borderColor: "rgb(180, 160, 20)",
      backgroundColor: "black"
    });
  }
};

const style_count_down = comp => {
  let timer = 4;
  const count_down = () => {
    timer--;
    comp_choice_p.innerHTML = timer;
    if (timer == 0) {
      clearInterval(interval);
      create_comp_choice_icon(comp);
    }
  };
  const interval = setInterval(count_down, 1000);
};

const create_comp_choice_icon = comp => {
  let icon = document.createElement("img");
  switch (comp) {
    case "p":
      icon.src = "../Img/paper.svg";
      break;
    case "r":
      icon.src = "../Img/rock.svg";
      break;
    case "s":
      icon.src = "../Img/scissors.svg";
  }
  comp_choice_p.style.display = "none";
  comp_choice_p.innerHTML = "?";
  comp_choice_p.parentNode.appendChild(icon);
};

const style_back_to_start = () => {
  for (let i = 0; i < 3; i++) {
    choices_div_childs[i].removeAttribute("style");
  }
  setTimeout(() => {
    listener = true;
    choices_div.classList.toggle("hover_effect");
    comp_choice_p.parentNode.removeChild(comp_choice_p.parentNode.lastChild);
    combat_div_childs[1].removeAttribute("style");
    comp_choice_p.removeAttribute("style");
    combat_div.removeAttribute("style");
    for (let i = 0; i < 3; i++) {
      choices_div_childs[i].classList.remove("on_top");
      combat_div_childs[i].removeAttribute("style");
    }
  }, 500);
};

// ----- LOGIC -----

const comp_choice_generator = () => {
  const choices = ["p", "r", "s"];
  return choices[Math.floor(Math.random() * 3)];
};

const win = (player, comp) => {
  userScore++;
  user_score_span.innerHTML = userScore;
  result_p.innerHTML = convert(player, comp) + " Wygrywasz rundę!";
  user_score_span.style.color = "green";
  combat_div_childs[1].style.color = "green";
  const css_string = { transition: "0s", borderColor: "green" };
  for (let i = 0; i < 3; i++) {
    Object.assign(combat_div_childs[i].style, css_string);
    Object.assign(choices_div_childs[i].style, css_string);
  }
  setTimeout(() => {
    user_score_span.removeAttribute("style");
  }, 250);
};

const lose = (player, comp) => {
  compScore++;
  comp_score_span.innerHTML = compScore;
  result_p.innerHTML = convert(player, comp) + " Przegrywasz rundę!";
  comp_score_span.style.color = "red";
  combat_div_childs[1].style.color = "red";
  const css_string = { transition: "0s", borderColor: "red" };
  for (let i = 0; i < 3; i++) {
    Object.assign(combat_div_childs[i].style, css_string);
    Object.assign(choices_div_childs[i].style, css_string);
  }
  setTimeout(() => {
    comp_score_span.removeAttribute("style");
  }, 250);
};

const draw = player => {
  let choice = "";
  switch (player) {
    case "p":
      choice = "papier";
      break;
    case "r":
      choice = "kamień";
      break;
    case "s":
      choice = "nożyce";
      break;
  }
  result_p.innerHTML = "Dwa razy " + choice + ". Runda jest remisowa!";
};

const convert = (player, comp) => {
  switch (player + comp) {
    case "pr":
    case "rp":
      return "Papier owija kamień.";
    case "ps":
    case "sp":
      return "Nożyce tną papier.";
    case "rs":
    case "sr":
      return "Kamień tępi nożyce.";
  }
};

main();
