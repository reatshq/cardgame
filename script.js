import { showThedepot } from "./depotScript.js";
import { showThebattle, createEquippedCardsViewForMatch } from "./battleScript.js";
import { showThebuycards } from "./buycardsScript.js";
import { cash, updateCash } from "./playerData.js";
import { cards } from "./cardsData.js";
import { equipCard, unequipCard } from "./depotScript.js";
import { buyCard } from "./buycardsScript.js";

export const gameElements = {
    app: document.getElementById('app'),
    battleapp: document.getElementById('battle-app'),
    navdepotb: document.getElementById('nav-depot-b'),
    navbattleb: document.getElementById('nav-battle-b'),
    navbuycardsb: document.getElementById('nav-buycards-b'),
    depotscreen: document.getElementById('depot-screen'),
    battlescreen: document.getElementById('battle-screen'),
    buycardsscreen: document.getElementById('buycards-screen'),
    cecv: document.getElementById('c-ec-v'),
    cocv: document.getElementById('c-oc-v'),
    cecbv: document.getElementById('c-ecb-v'),
    cbcv: document.getElementById('c-bc-v'),
    cocsv: document.getElementById('c-ocs-v'),
    cashdiv: document.getElementById('cash-div'),
    eqccount: document.getElementById('eqc-count'),
    owccount: document.getElementById('owc-count'),
    eqbccount: document.getElementById('eqbc-count'),
    buyccount: document.getElementById('buyc-count'),
    owsccount: document.getElementById('owsc-count'),
    battlebutton: document.getElementById("battle-button"),
    cecmv: document.getElementById("c-ecm-v")
}

gameElements.navdepotb.onclick = () => { changeScreen("depot") }
gameElements.navbattleb.onclick = () => { changeScreen("battle") }
gameElements.navbuycardsb.onclick = () => { changeScreen("buycards") }

gameElements.battlebutton.onclick = () => { gotothebatle() }

function changeScreen(srnName)
{
    gameElements.depotscreen.style.display = 'none';
    gameElements.battlescreen.style.display = 'none';
    gameElements.buycardsscreen.style.display = 'none';

    gameElements[srnName + "screen"].style.display = 'flex';

    srnName == "depot"? showThedepot() : srnName == "battle"? showThebattle() : srnName == "buycards"? showThebuycards() : null;
}

changeScreen("depot")
updateCash(cash,"")

export function openCardInfo(id, s)
{
    let card = cards.find(card => card.id == id);
    const cardIndoPanelBG = document.getElementById("cardInfoBG");
    const cardIndoPanel = document.getElementById("cardInfo");
    cardIndoPanelBG.style.display = 'flex';
    const cardCloseButton = document.createElement("button");
    cardCloseButton.textContent = "Close";
    cardCloseButton.onclick = () => closeInfoCard();
    const cardActionButton = document.createElement("div");
    cardActionButton.id = "icardActionB";
    cardActionButton.textContent = s;
    cardActionButton.className = "ib" + s;
    cardActionButton.onclick = () => cardActionStats(s, id);
    cardIndoPanel.innerHTML = `
        <div id='iheader' class='iheader'>Card Info</div>
        <div class='iCardDet'>
            <div style="display: flex; flex-direction: column; width: 50%; padding: 1%;">
                <div id="c-img" style="background-image: url('assets/avatars/${card.name}.png');"></div>
                <div id='icardVals' style="flex: 1;">
                    <span style="display:flex; justify-content: center; font-size: 1.3rem;">${card.name}</span>
                    <span style="display:flex; justify-content: center; font-size: 1rem;">$${card.price}</span>
                    <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Attack</span><div id="c-bar-a-b"><span id="c-t-a">${card.attack}</span><div id="c-bar-a-v" style='width: ${(card.attack / 15) * 100}%;'></div></div></div>
                    <div style="display: flex; padding: 0% 2% 0% 2%; gap: 5%;"><span style="font-size: 0.8rem; display: flex; align-items: center;">Health</span><div id="c-bar-h-b"><span id="c-t-h">${card.health}</span><div id="c-bar-h-v" style='width: ${(card.health / 15) * 100}%;'></div></div></div>
                </div>
            </div>
            <div class='iMoreInfo'>Deals ${card.attack} Damage</div>
        </div>`;
    document.getElementById("iheader").append(cardCloseButton);
    document.getElementById("icardVals").append(cardActionButton);
}


function closeInfoCard()
{
    const cardIndoPanelBG = document.getElementById("cardInfoBG");
    cardIndoPanelBG.style.display = 'none';
}


function cardActionStats(t, id)
{
    t == "EQUIP"? equipCard(id) : t == "UNEQUIP"? unequipCard(id) : buyCard(id);
    closeInfoCard();
}

function gotothebatle()
{
    gameElements.app.style.display = 'none';
    gameElements.battleapp.style.display = 'flex';
    createEquippedCardsViewForMatch();
}