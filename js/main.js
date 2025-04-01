// js/main.js

/**
 * Fetches project data from projects.json and renders it to the projects page.
 */
async function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    const loadingIndicator = document.getElementById('projects-loading');
    if (!projectsList) return; // Exit if container not on page

    try {
        const response = await fetch('data/projects.json'); // Path relative to HTML
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }
        const projects = await response.json();

        if (loadingIndicator) loadingIndicator.remove();

        if (!Array.isArray(projects) || projects.length === 0) {
            projectsList.innerHTML = '<p class="text-center text-secondary md:col-span-2">No projects to display yet.</p>';
            return;
        }

        projectsList.innerHTML = ''; // Clear before adding

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            // Added border class from style.css
            projectCard.className = 'content-card p-6 rounded-lg shadow flex flex-col justify-between border border-light';

            // Safely access properties
            const title = project.title || 'Untitled Project';
            const description = project.description || 'No description available.';
            const dateMMYYYY = project.dateMMYYYY;
            const imageUrl = project.imageUrl;
            const tags = project.tags || [];
            const githubUrl = project.githubUrl;
            const liveUrl = project.liveUrl;
            const readMoreUrl = project.readMoreUrl;

            // --- Create Card Content ---
            let tagsHTML = tags.length > 0 ? `<div class="mt-4 flex flex-wrap gap-2">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
            let imageHTML = '';
             if (imageUrl) {
                const placeholderUrl = `https://placehold.co/600x400/F0F0F0/555555?text=${encodeURIComponent(title)}`; // Updated placeholder colors
                imageHTML = `<img src="${imageUrl}" alt="${title}" class="mb-4 rounded aspect-video object-cover w-full" loading="lazy" onerror="this.onerror=null; this.src='${placeholderUrl}';">`; // Added loading="lazy"
             }
             const dateHTML = dateMMYYYY ? `<p class="text-xs text-secondary mb-2 flex items-center"><i data-lucide="calendar" class="inline-block h-3 w-3 mr-1"></i>${dateMMYYYY}</p>` : '';
            const readMoreLinkHTML = readMoreUrl ? `<a href="${readMoreUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="book-open" class="inline-block h-4 w-4"></i> Read More</a>` : '';

            const contentPart = `<div>${imageHTML}<h3 class="text-xl font-semibold mb-1 text-primary">${title}</h3>${dateHTML}<p class="text-sm text-secondary mb-4">${description}</p>${tagsHTML}</div>`;
            const linksPart = `<div class="flex flex-wrap gap-4 mt-4 pt-4 border-t border-light">${githubUrl ? `<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="github" class="inline-block h-4 w-4"></i> GitHub</a>` : ''}${liveUrl ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1"><i data-lucide="external-link" class="inline-block h-4 w-4"></i> Live Demo</a>` : ''}${readMoreLinkHTML}</div>`;
            projectCard.innerHTML = contentPart + linksPart;
            // --- End Card Content ---

            projectsList.appendChild(projectCard);
        });
        // Initialize icons for the newly added elements
        if (typeof lucide !== 'undefined') lucide.createIcons();

    } catch (error) {
        console.error('Error loading or parsing projects.json:', error); // More specific console error
        const errorMsg = `<p class="text-center text-accent md:col-span-2">Failed to load projects. Please check console for details.</p>`; // Use accent color for error
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
    if (!speakingList) return; // Exit if container not on page

    try {
        const response = await fetch('data/speaking.json'); // Ensure path is correct
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }
        const engagements = await response.json();

        if (loadingIndicator) loadingIndicator.remove();

        if (!Array.isArray(engagements) || engagements.length === 0) {
            speakingList.innerHTML = '<p class="text-center text-secondary">No speaking engagements to display yet.</p>'; return;
        }

        speakingList.innerHTML = ''; // Clear previous content

        engagements.forEach(eng => {
            const section = document.createElement('section');
            section.className = 'content-card p-6 rounded-lg shadow overflow-hidden border border-light'; // Added border

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

            // --- Create Section Content ---
            if (imageUrl) {
                const img = document.createElement('img');
                const placeholderUrl = `https://placehold.co/400x250/F0F0F0/555555?text=${encodeURIComponent(title)}`; // Updated placeholder colors
                img.src = imageUrl; img.alt = title;
                img.className = "mb-4 rounded aspect-video object-cover w-full sm:w-1/3 sm:max-w-[250px] sm:float-right sm:ml-6 sm:mb-2";
                img.loading = "lazy"; // Lazy load images
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
            // Use textContent for safety unless description is guaranteed safe HTML
            descDiv.textContent = description;
            descDiv.className = 'text-secondary mb-4 clear-both prose prose-sm max-w-none'; // Add basic prose styling
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
                 try { // Attempt to parse and create YouTube embed URL
                     const urlObj = new URL(videoUrl);
                     let videoId = null;
                     if ((urlObj.hostname.includes('https://youtu.be/xJdTxfYYMRQ9') || urlObj.hostname.includes('youtube.com/embed0')) && urlObj.searchParams.get('v')) { videoId = urlObj.searchParams.get('v'); }
                     else if (urlObj.hostname.includes('youtu.be/')) { videoId = urlObj.pathname.substring(1); }
                     else if (urlObj.hostname.includes('youtube.com/embed/')) { embedUrl = videoUrl; } // Assume it's already embed

                     if(videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;

                 } catch(e) { console.warn("Could not parse video URL:", videoUrl); }

                if (embedUrl) { // If we got a valid embed URL
                     videoDiv.className = 'video-embed my-4 clear-both'; videoDiv.style.cssText = 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000;';
                     const iframe = document.createElement('iframe'); iframe.src = embedUrl; iframe.title = `YouTube video player for ${title}`; iframe.frameBorder = '0';
                     iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                     iframe.allowFullscreen = true; iframe.loading = "lazy"; // Lazy load iframe
                     iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 0.375rem;'; // Added border-radius
                     videoDiv.appendChild(iframe); videoEmbeddedOrPlaceholder = true;
                 } else if (videoUrl.startsWith('YOUR_YOUTUBE_EMBED_URL_')) { // Handle placeholder
                     const placeholderP = document.createElement('p'); placeholderP.className = 'my-4 text-sm text-red-500 font-semibold';
                     placeholderP.textContent = `[Please update video embed URL in speaking.json for: ${title}]`;
                     videoDiv.appendChild(placeholderP); videoEmbeddedOrPlaceholder = true;
                 }
            }
            // Add video link if not embedded/placeholder and URL exists
            if (videoLinkNeeded && !videoEmbeddedOrPlaceholder) {
                 const videoLink = document.createElement('a'); videoLink.href = videoUrl; videoLink.target = '_blank'; videoLink.rel = 'noopener noreferrer';
                 videoLink.className = 'text-sm text-accent hover:text-accent-darker font-medium flex items-center gap-1';
                 videoLink.innerHTML = `<i data-lucide="video" class="inline-block h-4 w-4"></i> Watch Video`;
                 linksDiv.appendChild(videoLink); linkAdded = true;
            }
            if(linkAdded) contentWrapper.appendChild(linksDiv);
            if(videoEmbeddedOrPlaceholder || (videoLinkNeeded && !linkAdded)) contentWrapper.appendChild(videoDiv);

            section.appendChild(contentWrapper); speakingList.appendChild(section);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons(); // Re-initialize icons
    } catch (error) {
        console.error('Error loading or parsing speaking.json:', error); // More specific console error
        const errorMsg = `<p class="text-center text-accent">Failed to load speaking engagements. Please check console for details.</p>`; // Use accent color
        if (loadingIndicator) loadingIndicator.outerHTML = errorMsg;
        else if (speakingList) speakingList.innerHTML = errorMsg;
    }
}

// --- Main Execution ---
document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Lucide Icons for any static icons first
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide library not loaded.");
    }

    // Load dynamic content only if the specific container exists on the page
    if (document.getElementById('projects-list')) {
        loadProjects();
    }
    if (document.getElementById('speaking-list')) {
        loadSpeaking();
    }
});

