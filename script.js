const car = document.getElementById("drag-car");
const intro = document.getElementById("intro-screen");
let isDragging = false;
let startX = 0;
let currentX = 0;

// Desktop + Mobile starting positions
if (window.innerWidth >= 900) {
    car.style.left = "120px";   // DESKTOP BETTER START
} else {
    car.style.left = "-20px";   // MOBILE PERFECT START
}

// Finish line defaults to mobile distance
let finishLine = window.innerWidth * 0.40;

// Desktop shorter "drive"
if (window.innerWidth >= 900) {
    finishLine = window.innerWidth * 0.20;  // shorter drag
}

// START DRAG
function startDrag(e) {
    isDragging = true;
    startX = e.clientX - car.offsetLeft;
    car.setPointerCapture(e.pointerId);
}

car.addEventListener("pointerdown", startDrag);
document.getElementById("drag-hitbox").addEventListener("pointerdown", startDrag);

// DRAG MOVEMENT
car.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    currentX = e.clientX - startX;

    if (currentX < 0) currentX = 0;
    if (currentX > window.innerWidth - car.offsetWidth) {
        currentX = window.innerWidth - car.offsetWidth;
    }

    car.style.left = currentX + "px";

    // Unlock
    if (currentX >= finishLine) {
        intro.classList.add("hidden");
        isDragging = false;
    }
});

// RELEASE — reset to new starting position
car.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;

    car.style.left = window.innerWidth >= 900 ? "120px" : "-20px";
});
