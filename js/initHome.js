function initHome() {
    console.log('initHome');
    const observer = new IntersectionObserver((entries) => {
        console.log('entries', entries);
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('showHome');
            } else {
                entry.target.classList.remove('showHome');
            }
            console.log(entry.target, entry.isIntersecting)
        });
    });
    const hiddenElements = document.querySelectorAll('.line');
    hiddenElements.forEach((el) => {
        observer.observe(el);
    });
}
initHome();
// window.initHome = initHome;
