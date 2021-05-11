const root = document.getElementById('root');

document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const author = document.getElementById('author');
    createPost(title.value, content.value, author.value);
    title.value = '';
    content.value = '';
    author.value = '';
})

function createPost(title, content, author) {
    const data = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch('/api/posts/create/', data)
        .then(() => {
            getPostList();
        })
        .catch(err => {
            console.error(err);
        })
}


function getPostList() {
    fetch('/api/posts/')
        .then(res => res.json())
        .then(data => {
            renderPosts(data);
        })
        .catch(err => {
            console.log(err);
        })
}

function renderPosts(data) {
    return data.map(post => {
        renderPost(post);
    })
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, child) {
    return parent.appendChild(child);
}

function renderPost(post) {
    console.log(post);
    const div = createNode('div');
    const link = createNode('a');
    link.href = `/posts/${post.id}`
    div.className = 'post-item';
    const title = createNode('h2');
    const author = createNode('strong');
    const content = createNode('p');
    const breaktag = createNode('br')
    const publish_date = createNode('small');
    const updated = createNode('small');


    author.innerText = `Written by : ${post.author}`;
    content.innerText = post.content;
    publish_date.innerText = `Published: ${new Date(post.publish_date).toDateString()}`;
    updated.innerText = `Updated: ${new Date(post.updated).toDateString()}`;
    title.innerText = post.title;
    append(link,title);
    append(div, link);
    append(div, author);
    append(div, content);
    append(div, breaktag);
    append(div, publish_date);
    append(div, breaktag);
    append(div, updated);
    append(root, div);
}


getPostList()

