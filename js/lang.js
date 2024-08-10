
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
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        content = await response.json();
        console.log('Content loaded:', content); // Log the content to ensure it was loaded
    } catch (error) {
        console.error('Error fetching content:', error);
    }
}


function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
    setContent();
}
function setContent() {
    console.log('Current language:', currentLanguage);  // Check the current language
    console.log('Content for current language:', content[currentLanguage]);  // Ensure content exists for current language

    if (!content[currentLanguage]) {
        console.error(`Content for language ${currentLanguage} is undefined`);
        return;
    }

    const numberOfLines = 13; // Update this to match the total number of lines in your JSON
    for (let i = 1; i <= numberOfLines; i++) {
        const elementId = `line${i}`; // Construct element ID dynamically
        const textContent = content[currentLanguage][`line${i}`]; // Access content dynamically

        if (textContent === undefined) {
            console.warn(`Content for ${elementId} is missing in ${currentLanguage}`);
            continue;
        }

        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = textContent;
        } else {
            console.warn(`Element with ID ${elementId} not found.`);
        }
    }
}



window.fetchContent = fetchContent;
window.setContent = setContent;