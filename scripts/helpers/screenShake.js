export function screenShake() {
    const body = document.body;

    body.classList.add("shake");

    setTimeout(() => {
        body.classList.remove("shake")
    }, 400);
}