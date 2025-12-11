// 🎯 SYSTÈME DE RECOMMANDATION DE PLATEFORMES
// Basé sur les données 2024-2025 : Statista, Mediamétrie, We Are Social, Meltwater, Agorapulse, Blog du Modérateur

/**
 * DONNÉES DÉMOGRAPHIQUES PAR PLATEFORME (France 2024)
 * Sources : Statista, We Are Social/Meltwater Digital Report 2024, Agorapulse
 */
const platformData = {
    tiktok: {
        name: "TikTok",
        ageRanges: {
            "16-25": 95,  // 63% des utilisateurs ont -24 ans, âge moyen 23 ans
            "25-35": 40,  // Chute brutale après 25 ans
            "35-50": 15,  // Très faible présence
            "50+": 5      // Quasi inexistant
        },
        gender: {
            femme: 56,   // 56% femmes selon sources 2024
            homme: 44,
            mixte: 50
        },
        interests: {
            "Mode": 90,
            "Beauté": 88,
            "Food": 85,
            "Gaming": 80,
            "Musique": 95,
            "Danse": 98,
            "Humour": 95,  // 79.6% vont sur TikTok pour contenu drôle/divertissant
            "Sport": 65,
            "Voyage": 60,
            "DIY": 55,
            "Tech": 50,
            "Business": 20,
            "B2B": 10,
            "Finance": 15,
            "Actualités": 30,
            "Parentalité": 25,
            "Politique": 20
        },
        incomeLevel: {
            faible: 75,   // Public jeune = revenus plus faibles
            moyen: 60,
            eleve: 30
        },
        users: "25.4M en France",
        strength: "38h38/mois de temps passé - Leader du contenu viral et divertissant chez les jeunes"
    },
    
    instagram: {
        name: "Instagram",
        ageRanges: {
            "16-25": 80,  // 80% de la Gen Z l'utilise (Instagram #1 Gen Z)
            "25-35": 85,  // Fort chez les Millennials
            "35-50": 55,  // Encore présent mais moins fort
            "50+": 30     // Moins fort chez seniors
        },
        gender: {
            femme: 54,    // Légèrement plus de femmes
            homme: 46,
            mixte: 50
        },
        interests: {
            "Mode": 98,        // Leader mode
            "Beauté": 98,      // Leader beauté
            "Food": 95,        // Leader food
            "Voyage": 95,      // Fort sur voyage
            "Sport": 80,
            "Musique": 75,
            "DIY": 70,
            "Gaming": 55,
            "Tech": 60,
            "Business": 65,
            "B2B": 45,
            "Finance": 50,
            "Actualités": 55,
            "Parentalité": 60,
            "Politique": 40,
            "Danse": 75,
            "Humour": 70
        },
        incomeLevel: {
            faible: 60,
            moyen: 75,
            eleve: 70    // Assez équilibré
        },
        users: "29.9M en France",
        strength: "Leader mode/beauté/lifestyle - 80% de la Gen Z l'utilise quotidiennement"
    },
    
    facebook: {
        name: "Facebook",
        ageRanges: {
            "16-25": 51,  // Seulement 51% de la Gen Z (5ème position chez jeunes)
            "25-35": 72,  // 72% des Millennials
            "35-50": 75,  // 72-76% des 30-64 ans
            "50+": 76     // Fort chez les seniors, la tranche la + représentée
        },
        gender: {
            femme: 51.6,
            homme: 48.4,
            mixte: 50
        },
        interests: {
            "Parentalité": 85,
            "Actualités": 80,   // 54.9% l'utilisent pour rester en contact famille
            "Business": 75,
            "B2B": 70,
            "Finance": 65,
            "Politique": 75,
            "Food": 60,
            "Voyage": 65,
            "Sport": 70,
            "Mode": 45,
            "Beauté": 40,
            "Gaming": 50,
            "Tech": 65,
            "DIY": 60,
            "Musique": 50,
            "Danse": 30,
            "Humour": 55
        },
        incomeLevel: {
            faible: 55,
            moyen: 70,
            eleve: 65
        },
        users: "33.4M en France",
        strength: "Portée massive (59% de la population) - Leader chez les 30+ ans et communautés"
    },
    
    linkedin: {
        name: "LinkedIn",
        ageRanges: {
            "16-25": 45,  // Moins présent chez les très jeunes
            "25-35": 85,  // Très fort chez jeunes professionnels (78% <35 ans)
            "35-50": 90,  // Le cœur de cible professionnel
            "50+": 70     // Fort mais moins que 25-50
        },
        gender: {
            femme: 43,
            homme: 57,    // 57% hommes (majorité masculine)
            mixte: 50
        },
        interests: {
            "Business": 98,
            "B2B": 98,
            "Finance": 95,
            "Tech": 85,
            "Actualités": 80,
            "Politique": 70,
            "Mode": 30,
            "Beauté": 20,
            "Food": 25,
            "Gaming": 15,
            "Musique": 20,
            "Danse": 10,
            "Humour": 25,
            "Sport": 35,
            "Voyage": 40,
            "DIY": 20,
            "Parentalité": 45
        },
        incomeLevel: {
            faible: 30,
            moyen: 60,
            eleve: 95    // Très fort chez niveau de vie élevé
        },
        users: "29M en France",
        strength: "Leader incontesté B2B - Croissance +616% depuis 2019, réseau professionnel de référence"
    }
};

