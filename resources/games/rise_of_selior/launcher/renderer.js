window.addEventListener("DOMContentLoaded", () => {
    const minimizeButton = document.getElementById("minimize-btn");
    const maxUnmaxButton = document.getElementById("max-unmax-btn");
    const closeButton = document.getElementById("close-btn");
    minimizeButton.addEventListener("click", e => {
        window.minimizeWindow();
    });
    maxUnmaxButton.addEventListener("click", e => {
        const icon = maxUnmaxButton.querySelector("i.far");
        window.maxUnmaxWindow();
        if (window.isWindowMaximized()) {
            icon.classList.remove("fa-square");
            icon.classList.add("fa-clone");
        }
        else {
            icon.classList.add("fa-square");
            icon.classList.remove("fa-clone");
        }
    });
    closeButton.addEventListener("click", e => {
        window.closeWindow();
    });
});
