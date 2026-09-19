window.onload = () => {
    const loader = document.getElementById("loader");
    const bar = document.getElementById("loader-bar-fill");
    const percentText = document.getElementById("loader-percent");
    const subtitle = document.getElementById("loader-subtitle");

    // Check query param for personal dedication
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const toName = urlParams.get('to');
        if (toName) {
            const eyebrow = document.querySelector('.love-message__eyebrow');
            if (eyebrow) eyebrow.textContent = `FOR ${toName.toUpperCase()}`;
            const titleEl = document.getElementById('loader-title');
            if (titleEl) titleEl.textContent = `blooming for ${toName}`;
        }
    } catch (e) {
        // Fallback gracefully
    }

    const duration = 2200;

    const messages = [
        { at: 0, text: "gathering every petal..." },
        { at: 35, text: "planting something sweet..." },
        { at: 70, text: "almost ready to bloom..." },
    ];

    let start = null;
    let shownIndex = 0;

    function fillBar(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const percent = Math.min((elapsed / duration) * 100, 100);

        if (bar) bar.style.width = percent + "%";
        if (percentText) percentText.textContent = Math.floor(percent) + "%";

        if (shownIndex < messages.length - 1 && percent >= messages[shownIndex + 1].at) {
            shownIndex++;
            if (subtitle) subtitle.textContent = messages[shownIndex].text;
        }

        if (percent < 100) {
            requestAnimationFrame(fillBar);
        } else {
            finishLoading();
        }
    }

    function finishLoading() {
        if (loader) loader.classList.add("hide");
        setTimeout(() => {
            document.body.classList.remove("container");
            document.body.classList.remove("not-loaded");
        }, 800);
    }

    requestAnimationFrame(fillBar);
};
