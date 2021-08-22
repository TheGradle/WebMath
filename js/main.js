var equation_span = document.getElementById("equation");
var user_answer = document.getElementById("user-answer");
var next_equation_btn = document.getElementById("next-equation");
var result = document.getElementById("result");
var equation_block = document.getElementById("equation-block");
var result_block = document.getElementById("result-block");
var refresh_btn = document.getElementById("refresh");
var user_number = document.getElementById("number-of-equation");
var settings_modal = document.getElementById("settings");
var settings_open_btn = document.getElementById("open-settings");
var settings_close_btn = document.getElementById("close-settings");
var save_settings_btn = document.getElementById("save-settings");
var counter = 0;
var number = 10;

function getRandomInt(max)
{
  return Math.floor(Math.random() * max);
}

function MakeEquation()
{
  let a = getRandomInt(10);
  let b = getRandomInt(10);
  let func = (getRandomInt(2) == 1) ? " + " : " - ";

  if ((func == " + " && a + b > 10) || (func == " - " && a - b < 0)) {
    return MakeEquation();
  }

  return [a + func + b, (func == " + ") ? a + b : a - b];
}

function WriteEquation()
{
  equation = MakeEquation();

  equation_span.innerHTML = equation[0];
  user_answer.setAttribute("answer", equation[1]);
}

document.addEventListener("DOMContentLoaded", function()
{
  WriteEquation();
});

next_equation_btn.addEventListener("click", function()
{
  counter++;
  result.innerHTML += ((user_answer.value == user_answer.getAttribute("answer")) ? "✅ " : "❌ ") + equation_span.innerHTML + " = " + user_answer.value + "<br>";

  if (number > counter) {
    WriteEquation();
  }
  else {
    result_block.style.display = "block";
    equation_block.style.display = "none";
  }

  user_answer.value = "";
});

save_settings_btn.addEventListener("click", function()
{
  number = user_number.value;
  settings_modal.style.display = "none";
});

refresh_btn.addEventListener("click", function(){
  location.reload();
});

user_answer.addEventListener("keyup", function(event)
{
  if (event.keyCode === 13) {
    event.preventDefault();
    next_equation_btn.click();
  }
});

settings_open_btn.addEventListener("click", function()
{
  settings_modal.style.display = "block";

  user_number.value = number;
});

settings_close_btn.addEventListener("click", function()
{
  settings_modal.style.display = "none";
});

window.addEventListener("click", function()
{
  if (event.target == settings_modal) {
    settings_modal.style.display = "none";
  }
});