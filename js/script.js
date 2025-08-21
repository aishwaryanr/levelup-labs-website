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

// Event listeners for modal (only if elements exist)
if (openModalBtn) openModalBtn.addEventListener('click', openModal);
if (openModalAltBtn) openModalAltBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside (only if modal exists)
window.addEventListener('click', function(e) {
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key (only if modal exists)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

// Notes Modal functionality moved to notes-modal.js

// Notes modal event listeners moved to notes-modal.js

// Conditional project stage logic (only if elements exist)
const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
serviceCheckboxes.forEach(checkbox => {
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

// Form submission now handled by Web3Forms - no JavaScript needed

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

// Service item expand/collapse functionality
document.addEventListener('DOMContentLoaded', function() {
    // Notes button event listeners
    document.querySelectorAll('.view-notes-btn').forEach(button => {
        button.addEventListener('click', function() {
            const notesId = this.getAttribute('data-notes-id');
            console.log('Button clicked, notesId:', notesId);
            window.openNotesModal(notesId);
        });
    });
    
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        
        header.addEventListener('click', function() {
            // Close all other items
            serviceItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            // Toggle current item
            item.classList.toggle('expanded');
        });
    });

    // Community speaker session expand/collapse
    const expandButtons = document.querySelectorAll('.expand-session');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const speakerCard = this.closest('.speaker-card');
            const sessionDetails = speakerCard.querySelector('.session-details');
            
            if (sessionDetails.style.display === 'none' || sessionDetails.style.display === '') {
                sessionDetails.style.display = 'block';
                this.textContent = 'Hide Session Notes';
            } else {
                sessionDetails.style.display = 'none';
                this.textContent = 'View Session Notes';
            }
        });
    });

    // Initialize blog functionality if on blog page
    if (document.getElementById('blogGrid')) {
        initializeBlog();
    }
});

// Blog functionality
let allPosts = [];
let displayedPosts = [];
let currentPage = 0;
const postsPerPage = 6;

async function initializeBlog() {
    await loadSubstackPosts();
    setupBlogControls();
}

async function loadSubstackPosts() {
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const blogGrid = document.getElementById('blogGrid');
    
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://thenuancedperspective.substack.com/feed');
        
        if (!response.ok) {
            throw new Error('Failed to fetch RSS feed');
        }
        
        const data = await response.json();
        
        if (data.status !== 'ok') {
            throw new Error(data.message || 'RSS feed error');
        }
        
        allPosts = data.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate),
            description: stripHtml(item.description || item.content || '').substring(0, 200) + '...',
            categories: item.categories || [],
            author: item.author || 'The Nuanced Perspective'
        }));
        
        // Sort by newest first initially
        allPosts.sort((a, b) => b.pubDate - a.pubDate);
        
        loadingMessage.style.display = 'none';
        displayPosts();
        
    } catch (error) {
        console.error('Error loading Substack posts:', error);
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed to load posts. Please try again later.';
    }
}

function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

function displayPosts() {
    const blogGrid = document.getElementById('blogGrid');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    // Get posts to display based on current page
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = displayedPosts.slice(startIndex, endIndex);
    
    if (currentPage === 0) {
        blogGrid.innerHTML = '';
    }
    
    postsToShow.forEach(post => {
        const postCard = createPostCard(post);
        blogGrid.appendChild(postCard);
    });
    
    // Show/hide load more button
    if (endIndex < displayedPosts.length) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-post-card';
    
    const formattedDate = post.pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const category = post.categories.length > 0 ? post.categories[0] : 'Insights';
    
    article.innerHTML = `
        <h2><a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a></h2>
        <div class="post-meta">
            <span class="date">${formattedDate}</span>
            <span class="category">${category}</span>
            <span class="author">${post.author}</span>
        </div>
        <p>${post.description}</p>
        <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="read-more">Read on Substack →</a>
    `;
    
    return article;
}

function setupBlogControls() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        displayedPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm) ||
            post.categories.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        currentPage = 0;
        displayPosts();
    });
    
    // Sort functionality
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        
        switch(sortBy) {
            case 'newest':
                displayedPosts.sort((a, b) => b.pubDate - a.pubDate);
                break;
            case 'oldest':
                displayedPosts.sort((a, b) => a.pubDate - b.pubDate);
                break;
            case 'title':
                displayedPosts.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
        
        currentPage = 0;
        displayPosts();
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        displayPosts();
    });
    
    // Initialize displayed posts
    displayedPosts = [...allPosts];
}