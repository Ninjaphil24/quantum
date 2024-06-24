function logo() {
    let cssExport = '';

    // Generate CSS for circles
    const circleCount = 9;
    const angles = [270, 0, 180, 90];

    let css = '';
    let initialCss = '';
    let finalCss = '';

    for (let arch = 0; arch < 4; arch++) {
        for (let i = 1; i <= circleCount; i++) {
            let size;
            if (i <= 5) {
                size = 5 + (i - 1) * 2; // Growing size
            } else {
                size = 5 + (circleCount - i) * 2; // Shrinking size
            }
            css += `
                #logo${arch} .circle${i} {
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background-color: gold;
                    transition: all 1s ease;
                }
            `;
            initialCss += `
                #logo${arch} .circle${i} { top: 50%; left: 50%; transform: translate(-50%, -50%); }
            `;
            const angle = (i - 1) * (180 / (circleCount - 1)) - angles[arch]; // Semi-circle from -90 to 90 degrees
            const radius = 40; // Adjust radius as needed
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            finalCss += `
                #logo${arch}.show .circle${i} { top: ${50 + y}%; left: ${50 + x}%; transform: translate(-50%, -50%); }
            `;
        }
    }

    cssExport = css + initialCss + finalCss;

    // Create style element
    const style = document.createElement('style');
    style.type = 'text/css';
    document.head.appendChild(style);

    // Append generated CSS to style element
    style.innerHTML = cssExport;

    // Create and append circles
    for (let arch = 0; arch < 4; arch++) {
        for (let i = 1; i <= circleCount; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle', `circle${i}`);
            document.getElementById(`logo${arch}`).appendChild(circle);
        }

        // Add show class after 1 second
        setTimeout(() => {
            document.getElementById(`logo${arch}`).classList.add('show');
        }, 500);
    } // End of loop arch

    return cssExport;
}

// Assign the logo function to window.onload
window.onload = logo;

// Example of calling logo() directly and getting the CSS export
const cssExport = logo();

// Use cssExport as needed
function navbar(cssExport) {
    // Create style element
    const style = document.createElement('style');
    style.type = 'text/css';
    document.head.appendChild(style);

    // Generate CSS for circles
    let css = '';
    let initialCss = '';
    let finalCss = '';
    const circleCount = 5;
    const navButtons = [
        '<button><i class="lni lni-home"></i></button>',
        '<button><i class="lni lni-information"></i></button>',
        '<button><i class="lni lni-download"></i></button>',
        '<button><i class="lni lni-envelope"></i></button>',
        '<button id="showNav"><i class="lni lni-menu"></i></button>'
    ];

    for (let i = 1; i <= circleCount; i++) {
        let size;
        size = 40 + (i - 1) * 3; // Growing size
        css += `
            #nav0 .circle${i} {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background-color: gold;
                transition: all 1s ease;
            }
        `;
        initialCss += `
            #nav0 .circle${i} { top: 10%; left: 10%; transform: translate(-50%, -50%); }
        `;
        const angle = (i - 1) * (60 / (circleCount - 1)) - 50; // Semi-circle from -90 to 90 degrees
        const radius = 40; // Adjust radius as needed
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        finalCss += `
            #nav0.show .circle${i} { top: ${40 + y}%; left: ${-15 + x}%; transform: translate(-50%, -50%); }
        `;
    }

    // Append generated CSS to style element
    cssExport += css + initialCss + finalCss;
    style.innerHTML = cssExport;

    // Create and append circles
    for (let i = 1; i <= circleCount; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle', `circle${i}`);
        document.getElementById(`nav0`).appendChild(circle);
        circle.innerHTML = navButtons[i - 1];
    }

    document.querySelector('.circle5').addEventListener('mouseenter', () => {
        console.log('mouseenter');
        for (let arch = 0; arch < 4; arch++) {
            document.getElementById(`logo${arch}`).classList.remove('show');
        }
    });

    document.querySelector('.circle5').addEventListener('mouseleave', () => {
        setTimeout(() => {
            for (let arch = 0; arch < 4; arch++) {
                document.getElementById(`logo${arch}`).classList.add('show');
            }
        }, 200);
    });

    document.getElementById('showNav').addEventListener('click', showNav);

    function showNav() {
        const nav = document.getElementById(`nav0`);
        nav.classList.toggle('show');
    }
}

// Call navbar function with the cssExport from logo
navbar(cssExport);

function candlesticks(cssExport) {
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);
        const container = document.getElementById('candlestick-container');
        let scrollCounter = 0;
        const scrollThreshold = 5;
        let scrollTimeout;
        let candleCount = 0;
        let height = 0;
        let topPos = 0;
        topPos = Math.floor(Math.random() * 500) + 0;

        let upBool = true;
        window.addEventListener('scroll', () => {
            scrollCounter++;
            if (scrollCounter % scrollThreshold === 0) {
                let up = 0;
                let down = 0;
                let dir = scrollCounter;
                height = Math.floor(Math.random() * 120) + 10;

                if (upBool) {
                    if (up < dir) {
                        topPos += height;
                        up++;
                        addCandlesticks(upBool);
                        if (up === dir || topPos > 400) {
                            upBool = false; // Switch to going down
                        }

                    }
                }
                if (!upBool) {
                    if (down < dir) {
                        topPos -= height;
                        down++;
                        addCandlesticks(upBool);
                        if (down === dir || topPos < 80) {
                            upBool = true; // Switch to going up
                        }

                    }
                }


                candleCount++;
                if (candleCount > 30) {
                    clearCandlesticks();
                    candleCount = 0;
                }
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    clearCandlesticks();
                    scrollCounter = 0;
                }, 1000);
            }

            for (let arch = 0; arch < 4; arch++) {
                document.getElementById(`logo${arch}`).classList.remove('show');
            }
            document.getElementById(`nav0`).classList.remove('show');

        });

        outer = `.outer {
        width: 20px;
        margin: 0 5px;
        }`
        inner = `.inner {
        width: 20px;
        margin: 0 5px;
        background-color: #617DAD;
        position: relative;
        display: inline-block;
        animation: fadeIn 0.5s ease-out;
        }`
        style.innerHTML = outer + inner;
        function addCandlesticks(upBool) {
            const outer = document.createElement('div');
            outer.classList.add('outer');
            const inner = document.createElement('div');
            inner.classList.add('inner');
            outer.appendChild(inner);
            inner.style.height = `${height}px`;
            inner.style.top = `${topPos}px`;
            upBool ? inner.style.background = 'pink' : inner.style.background = 'turquoise';
            container.appendChild(outer);
            setTimeout(() => {
                inner.style.display = 'none';
            }, 500);
        }

        function clearCandlesticks() {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    });
}

candlesticks(cssExport);

function languages() {
    let content = {};
    let currentLanguage = 'en';

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
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        setContent();
    }

    function setContent() {
        document.getElementById('title').textContent = content[currentLanguage].title;
        document.getElementById('nav-home').textContent = content[currentLanguage].nav.home;
        document.getElementById('nav-about').textContent = content[currentLanguage].nav.about;
        document.getElementById('nav-contact').textContent = content[currentLanguage].nav.contact;
        document.getElementById('nav-language').textContent = content[currentLanguage].nav.language;
        document.getElementById('header').textContent = content[currentLanguage].header;
        document.getElementById('paragraph').textContent = content[currentLanguage].paragraph;
    }
}

languages();