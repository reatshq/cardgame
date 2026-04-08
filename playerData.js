import { gameElements } from "./script.js"; 

export let cash = 100;

export function updateCash(amt, o)
{
    o == "+"? cash += amt : o == "-"? cash -= amt : null;
    gameElements.cashdiv.firstElementChild.textContent = "$" + cash;
}