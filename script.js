
let blogs = [];
let currentBlogId = null;

function createNewBlog() {
    clearForm();
    currentBlogId = null;
    document.querySelector('.form-group').style.display = 'block';
    document.querySelector('.view-mode').style.display = 'none';
    document.getElementById('managementTitle').textContent = 'Create New Blog';
}

function saveBlog() {
    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();
    if (!title || !content) {
        alert('Please fill in both fields');
        return;
    }
    if (currentBlogId) {
        let blog = blogs.find(b => b.id === currentBlogId);
        if (blog) {
            blog.title = title;
            blog.content = content;
            blog.lastModified = new Date();
        }
    } else {
        let blog = { id: Date.now(), title, content, created: new Date(), views: 0 };
        blogs.push(blog);
        currentBlogId = blog.id;
    }
    updateBlogsList();
    viewBlog(currentBlogId);
}

function editBlog() {
    if (currentBlogId) {
        document.querySelector('.form-group').style.display = 'block';
        document.querySelector('.view-mode').style.display = 'none';
        document.getElementById('managementTitle').textContent = 'Edit Blog';
    }
}

function deleteBlog() {
    if (!currentBlogId) return;
    alert("Do you want to delete this blog?")
    blogs = blogs.filter(blog => blog.id !== currentBlogId);
    currentBlogId = null;
    updateBlogsList();
    createNewBlog();
}

function viewBlog(id) {
    let blog = blogs.find(blog => blog.id === id);
    if (blog) {
        currentBlogId = id;
        blog.views++;
        document.getElementById('viewTitle').textContent = blog.title;
        document.getElementById('viewContent').textContent = blog.content;
        document.getElementById('viewCount').textContent = `Views: ${blog.views}`;
        document.querySelector('.form-group').style.display = 'none';
        document.querySelector('.view-mode').style.display = 'block';
        updateBlogsList();
    }
}

function updateBlogsList() {
    const blogsListDiv = document.getElementById('blogsList');
    blogsListDiv.innerHTML = '';
    blogs.sort((a, b) => b.lastModified - a.lastModified).forEach(blog => {
        let blogItem = document.createElement('div');
        blogItem.className = 'blog-item';
        blogItem.textContent = blog.title;
        blogItem.onclick = () => viewBlog(blog.id);
        blogsListDiv.appendChild(blogItem);
    });
}

function clearForm() {
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
}

window.onload = createNewBlog;