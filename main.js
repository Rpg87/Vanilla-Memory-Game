'use strict';
const cards = document.querySelectorAll('.memory-card');
const resetBtn = document.querySelector('.btn');

const sound = new Audio('assets/sms-alert-4-daniel_simon.mp3')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
        // All cards are turned, show reset button
        sound.play();
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.classList.add('reset-btn'); // Add the reset-btn class
        resetBtn.addEventListener('click', refresh);
        document.body.appendChild(resetBtn);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function refresh() {
    location.reload(); // Refreshes the page
};

cards.forEach(card => card.addEventListener('click', flipCard));
// resetBtn.addEventListener('click', refresh)