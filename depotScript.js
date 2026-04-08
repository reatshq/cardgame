import { cards } from "./cardsData.js";
import { gameElements, openCardInfo } from "./script.js";

function createEquippedCardsView()
{
    gameElements.cecv.innerHTML = ``;
    cards.filter(card => card.stats == "e").forEach(card => {
        const cardUI = document.createElement('div');
        cardUI.id = "c-o";
        cardUI.classList = "uneqpcard";
        
        cardUI.innerHTML = `
        <div style="display: flex; padding: 0% 2% 0% 2%;"><span style="margin: auto;">${card.name}</span></div>
        <div id="c-img" style="background-image: url('assets/avatars/${card.name}.png');"></div>
        <div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Attack</span><div id="c-bar-a-b"><span id="c-t-a">${card.attack}</span><div id="c-bar-a-v" style='width: ${(card.attack / 15) * 100}%;'></div></div></div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Health</span><div id="c-bar-h-b"><span id="c-t-h">${card.health}</span><div id="c-bar-h-v" style='width: ${(card.health / 15) * 100}%;'></div></div></div>
        </div>`;

        //cardUI.onclick = () => unequipCard(card.id);
        cardUI.onclick = () => openCardInfo(card.id, "UNEQUIP");
        gameElements.cecv.append(cardUI);        
    })
    gameElements.eqccount.textContent = gameElements.cecv.childElementCount;
}

function createOwnedCardsView()
{
    gameElements.cocv.innerHTML = ``;
    cards.filter(card => card.stats == "o").forEach(card => {
        const cardUI = document.createElement('div');
        cardUI.id = "c-o";
        cardUI.classList = "eqpcard";
        
        cardUI.innerHTML = `
        <div style="display: flex; padding: 0% 2% 0% 2%;"><span style="margin: auto;">${card.name}</span></div>
        <div id="c-img" style="background-image: url('assets/avatars/${card.name}.png');"></div>
        <div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Attack</span><div id="c-bar-a-b"><span id="c-t-a">${card.attack}</span><div id="c-bar-a-v" style='width: ${(card.attack / 15) * 100}%;'></div></div></div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Health</span><div id="c-bar-h-b"><span id="c-t-h">${card.health}</span><div id="c-bar-h-v" style='width: ${(card.health / 15) * 100}%;'></div></div></div>
        </div>`;

        cardUI.onclick = () => openCardInfo(card.id, "EQUIP");
        gameElements.cocv.append(cardUI);        
    })
    gameElements.owccount.textContent = gameElements.cocv.childElementCount;
}

export function showThedepot()
{
    createEquippedCardsView();
    createOwnedCardsView();
}

export function equipCard(id)
{
    cards.find(card => card.id == id).stats = "e";
    showThedepot();
}

export function unequipCard(id)
{
    cards.find(card => card.id == id).stats = "o";
    showThedepot();
}