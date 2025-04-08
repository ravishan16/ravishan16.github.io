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
        
        return `
            <article class="content-card blog-card">
                <a href="blog-post.html?id=${blog.id}" class="blog-link">
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

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only run on blog listing page
    if (document.getElementById('blog-list')) {
        loadBlogPosts();
    }
});
