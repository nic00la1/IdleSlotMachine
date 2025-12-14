import { gameState } from "./state.js";
import { showEvent } from "../helpers/eventLog.js";
import { renderLionFuryUI } from './lionFuryUI.js';

export function initLionFury() {
    gameState.lionFury.value = 0;
    gameState.lionFury.active = false;
    gameState.lionFury.spinsLeft = 0;

    if (!gameState.lionFury) {
        gameState.lionFury = {
            value: 0,
            max: 100,
            active: false,
            spinsLeft: 0
        };
    }
    renderLionFuryUI();
}

export function addLionFury(amount) {
    const fury = gameState.lionFury;
    if (fury.active) return;

    fury.value += amount;
    if (fury.value >= fury.max) {
        fury.value = fury.max;
        activateLionFury();
    }
    renderLionFuryUI();
}

export function activateLionFury() {
    const fury = gameState.lionFury;
    fury.active = true;
    fury.spinsLeft = 5;
    showEvent("🦁 LION FURY MODE! Bonus aktywowany!");
    document.body.classList.add("lion-fury-active");

    document.body.classList.add("lion-fury-flash");
    setTimeout(() => document.body.classList.remove("lion-fury-flash"), 600);

    renderLionFuryUI();
}

export function onSpinDuringLionFury() {
    const fury = gameState.lionFury;
    if (!fury.active) return;


    fury.spinsLeft--;
    if (fury.spinsLeft <= 0) {
        fury.active = false;
        fury.value = 0;
        document.body.classList.remove("lion-fury-active");
        showEvent("🦁 Lion Fury zakończony");

        document.body.classList.add("lion-fury-end");
        setTimeout(() => document.body.classList.remove("lion-fury-end"), 600);

    }

    renderLionFuryUI();
}