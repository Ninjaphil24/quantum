
let content = {};
let currentLanguage = 'en';

var checkbox = document.querySelector('#nav-language input[type="checkbox"]');
checkbox.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent click from bubbling up
});

document.addEventListener('DOMContentLoaded', () => {
    fetchContent().then(() => {
        setContent();
    });
});

async function fetchContent() {
    const response = await fetch('data/content.json');
    content = await response.json();
}

function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
    setContent();
}

function setContent() {
    const numberOfLines = 13; // Total number of lines to update
    for (let i = 1; i <= numberOfLines; i++) {
        const elementId = `line${i}`; // Construct element ID dynamically
        const textContent = content[currentLanguage][`line${i}`]; // Access content dynamically
        document.getElementById(elementId).textContent = textContent;
    }
}

window.fetchContent = fetchContent;