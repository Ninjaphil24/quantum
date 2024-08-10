document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    const routes = {
        '#home': 'views/home.html',
        '#about': 'views/about.html',
        '#downloads': 'views/downloads.html',
        '#contact': 'views/contact.html',
        '#thank_you': 'views/thank_you.html',
    };

    async function loadContent() {
        const hash = window.location.hash || '#home';
        const page = routes[hash] || '404.html';

        try {
            const response = await fetch(page);
            if (response.ok) {
                const content = await response.text();
                contentDiv.innerHTML = content;
                executeInlineScripts(contentDiv);
            } else {
                contentDiv.innerHTML = '<h1>404 - Page not found</h1>';
            }
        } catch (error) {
            contentDiv.innerHTML = '<h1>Error loading page</h1>';
        }
        setContent();
    }

    function executeInlineScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach((script) => {
            const newScript = document.createElement('script');
            newScript.textContent = `
                if (typeof observer === 'undefined') {
                    ${script.textContent}
                }
            `;
            document.head.appendChild(newScript).parentNode.removeChild(newScript);
        });
    }

    window.addEventListener('hashchange', loadContent);
    loadContent();
});
