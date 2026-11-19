/* =========================
   DIGITAL KALTIM SCRIPT
========================= */

const loader = document.getElementById("loader");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const shortcutButtons = document.querySelectorAll(".shortcut-btn");
const searchInput = document.getElementById("searchInput");

let isNavigating = false;

/* =========================
   INITIAL LOADING
========================= */

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 700);
});

/* =========================
   NAVIGATION FUNCTION
========================= */

function navigateToPage(targetPage) {

    if (isNavigating) return;

    const currentPage = document.querySelector(".page.active");

    if (currentPage && currentPage.id === targetPage) {
        sidebar.classList.remove("open");
        return;
    }

    const selectedPage = document.getElementById(targetPage);

    if (!selectedPage) return;

    isNavigating = true;

    loader.classList.remove("hide");

    sidebar.classList.remove("open");

    setTimeout(() => {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        selectedPage.classList.add("active");

        const activeMenu = document.querySelector(
            `.nav-item[data-page="${targetPage}"]`
        );

        if (activeMenu) {
            activeMenu.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        setTimeout(() => {
            loader.classList.add("hide");
            isNavigating = false;
        }, 150);

    }, 450);
}

/* =========================
   SIDEBAR NAVIGATION
========================= */

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target = item.dataset.page;

        navigateToPage(target);

    });

});

/* =========================
   SHORTCUT BUTTONS
========================= */

shortcutButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.page;

        navigateToPage(target);

    });

});

/* =========================
   MOBILE SIDEBAR
========================= */

menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});

/* =========================
   CLOSE SIDEBAR WHEN
   CLICKING OUTSIDE
========================= */

document.addEventListener("click", event => {

    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideSidebar && !clickedMenuButton) {
        sidebar.classList.remove("open");
    }

});

/* =========================
   SEARCH FUNCTION
========================= */

searchInput.addEventListener("keydown", event => {

    if (event.key !== "Enter") return;

    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword) return;

    const searchablePages = [...pages];

    let foundPage = null;

    searchablePages.forEach(page => {

        const content = page.innerText.toLowerCase();

        if (content.includes(keyword)) {

            if (!foundPage) {
                foundPage = page;
            }

        }

    });

    if (foundPage) {

        navigateToPage(foundPage.id);

        setTimeout(() => {

            const cards = foundPage.querySelectorAll(
                ".quick-card, .news-card"
            );

            cards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(keyword)) {
                    card.style.outline = "2px solid #1686d9";
                    card.style.backgroundColor = "#f0f8ff";
                } else {
                    card.style.outline = "";
                    card.style.backgroundColor = "";
                }

            });

        }, 650);

    } else {

        alert("Informasi tidak ditemukan.");

    }

});

/* =========================
   RESET SEARCH
========================= */

searchInput.addEventListener("input", () => {

    if (searchInput.value === "") {

        document.querySelectorAll(
            ".quick-card, .news-card"
        ).forEach(card => {

            card.style.outline = "";
            card.style.backgroundColor = "";

        });

    }

});

/* =========================
   CONSOLE
========================= */

console.log("DIGITAL KALTIM berhasil dijalankan.");
console.log("Portal Informasi dan Literasi Digital.");