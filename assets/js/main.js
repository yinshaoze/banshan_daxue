(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const menuDialog = document.getElementById("menu-dialog");

  if (!menuButton || !menuDialog) {
    return;
  }

  const closeButton = menuDialog.querySelector(".menu-close");
  const menuLinks = menuDialog.querySelectorAll(".menu-nav a");

  const setMenuState = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  const openMenu = () => {
    if (typeof menuDialog.showModal === "function") {
      menuDialog.showModal();
    } else {
      menuDialog.setAttribute("open", "");
    }

    setMenuState(true);
    closeButton.focus();
  };

  const closeMenu = () => {
    if (menuDialog.open) {
      menuDialog.close();
    } else {
      menuDialog.removeAttribute("open");
      setMenuState(false);
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      closeMenu();

      if (target) {
        window.setTimeout(() => {
          target.setAttribute("tabindex", "-1");
          target.scrollIntoView({ block: "start" });
          target.focus({ preventScroll: true });

          if (window.history.pushState) {
            window.history.pushState(null, "", targetId);
          }
        }, 20);
      }
    });
  });

  menuDialog.addEventListener("close", () => {
    setMenuState(false);
    menuButton.focus();
  });

  menuDialog.addEventListener("click", (event) => {
    if (event.target === menuDialog) {
      closeMenu();
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 981px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches && menuDialog.open) {
      closeMenu();
    }
  });
})();
