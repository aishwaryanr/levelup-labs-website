// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const modal = document.getElementById('contact-modal');
const openModalBtn = document.getElementById('open-modal');
const openModalAltBtn = document.getElementById('open-modal-alt');
const closeBtn = document.querySelector('.close');

// Open modal
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for modal
openModalBtn.addEventListener('click', openModal);
openModalAltBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Conditional project stage logic
document.querySelectorAll('input[name="services"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedServices = document.querySelectorAll('input[name="services"]:checked');
        const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
        const projectStageGroup = document.getElementById('project-stage-group');
        const projectStageSelect = document.getElementById('project-stage');
        
        // Check if training or investment is selected
        const hasTrainingOrInvestment = Array.from(checkedServices).some(cb => 
            cb.value === 'training' || cb.value === 'investment'
        );
        
        // Show/hide project stage based on selection
        if (hasTrainingOrInvestment && checkedServices.length === 1) {
            projectStageGroup.style.display = 'none';
            projectStageSelect.removeAttribute('required');
        } else {
            projectStageGroup.style.display = 'block';
            projectStageSelect.setAttribute('required', 'required');
        }
        
        // Validation styling
        if (checkedServices.length === 0) {
            serviceCheckboxes.forEach(cb => cb.parentElement.style.color = '#ef4444');
        } else {
            serviceCheckboxes.forEach(cb => cb.parentElement.style.color = '#374151');
        }
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (like checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Handle checkboxes specifically
    const services = formData.getAll('services');
    if (services.length > 0) {
        data.services = services;
    }
    
    // Create email body
    const emailBody = `
New Contact Form Submission:

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role}
Services Interested In: ${Array.isArray(data.services) ? data.services.join(', ') : data.services || 'None selected'}
${data['project-stage'] ? `Project Stage: ${data['project-stage']}` : ''}
Timeline: ${data.timeline}
Budget: ${data.budget || 'Not specified'}

Additional Notes:
${data['additional-info'] || 'None provided'}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:contact@levelup-labs.ai?subject=New Contact Form Submission from ${data.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and close modal
    alert('Thanks! We\'ll reach out to you soon.');
    
    // Reset form and close modal
    this.reset();
    closeModal();
});

// Add active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#e5e7eb';
                }
            });
        });
    }
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}