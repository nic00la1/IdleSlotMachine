export const roarSound = new Audio("sounds/roar.mp3");
export const goldSound = new Audio("sounds/gold-shimmer.mp3");

export function playRoar() {
    roarSound.currentTime = 0;
    roarSound.play();
}

export function playGold() {
    goldSound.currentTime = 0;
    goldSound.play();
}
