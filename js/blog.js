// Blog functionality

// Constants for blog functionality
const BLOG_DATA_URL = 'data/blog.json';

// Load and display blog posts
async function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    const tagButtons = document.getElementById('tag-buttons');
    
    if (!blogList) return;
    
    try {
        // Use the existing fetchWithRetry function from main.js
        const blogs = await fetchWithRetry(BLOG_DATA_URL);
        
        // Clear loading indicators
        blogList.innerHTML = '';
        if (tagButtons) tagButtons.innerHTML = '';
        
        // Sort by date (newest first)
        const sortedBlogs = blogs
            .filter(blog => blog.published)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (sortedBlogs.length === 0) {
            blogList.innerHTML = '<p class="no-results">No blog posts available yet.</p>';
            return;
        }
        
        // Extract all unique tags
        const allTags = new Set();
        sortedBlogs.forEach(blog => {
            if (blog.tags) {
                blog.tags.forEach(tag => allTags.add(tag));
            }
        });
        
        // Create tag filter buttons
        if (tagButtons) {
            tagButtons.innerHTML = '<button class="tag-btn active" data-tag="all">All</button>';
            
            Array.from(allTags).sort().forEach(tag => {
                const button = document.createElement('button');
                button.className = 'tag-btn';
                button.setAttribute('data-tag', tag);
                button.textContent = tag;
                tagButtons.appendChild(button);
            });
            
            // Set up tag filtering
            document.querySelectorAll('.tag-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active button
                    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const selectedTag = this.getAttribute('data-tag');
                    
                    if (selectedTag === 'all') {
                        renderBlogPosts(sortedBlogs, blogList);
                    } else {
                        const filteredBlogs = sortedBlogs.filter(blog => 
                            blog.tags && blog.tags.includes(selectedTag)
                        );
                        renderBlogPosts(filteredBlogs, blogList);
                    }
                });
            });
        }
        
        // Render the blog posts
        renderBlogPosts(sortedBlogs, blogList);
        
        // Initialize new icons that were added
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Set up share functionality for all blog cards
        setupBlogCardSharing();
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogList.innerHTML = '<p class="error">Failed to load blog posts. Please try again later.</p>';
        if (tagButtons) tagButtons.innerHTML = '';
    }
}

// Render blog posts to the provided element
function renderBlogPosts(blogs, container) {
    if (blogs.length === 0) {
        container.innerHTML = '<p class="no-results">No blog posts match your filter.</p>';
        return;
    }
    
    container.innerHTML = blogs.map(blog => {
        const imageUrl = blog.coverImage || blog.imageUrl || 'blog/default/images/default-cover.jpg';
        const formattedDate = formatDate(blog.date);
        const blogUrl = `blog-post.html?id=${blog.id}`;
        
        return `
            <article class="content-card blog-card">
                <a href="${blogUrl}" class="blog-link">
                    <div class="blog-image">
                        <img 
                            data-src="${imageUrl}" 
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23FAF6F0'/%3E%3C/svg%3E" 
                            alt="${blog.title}" 
                            class="lazy"
                        >
                    </div>
                    <div class="blog-content">
                        <h2>${blog.title}</h2>
                        <div class="blog-meta">
                            <span>${formattedDate}</span>
                        </div>
                        <p class="blog-summary">${blog.summary}</p>
                        <div class="blog-tags">
                            ${blog.tags ? blog.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                </a>
                
                <!-- Add share buttons to each blog card -->
                <div class="blog-card-share">
                    <button class="blog-card-share-button" data-share="twitter" data-url="${blogUrl}" data-title="${blog.title}" aria-label="Share on Twitter">
                        <i data-lucide="twitter"></i>
                    </button>
                    <button class="blog-card-share-button" data-share="facebook" data-url="${blogUrl}" data-title="${blog.title}" aria-label="Share on Facebook">
                        <i data-lucide="facebook"></i>
                    </button>
                    <button class="blog-card-share-button" data-share="linkedin" data-url="${blogUrl}" data-title="${blog.title}" aria-label="Share on LinkedIn">
                        <i data-lucide="linkedin"></i>
                    </button>
                    <button class="blog-card-share-button" data-share="copy" data-url="${blogUrl}" data-title="${blog.title}" aria-label="Copy link">
                        <i data-lucide="link"></i>
                    </button>
                </div>
            </article>
        `;
    }).join('');
    
    // Initialize lazy loading for new images
    container.querySelectorAll('.lazy').forEach(img => {
        if (typeof lazyImageObserver !== 'undefined') {
            lazyImageObserver.observe(img);
        } else {
            // Fallback if lazyImageObserver isn't available
            img.src = img.dataset.src;
        }
    });
}

// Format date in a consistent way
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Set up share functionality for blog cards
function setupBlogCardSharing() {
    document.querySelectorAll('.blog-card-share-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const shareType = button.getAttribute('data-share');
            const url = new URL(button.getAttribute('data-url'), window.location.origin).toString();
            const title = button.getAttribute('data-title');
            const shareText = `Check out "${title}" by Ravishankar Sivasubramaniam`;
            
            switch (shareType) {
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
                    break;
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url)
                        .then(() => {
                            // Create and show a temporary feedback message
                            const card = button.closest('.blog-card');
                            const feedback = document.createElement('div');
                            feedback.className = 'copy-feedback visible';
                            feedback.textContent = 'Link copied to clipboard!';
                            card.appendChild(feedback);
                            
                            // Remove the message after 2 seconds
                            setTimeout(() => {
                                feedback.remove();
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy URL: ', err);
                            alert('Failed to copy the link. Please try again.');
                        });
                    break;
            }
        });
    });
}

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only run on blog listing page
    if (document.getElementById('blog-list')) {
        loadBlogPosts();
    }
});
