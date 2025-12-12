// FORCE RESPONSIVE MOBILE - Script agressif
(function() {
    'use strict';
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        if (window.innerWidth <= 768) {
            forceProgressBarMobile();
            forceHideIntroImages();
            forceFont();
            
            // Réappliquer quand la fenêtre est redimensionnée
            let timeout;
            window.addEventListener('resize', function() {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    if (window.innerWidth <= 768) {
                        forceProgressBarMobile();
                        forceHideIntroImages();
                        forceFont();
                    }
                }, 100);
            });
        }
    }
    
    // FORCE PROGRESS BAR - Masquer ronds et textes
    function forceProgressBarMobile() {
        console.log("🔧 Forcing progress bar mobile...");
        
        // Masquer tous les labels
        const labels = document.querySelectorAll('.progress-step-label');
        labels.forEach(function(label) {
            label.style.display = 'none';
            label.style.visibility = 'hidden';
            label.style.opacity = '0';
            label.style.height = '0';
            label.style.overflow = 'hidden';
        });
        
        // Masquer tous les icons
        const icons = document.querySelectorAll('.progress-step-icon');
        icons.forEach(function(icon) {
            icon.style.display = 'none';
            icon.style.visibility = 'hidden';
        });
        
        // Masquer tous les spans dans progress-step
        const spans = document.querySelectorAll('.progress-step span');
        spans.forEach(function(span) {
            span.style.display = 'none';
            span.style.visibility = 'hidden';
            span.style.fontSize = '0';
        });
        
        // Forcer l'affichage des barres uniquement
        const bars = document.querySelectorAll('.progress-step-bar');
        bars.forEach(function(bar) {
            bar.style.display = 'block';
            bar.style.height = '4px';
            bar.style.margin = '0';
        });
        
        // Ajuster les steps
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach(function(step) {
            step.style.minWidth = '0';
            step.style.padding = '0';
        });
        
        console.log("✅ Progress bar mobile forced!");
    }
    
    // FORCE HIDE INTRO IMAGES
    function forceHideIntroImages() {
        console.log("🔧 Forcing hide intro images...");
        
        // Détecter si on est sur une page intro
        const hasIntro = document.querySelector('.section-intro');
        
        if (hasIntro) {
            // Masquer toutes les images split-layout-gradient
            const images = document.querySelectorAll('.split-layout-gradient');
            images.forEach(function(img) {
                img.style.display = 'none';
                img.style.visibility = 'hidden';
                img.style.opacity = '0';
                img.style.height = '0';
                img.style.minHeight = '0';
                img.style.overflow = 'hidden';
            });
            
            console.log("✅ Intro images hidden!");
        } else {
            console.log("ℹ️ Not an intro page, keeping images");
        }
    }
    
    // FORCE FONT FRACTUL
    function forceFont() {
        console.log("🔧 Forcing Fractul font...");
        
        // Ajouter un style ultra agressif
        const style = document.createElement('style');
        style.id = 'force-fractul-mobile';
        style.textContent = `
            * {
                font-family: 'fractul', 'Fractul', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif !important;
            }
            
            body, html {
                font-family: 'fractul', 'Fractul', -apple-system, BlinkMacSystemFont, Arial, sans-serif !important;
            }
            
            h1, h2, h3, h4, h5, h6,
            .home-title, .section-title, .dashboard-title,
            .btn, button,
            p, span, div, a,
            input, textarea, select, label {
                font-family: 'fractul', 'Fractul', -apple-system, BlinkMacSystemFont, Arial, sans-serif !important;
            }
        `;
        
        // Supprimer l'ancien style s'il existe
        const oldStyle = document.getElementById('force-fractul-mobile');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        document.head.appendChild(style);
        console.log("✅ Font forced!");
    }
})();
