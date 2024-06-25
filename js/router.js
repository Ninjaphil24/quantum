document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    const routes = {
        '#home': 'views/home.html',
        '#about': 'about.html',
        '#contact': 'contact.html',
    };

    async function loadContent() {
        const hash = window.location.hash || '#home';
        const page = routes[hash] || '404.html';

        try {
            const response = await fetch(page);
            if (response.ok) {
                const content = await response.text();
                contentDiv.innerHTML = content;
            } else {
                contentDiv.innerHTML = '<h1>404 - Page not found</h1>';
            }
        } catch (error) {
            contentDiv.innerHTML = '<h1>Error loading page</h1>';
        }
        setContent();
    }
    window.addEventListener('hashchange', loadContent);
    loadContent();
});

