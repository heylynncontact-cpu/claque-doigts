// ====================================
// FIREBASE AUTHENTICATION
// ====================================

let auth;
let isAuthenticated = false;

// Initialiser Firebase Auth
try {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        auth = firebase.auth();
        console.log("🔐 Firebase Auth initialisé");
        
        // Écouter les changements d'état d'authentification
        auth.onAuthStateChanged(function(user) {
            if (user && user.email === "linevd.pro@gmail.com") {
                isAuthenticated = true;
                localStorage.setItem("claque_doigts_auth", "true");
                localStorage.removeItem("is_free_version"); // Nettoyer le flag version gratuite
                console.log("✅ Utilisateur authentifié :", user.email);
            } else {
                isAuthenticated = false;
                localStorage.removeItem("claque_doigts_auth");
                console.log("❌ Utilisateur non authentifié");
            }
        });
    }
} catch (error) {
    console.error("❌ Erreur lors de l'initialisation de Firebase Auth:", error);
}

function checkAuth() {
    return isAuthenticated;
}

/**
 * Connexion avec email et mot de passe Firebase
 */
async function login(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        if (user.email === "linevd.pro@gmail.com") {
            isAuthenticated = true;
            localStorage.setItem("claque_doigts_auth", "true");
            localStorage.removeItem("is_free_version"); // Supprimer le flag version gratuite
            console.log("✅ Connexion réussie :", user.email);
            return { success: true, user: user };
        } else {
            // Déconnecter si ce n'est pas le bon email
            await auth.signOut();
            return { success: false, error: "Email non autorisé" };
        }
    } catch (error) {
        console.error("❌ Erreur de connexion:", error);
        let errorMessage = "Erreur de connexion";
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = "Email invalide";
                break;
            case 'auth/user-disabled':
                errorMessage = "Compte désactivé";
                break;
            case 'auth/user-not-found':
                errorMessage = "Utilisateur introuvable";
                break;
            case 'auth/wrong-password':
                errorMessage = "Mot de passe incorrect";
                break;
            case 'auth/invalid-credential':
                errorMessage = "Identifiants incorrects";
                break;
            case 'auth/too-many-requests':
                errorMessage = "Trop de tentatives, réessayez plus tard";
                break;
            default:
                errorMessage = "Erreur : " + error.message;
        }
        
        return { success: false, error: errorMessage };
    }
}

/**
 * Déconnexion
 */
async function logout() {
    try {
        await auth.signOut();
        isAuthenticated = false;
        localStorage.removeItem("claque_doigts_auth");
        localStorage.removeItem("is_free_version");
        console.log("✅ Déconnexion réussie");
        window.location.href = "../";
    } catch (error) {
        console.error("❌ Erreur de déconnexion:", error);
        // Forcer la déconnexion côté client même si Firebase échoue
        isAuthenticated = false;
        localStorage.removeItem("claque_doigts_auth");
        window.location.href = "../";
    }
}

// ====================================
// GESTION DES POPUPS
// ====================================

const popupManager = {
    open: function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    },
    
    close: function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "none";
            document.body.style.overflow = "";
        }
    }
};

// ====================================
// INITIALISATION DES POPUPS
// ====================================

function initLoginPopup() {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const errorMessage = document.getElementById("login-error");
    const loginButton = document.getElementById("login-submit-btn");
    
    if (loginForm) {
        loginForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            if (!email || !password) {
                errorMessage.textContent = "Veuillez remplir tous les champs";
                errorMessage.style.display = "block";
                return;
            }
            
            // Désactiver le bouton pendant la connexion
            loginButton.disabled = true;
            loginButton.textContent = "Connexion...";
            
            const result = await login(email, password);
            
            if (result.success) {
                popupManager.close("popup-login");
                window.location.href = "pages/clients.html";
            } else {
                errorMessage.textContent = result.error;
                errorMessage.style.display = "block";
                emailInput.classList.add("error");
                passwordInput.classList.add("error");
                
                // Réactiver le bouton
                loginButton.disabled = false;
                loginButton.textContent = "Se connecter";
            }
        });
        
        // Enlever les erreurs quand on tape
        [emailInput, passwordInput].forEach(input => {
            if (input) {
                input.addEventListener("input", function() {
                    errorMessage.style.display = "none";
                    emailInput.classList.remove("error");
                    passwordInput.classList.remove("error");
                });
            }
        });
    }
}

function initFreeVersionPopup() {
    const btnFreeVersion = document.getElementById("btn-free-version");
    const btnTakeAppointment = document.getElementById("btn-take-appointment");
    
    if (btnFreeVersion) {
        btnFreeVersion.addEventListener("click", function() {
            popupManager.close("popup-start");
            popupManager.close("popup-free-version");
            
            // Marquer qu'on va en version gratuite
            localStorage.setItem("is_free_version", "true");
            localStorage.removeItem("claque_doigts_auth"); // S'assurer qu'on n'est pas authentifié
            
            // Rediriger vers le formulaire
            window.location.href = "pages/formulaire-gratuit.html";
        });
    }
    
    if (btnTakeAppointment) {
        btnTakeAppointment.addEventListener("click", function() {
            window.open("https://calendly.com/linevd-pro/une-petite-discussion", "_blank");
        });
    }
}

// ====================================
// INITIALISATION AU CHARGEMENT
// ====================================

document.addEventListener("DOMContentLoaded", function() {
    initLoginPopup();
    initFreeVersionPopup();
    
    // Gestion des boutons de fermeture des popups
    document.querySelectorAll(".popup-close").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const popup = this.closest(".popup-overlay");
            if (popup) {
                popupManager.close(popup.id);
            }
        });
    });
    
    // Fermer popup en cliquant sur l'overlay
    document.querySelectorAll(".popup-overlay").forEach(function(overlay) {
        overlay.addEventListener("click", function(e) {
            if (e.target === this) {
                popupManager.close(this.id);
            }
        });
    });
    
    // Boutons d'ouverture des popups
    const btnLoginHeader = document.getElementById("btn-login-header");
    const btnStart = document.getElementById("btn-start");
    const btnLogin = document.getElementById("btn-login");
    
    if (btnLoginHeader) {
        btnLoginHeader.addEventListener("click", function() {
            popupManager.open("popup-login");
        });
    }
    
    if (btnStart) {
        btnStart.addEventListener("click", function() {
            popupManager.open("popup-start");
        });
    }
    
    if (btnLogin) {
        btnLogin.addEventListener("click", function() {
            popupManager.close("popup-start");
            popupManager.open("popup-login");
        });
    }
    
    // Bouton de déconnexion
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", logout);
    }
});
