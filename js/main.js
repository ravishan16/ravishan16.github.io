// js/main.js

// Constants
const RETRY_DELAY = 500;
const MAX_RETRIES = 3;

// Image lazy loading
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
});

// Icon initialization with retry logic
async function initializeIcons(retries = MAX_RETRIES) {
    try {
        if (typeof lucide === 'undefined') {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return initializeIcons(retries - 1);
            }
            throw new Error('Lucide library failed to load');
        }
        lucide.createIcons();
    } catch (error) {
        console.error('Icon initialization failed:', error);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const menuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('visible');
        
        // Update menu icon
        const menuIcon = menuButton.querySelector('[data-lucide]');
        if (menuIcon) {
            if (isExpanded) {
                menuIcon.setAttribute('data-lucide', 'menu');
            } else {
                menuIcon.setAttribute('data-lucide', 'x');
            }
            initializeIcons();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
            menuButton.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('visible');
            
            // Reset menu icon
            const menuIcon = menuButton.querySelector('[data-lucide]');
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide', 'menu');
                initializeIcons();
            }
        }
    });

    // Close menu when pressing escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('visible')) {
            menuButton.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('visible');
            
            // Reset menu icon
            const menuIcon = menuButton.querySelector('[data-lucide]');
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide', 'menu');
                initializeIcons();
            }
        }
    });
}

// Enhanced fetch with retry logic
async function fetchWithRetry(url, retries = MAX_RETRIES) {
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            lastError = error;
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, i)));
            }
        }
    }
    throw lastError;
}

// Project card creation
function createProjectCard(project) {
    const {
        title = 'Untitled Project',
        description = 'No description available.',
        dateMMYYYY,
        imageUrl,
        tags = [],
        githubUrl,
        liveUrl,
        readMoreUrl
    } = project;

    const card = document.createElement('div');
    card.className = 'project-card content-card';

    const imageHTML = imageUrl ? `
        <img 
            data-src="${imageUrl}" 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23FAF6F0'/%3E%3C/svg%3E" 
            alt="${title}" 
            class="project-card-image lazy"
            onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 600 400\\'%3E%3Crect width=\\'600\\' height=\\'400\\' fill=\\'%23FAF6F0\\'/%3E%3Ctext x=\\'300\\' y=\\'200\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\' fill=\\'%233A3A3A\\'%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E';"
        >
    ` : '';

    const tagsHTML = tags.length > 0 ? 
        `<div class="project-card-tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
    
    const dateHTML = dateMMYYYY ? 
        `<p class="project-card-date"><i data-lucide="calendar"></i>${dateMMYYYY}</p>` : '';
    
    const linksHTML = [
        githubUrl && `<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="project-card-link"><i data-lucide="github"></i>GitHub</a>`,
        liveUrl && `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="project-card-link"><i data-lucide="external-link"></i>Live Demo</a>`,
        readMoreUrl && `<a href="${readMoreUrl}" target="_blank" rel="noopener noreferrer" class="project-card-link"><i data-lucide="book-open"></i>Read More</a>`
    ].filter(Boolean).join('');

    card.innerHTML = `
        <div class="project-card-content">
            ${imageHTML}
            <h3 class="project-card-title">${title}</h3>
            ${dateHTML}
            <p class="project-card-description">${description}</p>
            ${tagsHTML}
        </div>
        ${linksHTML ? `<div class="project-card-links">${linksHTML}</div>` : ''}
    `;

    return card;
}

// Load and render projects
async function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    const loadingIndicator = document.getElementById('projects-loading');
    if (!projectsList) return;

    try {
        const projects = await fetchWithRetry('data/projects.json');
        
        if (loadingIndicator) loadingIndicator.remove();

        if (!Array.isArray(projects) || projects.length === 0) {
            projectsList.innerHTML = '<p class="text-center text-secondary md:col-span-2">No projects to display yet.</p>';
            return;
        }

        projectsList.innerHTML = '';
        projects.forEach(project => {
            const card = createProjectCard(project);
            projectsList.appendChild(card);
            
            // Initialize lazy loading for images in this card
            card.querySelectorAll('.lazy').forEach(img => lazyImageObserver.observe(img));
        });

        // Reinitialize icons for the new content
        initializeIcons();

    } catch (error) {
        console.error('Error loading projects:', error);
        const errorMsg = `<p class="text-center text-accent md:col-span-2">Unable to load projects. Please try again later.</p>`;
        if (loadingIndicator) loadingIndicator.outerHTML = errorMsg;
        else projectsList.innerHTML = errorMsg;
    }
}

// Speaking engagement card creation
function createEngagementCard(engagement) {
    const {
        title = 'Untitled Event',
        event = '',
        eventUrl,
        date,
        location = '',
        role = '',
        description = '',
        imageUrl,
        slidesUrl,
        videoUrl
    } = engagement;

    const card = document.createElement('div');
    card.className = 'speaking-card content-card';

    const imageHTML = imageUrl ? `
        <img 
            data-src="${imageUrl}" 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23FAF6F0'/%3E%3C/svg%3E" 
            alt="${title}" 
            class="speaking-card-image lazy"
            onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 800 400\\'%3E%3Crect width=\\'800\\' height=\\'400\\' fill=\\'%23FAF6F0\\'/%3E%3Ctext x=\\'400\\' y=\\'200\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\' fill=\\'%233A3A3A\\'%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E';"
        >
    ` : '';

    const linksHTML = [
        slidesUrl && `<a href="${slidesUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="presentation" class="inline-block h-4 w-4"></i>Slides</a>`,
        videoUrl && `<a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="video" class="inline-block h-4 w-4"></i>Watch Recording</a>`
    ].filter(Boolean).join('');

    card.innerHTML = `
        ${imageHTML}
        <div class="speaking-card-content">
            <div class="speaking-card-details">
                <h3 class="speaking-card-title">${title}</h3>
                <p class="speaking-card-event">
                    ${eventUrl ? `<a href="${eventUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-accent-darker">${event}</a>` : event}
                </p>
                <p class="speaking-card-meta">${role} • ${location} • ${new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p class="speaking-card-description">${description}</p>
            </div>
            ${linksHTML ? `<div class="speaking-card-links">${linksHTML}</div>` : ''}
        </div>
    `;

    return card;
}

