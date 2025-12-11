const ADMIN_PASSWORD = "ClaqueDoigts2025";
let isAuthenticated = false;

function checkAuth() {
    const auth = localStorage.getItem("claque_doigts_auth");
    if (auth === "true") {
        isAuthenticated = true;
    }
    return isAuthenticated;
}

function login(password) {
    if (password === ADMIN_PASSWORD) {
        isAuthenticated = true;
        localStorage.setItem("claque_doigts_auth", "true");
        return true;
    }
    return false;
}

function logout() {
    isAuthenticated = false;
    localStorage.removeItem("claque_doigts_auth");
    window.location.href = "./";
}

const popupManager = {
    open: function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    },
    close: function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove("active");
            document.body.style.overflow = "";
        }
    }
};

function checkPageAccess() {
    const currentPath = window.location.pathname;
    const restrictedPages = [
        "/pages/pilliers-intro.html",
        "/pages/pilliers-objectif-principal.html",
        "/pages/pilliers-objectif-secondaire.html",
        "/pages/parcours-intro.html",
        "/pages/parcours-etapes.html"
    ];
    
    if (restrictedPages.includes(currentPath) && !isAuthenticated) {
        const popup = document.createElement("div");
        popup.className = "popup-overlay active";
        popup.innerHTML = `
            <div class="popup">
                <h2 class="popup-title">🔒 Contenu verrouille</h2>
                <div class="popup-content">
                    <p>Bravo ! Vous avez termine la version gratuite.</p>
                    <p>Pour acceder aux sections Pilliers et Parcours, prenez rendez-vous avec nous ou connectez-vous si vous avez deja un acces.</p>
                </div>
                <div class="popup-actions">
                    <button class="btn btn-green btn-big" onclick="alert('Lien Calendly a configurer')">Prendre rendez-vous</button>
                    <button class="btn btn-white btn-big" onclick="window.location.href = "./"">Retour accueil</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        return false;
    }
    return true;
}

function initHomeButtons() {
    const btnStart = document.getElementById("btn-start");
    const btnLogin = document.getElementById("btn-login-header");
    
    if (btnStart) {
        btnStart.addEventListener("click", function() {
            popupManager.open("popup-free-version");
        });
    }
    
    if (btnLogin) {
        btnLogin.addEventListener("click", function() {
            popupManager.open("popup-login");
        });
    }
}

function initLoginPopup() {
    const loginForm = document.getElementById("login-form");
    const passwordInput = document.getElementById("password-input");
    const errorMessage = document.getElementById("login-error");
    
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const password = passwordInput.value;
            if (login(password)) {
                popupManager.close("popup-login");
                window.location.href = "pages/clients.html";
            } else {
                errorMessage.textContent = "Mot de passe incorrect";
                errorMessage.style.display = "block";
                passwordInput.classList.add("error");
            }
        });
    }
}

function initFreeVersionPopup() {
    const btnFreeVersion = document.getElementById("btn-free-version");
    const btnTakeAppointment = document.getElementById("btn-take-appointment");
    
    if (btnFreeVersion) {
        btnFreeVersion.addEventListener("click", function() {
            popupManager.close("popup-free-version");
            
            // Marquer qu'on va en version gratuite
            localStorage.setItem("is_free_version", "true");
            
            // Rediriger vers le formulaire
            window.location.href = "pages/formulaire-gratuit.html";
        });
    }
    
    if (btnTakeAppointment) {
        btnTakeAppointment.addEventListener("click", function() {
            alert("Lien Calendly a configurer");
        });
    }
}

function initPopupCloseEvents() {
    const closeButtons = document.querySelectorAll(".popup-close");
    closeButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const popup = btn.closest(".popup-overlay");
            if (popup) {
                popupManager.close(popup.id);
            }
        });
    });
    
    const overlays = document.querySelectorAll(".popup-overlay");
    overlays.forEach(function(overlay) {
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) {
                popupManager.close(overlay.id);
            }
        });
    });
}

function initAuth() {
    checkAuth();
    checkPageAccess();
    initHomeButtons();
    initLoginPopup();
    initFreeVersionPopup();
    initPopupCloseEvents();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
} else {
    initAuth();
}
