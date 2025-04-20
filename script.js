// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Form Handling
const contactForm = document.getElementById('contactForm');
const adminWhatsApp = '919493212655'; // Admin WhatsApp number

// Function to get formatted date and time
function getCurrentDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return now.toLocaleDateString('en-US', options);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        const currentDateTime = getCurrentDateTime();

        // Create admin WhatsApp message
        const adminMessage = `🔔 *New Service Request*\n\n📅 *Date & Time:* ${currentDateTime}\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📋 *Service:* ${formData.service}\n💬 *Message:* ${formData.message}\n\nPlease respond to this request as soon as possible.`;
        const adminWhatsAppUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(adminMessage)}`;

        // Create customer WhatsApp message
        const customerMessage = `Thank you for contacting Meeseva Services!\n\n📅 *Date & Time:* ${currentDateTime}\n\nWe have received your request for ${formData.service}.\n\nOur team will contact you shortly to assist you with your request.\n\nFor any immediate assistance, please contact us directly.\n\nBest regards,\nMeeseva Services Team`;
        const customerWhatsAppUrl = `https://wa.me/${formData.phone}?text=${encodeURIComponent(customerMessage)}`;

        // Store form data in localStorage for thank you page
        localStorage.setItem('formData', JSON.stringify(formData));

        // Send admin notification
        window.open(adminWhatsAppUrl, '_blank');

        // Send customer confirmation
        window.open(customerWhatsAppUrl, '_blank');

        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    });
}

// Thank You Page WhatsApp Integration
const whatsappLink = document.getElementById('whatsappLink');

if (whatsappLink) {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        const currentDateTime = getCurrentDateTime();
        const customerMessage = `Hi! I just submitted a request for ${formData.service} service at ${currentDateTime}. My name is ${formData.name}. Please assist me with my request.`;
        whatsappLink.href = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(customerMessage)}`;
    }
}

// Animations on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .feature');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 