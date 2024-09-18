document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    // Function to get blog posts from localStorage  
    function getBlogPosts() {
        return JSON.parse(localStorage.getItem('blogPosts')) || [];
    }

    // Function to save blog posts to localStorage
    function saveBlogPosts(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    // Function to create a blog post element
    function createPostElement(post) {
        const postElement = document.createElement('article');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Posted on: ${post.date}</small>
        `;
        return postElement;
    }

    if (currentPage === 'login.html') {
        const loginForm = document.getElementById('login-form');
        const blogForm = document.getElementById('blog-form');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple login logic (replace with proper authentication in a real application)
            if (username === 'user' && password === 'password') {
                loginForm.classList.add('hidden');
                blogForm.classList.remove('hidden');
            } else {
                alert('Invalid username or password');
            }
        });

        const postForm = document.getElementById('post-form');
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;

            const newPost = {
                title: title,
                content: content,
                date: new Date().toLocaleString()
            };

            const posts = getBlogPosts();
            posts.unshift(newPost);  // Add new post to the beginning of the array
            saveBlogPosts(posts);

            alert(`New post created: ${title}`);
            postForm.reset();
        });
    }

    if (currentPage === 'blog.html') {
        const blogPosts = document.getElementById('blog-posts');
        
        // Get posts from localStorage
        const posts = getBlogPosts();

        // If there are no posts in localStorage, add some default posts
        if (posts.length === 0) {
            posts.push(
                { title: "Introduction to Arduino", content: "Arduino is an open-source electronics platform based on easy-to-use hardware and software...", date: new Date().toLocaleString() },
                { title: "The Future of 5G", content: "5G is the fifth generation technology standard for broadband cellular networks...", date: new Date().toLocaleString() }
            );
            saveBlogPosts(posts);
        }

        // Display all posts
        posts.forEach(post => {
            blogPosts.appendChild(createPostElement(post));
        });
    }
});