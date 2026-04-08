import { cards } from "./cardsData.js";
import { gameElements, openCardInfo } from "./script.js";
import { cash, updateCash } from "./playerData.js"; 

function createBuyCardsView()
{
    gameElements.cbcv.innerHTML = ``;
    cards.filter(card => card.onstore && card.stats == "b").forEach(card => {
        const buyCardUI = document.createElement('div');
        buyCardUI.className = 'buyCardUI';
        const buyCardPrice = document.createElement('span');
        buyCardPrice.textContent = "$" + card.price;
        const cardUI = document.createElement('div');
        cardUI.id = "c-o";
        cardUI.classList = "buycard";
        
        cardUI.innerHTML = `
        <div style="display: flex; padding: 0% 2% 0% 2%;"><span style="margin: auto;">${card.name}</span></div>
        <div id="c-img" style="background-image: url('assets/avatars/${card.name}.png');"></div>
        <div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Attack</span><div id="c-bar-a-b"><span id="c-t-a">${card.attack}</span><div id="c-bar-a-v" style='width: ${(card.attack / 15) * 100}%;'></div></div></div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Health</span><div id="c-bar-h-b"><span id="c-t-h">${card.health}</span><div id="c-bar-h-v" style='width: ${(card.health / 15) * 100}%;'></div></div></div>
        </div>`;

        buyCardUI.append(cardUI);
        buyCardUI.append(buyCardPrice);
        cardUI.onclick = () => openCardInfo(card.id, "BUY");
        gameElements.cbcv.append(buyCardUI);
    })
    gameElements.buyccount.textContent = gameElements.cbcv.childElementCount;
}

function createOwnedCardsView()
{
    gameElements.cocsv.innerHTML = ``;
    cards.filter(card => card.onstore && (card.stats == "o" || card.stats == "e")).forEach(card => {
        const buyCardUI = document.createElement('div');
        buyCardUI.className = 'buyCardUI';
        const buyCardPrice = document.createElement('span');
        buyCardPrice.textContent = "$" + card.price;
        const cardUI = document.createElement('div');
        cardUI.id = "c-o";
        cardUI.classList = "ownedcard";
        
        cardUI.innerHTML = `
        <div style="display: flex; padding: 0% 2% 0% 2%;"><span style="margin: auto;">${card.name}</span></div>
        <div id="c-img" style="background-image: url('assets/avatars/${card.name}.png');"></div>
        <div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Attack</span><div id="c-bar-a-b"><span id="c-t-a">${card.attack}</span><div id="c-bar-a-v" style='width: ${(card.attack / 15) * 100}%;'></div></div></div>
            <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Health</span><div id="c-bar-h-b"><span id="c-t-h">${card.health}</span><div id="c-bar-h-v" style='width: ${(card.health / 15) * 100}%;'></div></div></div>
        </div>`;

        buyCardUI.append(cardUI);
        buyCardUI.append(buyCardPrice);
        cardUI.onclick = () => openCardInfo(card.id, "EQUIP");
        gameElements.cocsv.append(buyCardUI);
    })
    gameElements.owsccount.textContent = gameElements.cocsv.childElementCount;
}

export function showThebuycards()
{
    createBuyCardsView();
    createOwnedCardsView();
}

export function buyCard(id)
{
    if(cash >= cards.find(card => card.id == id).price)
    {
        cards.find(card => card.id == id).stats = "o";
        updateCash(cards.find(card => card.id == id).price, "-")
    }
    else
    {
        alert("you need $" + (cards.find(card => card.id == id).price - cash) + " more")
    }
    showThebuycards();
}