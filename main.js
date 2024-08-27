const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keysCheckbox = document.querySelector(".keys-checkbox input"),
      noteToPlay = document.getElementById("noteToPlay");

let audio = new Audio();
let currentNote = null;  // Almacenar la nota actual para verificación

const notes = [
    { key: 'a', note: 'do', displayName: 'Do' },
    { key: 'w', note: 'do sostenido', displayName: 'Do♯' },
    { key: 's', note: 're', displayName: 'Re' },
    { key: 'e', note: 're sostenido', displayName: 'Re♯' },
    { key: 'd', note: 'mi', displayName: 'Mi' },
    { key: 'f', note: 'fa', displayName: 'Fa' },
    { key: 't', note: 'fa sostenido', displayName: 'Fa♯' },
    { key: 'g', note: 'sol', displayName: 'Sol' },
    { key: 'y', note: 'sol sostenido', displayName: 'Sol♯' },
    { key: 'h', note: 'la', displayName: 'La' },
    { key: 'u', note: 'si bemol', displayName: 'La♯' }, // Corregido "si bemol"
    { key: 'j', note: 'si', displayName: 'Si' },
];

function playTune(note) {
    audio.src = `${note.note}.mp3`;
    audio.play();
    const keyElement = document.querySelector(`.key[data-key="${note.key}"]`);
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 200); // Efecto visual de presión
}

function displayRandomNote() {
    currentNote = getRandomNote();
    playTune(currentNote);  // Reproduce el sonido de la nota aleatoria
    noteToPlay.textContent = `Presiona esta nota: ${currentNote.displayName}`; // Muestra la nota al usuario
}

function getRandomNote() {
    return notes[Math.floor(Math.random() * notes.length)];
}

function checkNote(key) {
    const note = notes.find(n => n.key === key);
    if (note) {
        playTune(note);
        if (note.key === currentNote.key) {
            noteToPlay.textContent = "¡Muy bien!";
            setTimeout(displayRandomNote, 1000); // Muestra y reproduce la siguiente nota después de un segundo
        }
    }
}

pianoKeys.forEach(key => {
    key.addEventListener("click", () => checkNote(key.dataset.key));
});

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

document.addEventListener("keydown", (e) => {
    const key = Array.from(pianoKeys).find(k => k.dataset.key === e.key.toLowerCase());
    if (key) checkNote(key.dataset.key);
});

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("DOMContentLoaded", displayRandomNote);

document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(node => node.classList.remove('active'));
        this.classList.add('active');
    });
});