// Load and render speaking engagements
async function loadSpeaking() {
    const speakingList = document.getElementById('speaking-list');
    const loadingIndicator = document.getElementById('speaking-loading');
    if (!speakingList) return;

    try {
        const engagements = await fetchWithRetry('data/speaking.json');
        
        if (loadingIndicator) loadingIndicator.remove();

        if (!Array.isArray(engagements) || engagements.length === 0) {
            speakingList.innerHTML = '<p class="text-center text-secondary">No speaking engagements to display yet.</p>';
            return;
        }

        speakingList.innerHTML = '';
        engagements.forEach(engagement => {
            const card = createEngagementCard(engagement);
            speakingList.appendChild(card);
            
            // Initialize lazy loading for images in this card
            card.querySelectorAll('.lazy').forEach(img => lazyImageObserver.observe(img));
        });

        // Reinitialize icons for the new content
        initializeIcons();

    } catch (error) {
        console.error('Error loading speaking engagements:', error);
        const errorMsg = `<p class="text-center text-accent">Unable to load speaking engagements. Please try again later.</p>`;
        if (loadingIndicator) loadingIndicator.outerHTML = errorMsg;
        else speakingList.innerHTML = errorMsg;
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize icons first
        await initializeIcons();

        // Initialize mobile menu
        initMobileMenu();

        // Load dynamic content
        if (document.getElementById('projects-list')) {
            loadProjects();
        }
        if (document.getElementById('speaking-list')) {
            loadSpeaking();
        }

        // Initialize lazy loading for all existing images
        document.querySelectorAll('.lazy').forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                lazyImageObserver.observe(img);
            }
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