/**
 * MAPPING DES CENTRES D'INTÉRÊT
 * Convertit les valeurs du formulaire vers les clés de platformData
 */
const interestMapping = {
    "sport": ["Sport"],
    "culture": ["Musique", "Danse"],  // Culture = Musique + Danse
    "mode": ["Mode", "Beauté"],       // Mode = Mode + Beauté
    "tech": ["Tech"],
    "voyage": ["Voyage"],
    "food": ["Food"],
    "famille": ["Parentalité"],
    "gaming": ["Gaming"],
    "business": ["Business", "B2B"]   // Business = Business + B2B
};

/**
 * CALCUL DU SCORE DE RECOMMANDATION
 * Algorithme pondéré flexible
 */
function calculateRecommendations(strategy) {
    const recommendations = [];
    
    // Données utilisateur - UTILISER LES BONNES CLÉS !
    const userAge = strategy.age || "25-35";
    const userGender = strategy.gender || "mixte";
    const userInterests = strategy.interests || [];
    const userIncomeLevel = strategy.incomeLevel || "moyen";
    
    console.log("📦 STRATÉGIE COMPLÈTE:", strategy);
    console.log("🎯 Âge:", userAge);
    console.log("👤 Genre:", userGender);
    console.log("💡 Centres d'intérêt originaux:", userInterests);
    
    // Convertir les centres d'intérêt du formulaire vers les clés platformData
    const mappedInterests = [];
    userInterests.forEach(interest => {
        if (interestMapping[interest]) {
            mappedInterests.push(...interestMapping[interest]);
        }
    });
    
    console.log("🎯 Centres d'intérêt mappés:", mappedInterests);
    
    // Parcourir chaque plateforme
    Object.keys(platformData).forEach(platform => {
        const data = platformData[platform];
        let score = 0;
        const details = [];
        
        // 1. SCORE CENTRES D'INTÉRÊT (50% du poids) - LE PLUS IMPORTANT
        if (mappedInterests.length > 0) {
            const interestScores = mappedInterests.map(interest => data.interests[interest] || 0);
            const avgInterest = interestScores.reduce((a, b) => a + b, 0) / interestScores.length;
            score += avgInterest * 0.50;
            details.push(`Centres d'intérêt : ${Math.round(avgInterest)}% de match`);
            console.log(`${platform} - Intérêts:`, interestScores, "→ Moyenne:", avgInterest);
        }
        
        // 2. SCORE ÂGE (40% du poids)
        const ageScore = data.ageRanges[userAge] || 0;
        score += ageScore * 0.40;
        details.push(`Âge ${userAge} : ${ageScore}% de match`);
        
        // 3. SCORE GENRE (10% du poids) - Neutre si "mixte" ou "autre"
        if (userGender !== "mixte" && userGender !== "autre") {
            const genderScore = data.gender[userGender] || 50;
            score += genderScore * 0.10;
            details.push(`Genre ${userGender} : ${Math.round(genderScore)}% de match`);
        } else {
            // Genre mixte ou autre = 100% (neutre)
            score += 100 * 0.10;
            details.push(`Genre ${userGender} : 100% (neutre)`);
        }
        
        // Score final arrondi
        const finalScore = Math.round(score);
        
        console.log(`${platform} - Score final:`, finalScore);
        
        // Garder seulement les scores >= 40%
        if (finalScore >= 40) {
            recommendations.push({
                platform: platform,
                score: finalScore,
                strength: data.strength,
                users: data.users,
                details: details
            });
        }
    });
    
    console.log("✅ RECOMMANDATIONS FINALES:", recommendations);
    
    // Trier par score décroissant
    recommendations.sort((a, b) => b.score - a.score);
    
    return recommendations;
}
