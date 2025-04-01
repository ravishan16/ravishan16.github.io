// js/main.js

/**
 * Fetches project data from projects.json and renders it to the projects page.
 */
async function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    const loadingIndicator = document.getElementById('projects-loading');
    if (!projectsList) return;
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const projects = await response.json();
        if (loadingIndicator) loadingIndicator.remove();
        if (!Array.isArray(projects) || projects.length === 0) {
            projectsList.innerHTML = '<p class="text-center text-secondary md:col-span-2">No projects to display yet.</p>'; return;
        }
        projectsList.innerHTML = '';
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'content-card p-6 rounded-lg shadow flex flex-col justify-between border'; // Added border

            const title = project.title || 'Untitled Project';
            const description = project.description || 'No description available.';
            const dateMMYYYY = project.dateMMYYYY;
            const imageUrl = project.imageUrl;
            const tags = project.tags || [];
            const githubUrl = project.githubUrl;
            const liveUrl = project.liveUrl;
            const readMoreUrl = project.readMoreUrl;

            let tagsHTML = tags.length > 0 ? `<div class="mt-4 flex flex-wrap gap-2">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
            let imageHTML = '';
             if (imageUrl) {
                const placeholderUrl = `https://placehold.co/600x400/F5F5F5/555555?text=${encodeURIComponent(title)}`; // Updated placeholder colors
                imageHTML = `<img src="${imageUrl}" alt="${title}" class="mb-4 rounded aspect-video object-cover w-full" onerror="this.onerror=null; this.src='${placeholderUrl}';">`;
             }
             const dateHTML = dateMMYYYY ? `<p class="text-xs text-secondary mb-2"><i data-lucide="calendar" class="inline-block h-3 w-3 mr-1 align-middle"></i>${dateMMYYYY}</p>` : '';
            const readMoreLinkHTML = readMoreUrl ? `<a href="${readMoreUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="book-open" class="inline-block h-4 w-4"></i> Read More</a>` : '';

            const contentPart = `<div>${imageHTML}<h3 class="text-xl font-semibold mb-1 text-primary">${title}</h3>${dateHTML}<p class="text-sm text-secondary mb-4">${description}</p>${tagsHTML}</div>`;
            const linksPart = `<div class="flex flex-wrap gap-4 mt-4 pt-4 border-t border-light">${githubUrl ? `<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="github" class="inline-block h-4 w-4"></i> GitHub</a>` : ''}${liveUrl ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="external-link" class="inline-block h-4 w-4"></i> Live Demo</a>` : ''}${readMoreLinkHTML}</div>`;
            projectCard.innerHTML = contentPart + linksPart;
            projectsList.appendChild(projectCard);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (error) {
        console.error('Error loading projects:', error);
        const errorMsg = '<p class="text-center text-red-600 md:col-span-2">Failed to load projects.</p>';
        if (loadingIndicator) loadingIndicator.outerHTML = errorMsg;
        else if (projectsList) projectsList.innerHTML = errorMsg;
    }
}

/**
 * Fetches speaking data from speaking.json and renders it using createElement.
 */
async function loadSpeaking() {
    const speakingList = document.getElementById('speaking-list');
    const loadingIndicator = document.getElementById('speaking-loading');
    if (!speakingList) return;
    try {
        const response = await fetch('data/speaking.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const engagements = await response.json();
        if (loadingIndicator) loadingIndicator.remove();
        if (!Array.isArray(engagements) || engagements.length === 0) {
            speakingList.innerHTML = '<p class="text-center text-secondary">No speaking engagements to display yet.</p>'; return;
        }
        speakingList.innerHTML = '';
        engagements.forEach(eng => {
            const section = document.createElement('section');
            section.className = 'content-card p-6 rounded-lg shadow overflow-hidden border'; // Added border

            const contentWrapper = document.createElement('div');
            const title = eng.title || 'Untitled Engagement';
            const eventName = eng.event || 'Event';
            const eventUrl = eng.eventUrl;
            const date = eng.date;
            const location = eng.location || '';
            const role = eng.role;
            const description = eng.description || '';
            const imageUrl = eng.imageUrl;
            const videoUrl = eng.videoUrl;
            const slidesUrl = eng.slidesUrl;

            if (imageUrl) {
                const img = document.createElement('img');
                const placeholderUrl = `https://placehold.co/400x250/F5F5F5/555555?text=${encodeURIComponent(title)}`; // Updated placeholder colors
                img.src = imageUrl; img.alt = title;
                img.className = "mb-4 rounded aspect-video object-cover w-full sm:w-1/3 sm:max-w-[250px] sm:float-right sm:ml-6 sm:mb-2";
                img.onerror = () => { img.src = placeholderUrl; };
                contentWrapper.appendChild(img);
            }

            const titleH3 = document.createElement('h3');
            titleH3.className = 'text-2xl font-bold text-primary mb-1'; titleH3.textContent = title;
            contentWrapper.appendChild(titleH3);

            const metaP = document.createElement('p');
            metaP.className = 'text-sm text-secondary mb-3';
            let metaHTML = eventUrl ? `<span class="font-semibold"><a href="${eventUrl}" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent-darker font-semibold">${eventName}</a></span>` : `<span class="font-semibold">${eventName}</span>`;
            let dateFormatted = 'Date N/A';
             if (date) { try { dateFormatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { console.warn(`Invalid date format: ${date}`); } }
            metaHTML += ` | ${dateFormatted}`;
            if(location) metaHTML += ` | ${location}`;
            if(role) metaHTML += ` | Role: <span class="font-semibold">${role}</span>`;
            metaP.innerHTML = metaHTML;
            contentWrapper.appendChild(metaP);

            const descDiv = document.createElement('div');
            descDiv.className = 'text-secondary mb-4 clear-both'; descDiv.textContent = description;
            contentWrapper.appendChild(descDiv);

            const linksDiv = document.createElement('div');
            linksDiv.className = 'flex flex-wrap gap-4 mt-auto pt-4 border-t border-light clear-both';
            let linkAdded = false;
            if (slidesUrl) {
                const slidesLink = document.createElement('a'); slidesLink.href = slidesUrl; slidesLink.target = '_blank'; slidesLink.rel = 'noopener noreferrer';
                slidesLink.className = 'text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1';
                slidesLink.innerHTML = `<i data-lucide="presentation" class="inline-block h-4 w-4"></i> View Slides`;
                linksDiv.appendChild(slidesLink); linkAdded = true;
            }
            let videoLinkNeeded = !!videoUrl; let videoEmbeddedOrPlaceholder = false;
            const videoDiv = document.createElement('div'); videoDiv.className = 'my-4 clear-both';
            if (videoUrl) {
                 let embedUrl = '';
                 try {
                     if ((videoUrl.includes('https://youtu.be/xJdTxfYYMRQ5') || videoUrl.includes('https://youtu.be/xJdTxfYYMRQ6')) && new URL(videoUrl).searchParams.get('v')) { embedUrl = `https://www.youtube.com/embed/${new URL(videoUrl).searchParams.get('v')}`; }
                     else if (videoUrl.includes('youtube.com/embed/')) { embedUrl = videoUrl; }
                     else if (videoUrl.includes('youtu.be/')) { const videoId = new URL(videoUrl).pathname.substring(1); if(videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`; }
                 } catch(e) { /* Ignore */ }
                if (embedUrl) {
                     videoDiv.className = 'video-embed my-4 clear-both'; videoDiv.style.cssText = 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000;';
                     const iframe = document.createElement('iframe'); iframe.src = embedUrl; iframe.title = `YouTube video player for ${title}`; iframe.frameBorder = '0'; iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"; iframe.allowFullscreen = true; iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
                     videoDiv.appendChild(iframe); videoEmbeddedOrPlaceholder = true;
                 } else if (videoUrl.startsWith('YOUR_YOUTUBE_EMBED_URL_')) {
                     const placeholderP = document.createElement('p'); placeholderP.className = 'my-4 text-sm text-red-500'; placeholderP.textContent = `[Update video embed URL for: ${title}]`;
                     videoDiv.appendChild(placeholderP); videoEmbeddedOrPlaceholder = true;
                 }
            }
            if (videoLinkNeeded && !videoEmbeddedOrPlaceholder) {
                 const videoLink = document.createElement('a'); videoLink.href = videoUrl; videoLink.target = '_blank'; videoLink.rel = 'noopener noreferrer';
                 videoLink.className = 'text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1';
                 videoLink.innerHTML = `<i data-lucide="video" class="inline-block h-4 w-4"></i> Watch Video`;
                 linksDiv.appendChild(videoLink); linkAdded = true;
            }
            if(linkAdded) contentWrapper.appendChild(linksDiv);
            if(videoEmbeddedOrPlaceholder || (videoLinkNeeded && !linkAdded)) contentWrapper.appendChild(videoDiv); // Add videoDiv if it has embed/placeholder OR if only video link exists

            section.appendChild(contentWrapper); speakingList.appendChild(section);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (error) {
        console.error('Error loading speaking engagements:', error);
        const errorMsg = '<p class="text-center text-red-600">Failed to load speaking engagements.</p>';
        if (loadingIndicator) loadingIndicator.outerHTML = errorMsg;
        else if (speakingList) speakingList.innerHTML = errorMsg;
    }
}

/**
 * Initializes the recommendations carousel on the homepage.
 */
function initCarousel() {
    const container = document.getElementById('recommendations');
    if (!container) return;
    const track = container.querySelector('.carousel-track');
    const slides = Array.from(track ? track.children : []);
    const nextButton = container.querySelector('#nextBtn');
    const prevButton = container.querySelector('#prevBtn');

    if (!track || !nextButton || !prevButton || slides.length <= 1) {
        if(nextButton) nextButton.style.display = 'none';
        if(prevButton) prevButton.style.display = 'none';
        return;
    }

    let slideWidth = container.querySelector('.carousel-container').clientWidth; // Use container width
    let currentIndex = 0;

    function moveToSlide(targetIndex) {
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex >= slides.length) targetIndex = slides.length - 1;

        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`; // Use template literal
        currentIndex = targetIndex;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
        prevButton.classList.toggle('opacity-50', currentIndex === 0);
        nextButton.classList.toggle('opacity-50', currentIndex === slides.length - 1);
    };

    prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));

    function recalculateWidth() {
        slideWidth = container.querySelector('.carousel-container').clientWidth; // Recalculate based on container
        track.style.transition = 'none'; // Disable transition during resize adjustment
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        track.offsetHeight; // Force reflow
        track.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
    };

    if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(recalculateWidth);
        // Observe the container whose width defines the slide width
        resizeObserver.observe(container.querySelector('.carousel-container'));
    } else {
        window.addEventListener('resize', recalculateWidth);
    }

    moveToSlide(0);
    nextButton.style.display = 'inline-flex';
    prevButton.style.display = 'inline-flex';
    console.log("Basic Carousel initialized.");
}


// --- Main Execution ---
document.addEventListener('DOMContentLoaded', (event) => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide library not loaded.");
    }
    if (document.getElementById('recommendations')) initCarousel();
    if (document.getElementById('projects-list')) loadProjects();
    if (document.getElementById('speaking-list')) loadSpeaking();
});
