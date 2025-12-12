// ====================================
// CONFIGURATION FIREBASE
// ====================================

const firebaseConfig = {
    apiKey: "AIzaSyBXt49ac38k194l65UTamsf2H2RmXjzTzI",
    authDomain: "claque-doigts.firebaseapp.com",
    projectId: "claque-doigts",
    storageBucket: "claque-doigts.firebasestorage.app",
    messagingSenderId: "205039191566",
    appId: "1:205039191566:web:523c3e21e41c5410a65e5f"
};

// ====================================
// INITIALISATION FIREBASE
// ====================================

let app, db;
let firebaseAvailable = false;

try {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        firebaseAvailable = true;
        console.log("🔥 Firebase initialisé avec succès !");
    } else {
        console.warn("⚠️ Firebase non chargé, utilisation du localStorage uniquement");
    }
} catch (error) {
    console.error("❌ Erreur lors de l'initialisation de Firebase:", error);
    firebaseAvailable = false;
}

// ====================================
// STORAGE API (Firebase + localStorage)
// ====================================

const storage = {
    /**
     * Sauvegarder des données
     * @param {string} collection - Nom de la collection (ex: "clients", "strategies")
     * @param {string} id - ID du document
     * @param {object} data - Données à sauvegarder
     */
    save: async function(collection, id, data) {
        // Toujours sauvegarder dans localStorage (fallback)
        const key = collection + "_" + id;
        localStorage.setItem(key, JSON.stringify(data));
        
        const allKeys = JSON.parse(localStorage.getItem(collection + "_all") || "[]");
        if (!allKeys.includes(id)) {
            allKeys.push(id);
            localStorage.setItem(collection + "_all", JSON.stringify(allKeys));
        }
        
        // Si Firebase est disponible, sauvegarder aussi dans Firestore
        if (firebaseAvailable) {
            try {
                await db.collection(collection).doc(id).set(data);
                console.log("✅ Données sauvegardées dans Firebase ET localStorage");
                return data;
            } catch (error) {
                console.error("❌ Erreur Firebase (données sauvegardées dans localStorage uniquement):", error);
                return data;
            }
        }
        
        console.log("💾 Données sauvegardées dans localStorage");
        return data;
    },
    
    /**
     * Récupérer des données
     * @param {string} collection - Nom de la collection
     * @param {string} id - ID du document
     */
    get: async function(collection, id) {
        // Essayer Firebase d'abord
        if (firebaseAvailable) {
            try {
                const doc = await db.collection(collection).doc(id).get();
                if (doc.exists) {
                    console.log("✅ Données récupérées depuis Firebase");
                    return doc.data();
                }
            } catch (error) {
                console.error("❌ Erreur Firebase, tentative localStorage:", error);
            }
        }
        
        // Fallback sur localStorage
        const key = collection + "_" + id;
        const data = localStorage.getItem(key);
        if (data) {
            console.log("💾 Données récupérées depuis localStorage");
            return JSON.parse(data);
        }
        
        return null;
    },
    
    /**
     * Récupérer tous les documents d'une collection
     * @param {string} collection - Nom de la collection
     */
    getAll: async function(collection) {
        // Essayer Firebase d'abord
        if (firebaseAvailable) {
            try {
                const snapshot = await db.collection(collection).get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log(`✅ ${data.length} documents récupérés depuis Firebase`);
                return data;
            } catch (error) {
                console.error("❌ Erreur Firebase, tentative localStorage:", error);
            }
        }
        
        // Fallback sur localStorage
        const allKeys = JSON.parse(localStorage.getItem(collection + "_all") || "[]");
        const results = [];
        allKeys.forEach(function(id) {
            const data = localStorage.getItem(collection + "_" + id);
            if (data) {
                results.push(JSON.parse(data));
            }
        });
        console.log(`💾 ${results.length} documents récupérés depuis localStorage`);
        return results;
    },
    
    /**
     * Supprimer des données
     * @param {string} collection - Nom de la collection
     * @param {string} id - ID du document
     */
    delete: async function(collection, id) {
        // Supprimer de localStorage
        const key = collection + "_" + id;
        localStorage.removeItem(key);
        
        const allKeys = JSON.parse(localStorage.getItem(collection + "_all") || "[]");
        const newKeys = allKeys.filter(function(k) { return k !== id; });
        localStorage.setItem(collection + "_all", JSON.stringify(newKeys));
        
        // Supprimer de Firebase si disponible
        if (firebaseAvailable) {
            try {
                await db.collection(collection).doc(id).delete();
                console.log("✅ Données supprimées de Firebase ET localStorage");
                return true;
            } catch (error) {
                console.error("❌ Erreur Firebase (données supprimées de localStorage uniquement):", error);
                return true;
            }
        }
        
        console.log("💾 Données supprimées de localStorage");
        return true;
    },
    
    /**
     * Mettre à jour des données (alias de save)
     * @param {string} collection - Nom de la collection
     * @param {string} id - ID du document
     * @param {object} data - Données à mettre à jour
     */
    update: function(collection, id, data) {
        return this.save(collection, id, data);
    }
};

console.log("📦 Storage API prêt (Firebase + localStorage)");
