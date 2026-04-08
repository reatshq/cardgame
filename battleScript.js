import { cards } from "./cardsData.js";
import { gameElements } from "./script.js";

function createEquippedCardsView()
{
    gameElements.cecbv.innerHTML = ``;
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
        gameElements.cecbv.append(cardUI);        
    })
    gameElements.eqbccount.textContent = gameElements.cecbv.childElementCount;
}

export function showThebattle()
{
    createEquippedCardsView();
}

export function createEquippedCardsViewForMatch()
{
    gameElements.cecmv.innerHTML = ``;
    cards.filter(card => card.stats == "e").forEach(card => {
        const cardUI = document.createElement('div');
        cardUI.id = "c-o-m";
        cardUI.draggable = true
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
        gameElements.cecmv.append(cardUI);        
    })
    Match()
}


function Match() {
    const cards = document.querySelectorAll("#c-ecm-v > div"); // all children of c-ecm-v
    const zones = document.querySelectorAll(".dropzone");       // grid cells
    const cardzones = document.getElementById("c-ecm-v");

    cardzones.addEventListener("dragstart", e => {
        cards.forEach(card => {
            e.dataTransfer.setData("text/plain", card.id);
        });
    });

    cardzones.addEventListener("dragover", e => {
        if (!cardzones.classList.contains("disabled")) {
        e.preventDefault(); // allow drop only if not disabled
        }
    });

    cardzones.addEventListener("drop", e => {
        e.preventDefault();
        if (!cardzones.classList.contains("disabled")) {
        const cardId = e.dataTransfer.getData("text/plain");
        const cardEl = document.getElementById(cardId);
        cardEl.id = 'c-o-m';
        cardzones.appendChild(cardEl);
        zones.forEach(zone => {
            zone.childElementCount == 0 ? zone.classList.remove("filled") : zone.classList.add("filled");
        });
    }
    });

    // Make each child draggable
    cards.forEach(card => {
        card.setAttribute("draggable", "true");

        card.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", card.id);
        card.classList.add("dragging");
        });

        card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        });
    });

    // Handle dropzones
    zones.forEach(zone => {
        zone.addEventListener("dragover", e => {
            zone.childElementCount == 0 ? zone.classList.remove("filled") : zone.classList.add("filled");
            if (!zone.classList.contains("disabled") && !zone.classList.contains("filled") && !zone.classList.contains("e")) {
                e.preventDefault(); // allow drop only if not disabled
            }
        });

        zone.addEventListener("drop", e => {
            zone.childElementCount == 0 ? zone.classList.remove("filled") : zone.classList.add("filled");
            e.preventDefault();
            if (!zone.classList.contains("disabled") && !zone.classList.contains("filled") && !zone.classList.contains("e")) {
                const dragging = document.querySelector(".dragging");
                if (dragging) {
                    dragging.id = 'c-o-m-g';
                    zone.appendChild(dragging);
                    zone.classList.add("filled");
                    zones.forEach(zone => {
                        zone.childElementCount == 0 ? zone.classList.remove("filled") : zone.classList.add("filled");
                    });
                }
            }
        });
    });
}
