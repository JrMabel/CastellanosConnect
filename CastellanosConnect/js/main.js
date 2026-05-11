// main.js - Versión con DROPDOWN, LOGO y más DINÁMICO
document.addEventListener('DOMContentLoaded', function() {
    // ---- VARIABLES GLOBALES ----
    let currentLang = localStorage.getItem('preferredLang') || 'de';
    
    // Nombres de idiomas para mostrar en el dropdown
    const langNames = {
        de: 'Deutsch',
        en: 'English',
        fr: 'Français',
        it: 'Italiano',
        es: 'Español'
    };
    
    // ---- FUNCIÓN PARA ACTUALIZAR IDIOMAS ----
    function updateLanguage(lang) {
        // Actualizar todos los elementos con data-key
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (el.innerHTML !== undefined) {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Actualizar placeholders específicos del formulario
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageTextarea = document.getElementById('message');
        const selectService = document.getElementById('serviceInterest');
        
        const placeholders = {
            de: { name: 'Ihr Name *', email: 'E-Mail Adresse *', message: 'Ihre Nachricht...' },
            en: { name: 'Your name *', email: 'Email address *', message: 'Your message...' },
            fr: { name: 'Votre nom *', email: 'Adresse e-mail *', message: 'Votre message...' },
            it: { name: 'Il tuo nome *', email: 'Indirizzo email *', message: 'Il tuo messaggio...' },
            es: { name: 'Su nombre *', email: 'Correo electrónico *', message: 'Su mensaje...' }
        };
        
        if (nameInput) nameInput.placeholder = placeholders[lang]?.name || placeholders.de.name;
        if (emailInput) emailInput.placeholder = placeholders[lang]?.email || placeholders.de.email;
        if (messageTextarea) messageTextarea.placeholder = placeholders[lang]?.message || placeholders.de.message;
        
        // Actualizar opciones del select
        if (selectService) {
            const optionsText = {
                de: ['Reinigung / Hauswart', 'Private Haushaltshilfe', 'Gewerbe / Büro', 'Anderes'],
                en: ['Cleaning / Facility', 'Private Household help', 'Commercial / Office', 'Other'],
                fr: ['Nettoyage / Entretien', 'Aide ménagère privée', 'Commercial / Bureau', 'Autre'],
                it: ['Pulizie / Manutenzione', 'Assistenza domestica', 'Commerciale / Ufficio', 'Altro'],
                es: ['Limpieza / Mantenimiento', 'Asistencia doméstica', 'Comercial / Oficina', 'Otro']
            };
            const texts = optionsText[lang] || optionsText.de;
            for (let i = 0; i < selectService.options.length; i++) {
                selectService.options[i].text = texts[i];
            }
        }
        
        // Actualizar el texto del botón del dropdown
        const currentLangLabel = document.getElementById('currentLangLabel');
        if (currentLangLabel) {
            currentLangLabel.textContent = langNames[lang] || 'Deutsch';
        }
        
        // Marcar como activo el ítem del dropdown
        document.querySelectorAll('.dropdown-item').forEach(item => {
            const itemLang = item.getAttribute('data-lang');
            if (itemLang === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Guardar idioma preferido
        localStorage.setItem('preferredLang', lang);
        currentLang = lang;
        document.documentElement.lang = lang;
    }
    
    // ---- DROPDOWN TOGGLE ----
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Seleccionar idioma desde dropdown
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    updateLanguage(lang);
                    dropdownMenu.classList.remove('show');
                }
            });
        });
    }
    
    // ---- CARGAR IDIOMA INICIAL ----
    updateLanguage(currentLang);
    
    // ---- MENÚ MÓVIL ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
        });
        
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => mobileNav.style.display = 'none');
        });
    }
    
    // ---- FORMULARIO DE CONTACTO ----
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            
            if (!name || !email) {
                if (formStatus) {
                    formStatus.style.color = '#dc2626';
                    const errorMsgs = {
                        de: 'Bitte Name und E-Mail ausfüllen.',
                        en: 'Please fill in name and email.',
                        fr: 'Veuillez remplir le nom et l\'e-mail.',
                        it: 'Si prega di compilare nome ed email.',
                        es: 'Por favor complete nombre y correo.'
                    };
                    formStatus.textContent = errorMsgs[currentLang] || errorMsgs.de;
                }
                return;
            }
            
            // Simular envío exitoso
            if (formStatus) {
                formStatus.style.color = '#0f67b3';
                const successMsgs = {
                    de: '✓ Nachricht gesendet! Wir melden uns bald.',
                    en: '✓ Message sent! We will get back soon.',
                    fr: '✓ Message envoyé ! Nous reviendrons vers vous.',
                    it: '✓ Messaggio inviato! Ti risponderemo presto.',
                    es: '✓ ¡Mensaje enviado! Te contactaremos pronto.'
                };
                formStatus.textContent = successMsgs[currentLang] || successMsgs.de;
            }
            contactForm.reset();
            setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 5000);
        });
    }
    
    // ---- CHATBOT ----
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    if (chatbotToggle && chatbotWidget) {
        chatbotToggle.addEventListener('click', () => chatbotWidget.classList.toggle('active'));
        if (chatbotClose) chatbotClose.addEventListener('click', () => chatbotWidget.classList.remove('active'));
    }
    
    function addBotMessage(text) {
        if (!chatbotMessages) return;
        const div = document.createElement('div');
        div.className = 'message bot';
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addUserMessage(text) {
        if (!chatbotMessages) return;
        const div = document.createElement('div');
        div.className = 'message user';
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(msg, lang) {
        const lowerMsg = msg.toLowerCase();
        const responses = {
            de: { greeting: 'Hallo! Wie können wir helfen?', price: 'Preise sind individuell. Kontaktieren Sie uns für ein Angebot.', service: 'Wir bieten Reinigung, Hauswartung & mehr.', contact: 'info@baselconnect.ch oder +41 61 123 45 67', default: 'Danke! Unser Team meldet sich. Oder schreiben Sie uns: info@baselconnect.ch' },
            en: { greeting: 'Hello! How can we help?', price: 'Prices are tailored. Contact us for a quote.', service: 'We offer cleaning, facility & admin support.', contact: 'info@baselconnect.ch or +41 61 123 45 67', default: 'Thanks! Our team will reply. Email: info@baselconnect.ch' },
            fr: { greeting: 'Bonjour! Comment vous aider?', price: 'Prix sur mesure. Contactez-nous.', service: 'Nettoyage, entretien, support admin.', contact: 'info@baselconnect.ch ou +41 61 123 45 67', default: 'Merci! Notre équipe vous répondra. Email: info@baselconnect.ch' },
            it: { greeting: 'Ciao! Come possiamo aiutarti?', price: 'Prezzi personalizzati. Contattaci.', service: 'Pulizie, manutenzione, supporto admin.', contact: 'info@baselconnect.ch o +41 61 123 45 67', default: 'Grazie! Ti risponderemo. Email: info@baselconnect.ch' },
            es: { greeting: '¡Hola! ¿Cómo ayudarle?', price: 'Precios a medida. Contáctenos.', service: 'Limpieza, mantenimiento, apoyo administrativo.', contact: 'info@baselconnect.ch o +41 61 123 45 67', default: '¡Gracias! Le responderemos. Email: info@baselconnect.ch' }
        };
        const r = responses[lang] || responses.de;
        if (lowerMsg.includes('hall') || lowerMsg.includes('hola') || lowerMsg.includes('hello')) return r.greeting;
        if (lowerMsg.includes('preis') || lowerMsg.includes('price')) return r.price;
        if (lowerMsg.includes('dienst') || lowerMsg.includes('service')) return r.service;
        if (lowerMsg.includes('kontakt') || lowerMsg.includes('contact')) return r.contact;
        return r.default;
    }
    
    function sendChatMessage() {
        if (!chatbotInput || !chatbotMessages) return;
        const text = chatbotInput.value.trim();
        if (!text) return;
        addUserMessage(text);
        chatbotInput.value = '';
        setTimeout(() => addBotMessage(getBotResponse(text, currentLang)), 500);
    }
    
    if (chatbotSend) chatbotSend.addEventListener('click', sendChatMessage);
    if (chatbotInput) chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });
    
    // ---- SCROLL SUAVE + REVEAL ANIMATION ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Intersection Observer para animaciones al hacer scroll
    const revealElements = document.querySelectorAll('.service-card, .about-text, .contact-info, .contact-form');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    console.log('BaselConnect - Versión dinámica cargada ✅');
});