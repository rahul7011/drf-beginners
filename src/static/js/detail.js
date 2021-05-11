const root = document.getElementById('root');
const title = document.getElementById('title');
const content = document.getElementById('content');
const author = document.getElementById('author');

const pathname=window.location.pathname;
const pathnameParts=pathname.split('/');
const pathID=pathnameParts[pathnameParts.length-1];

document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    updatePost(title.value, content.value, author.value);
    title.value = '';
    content.value = '';
    author.value = '';
})

function updatePost(title, content, author) {
    const data = {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch(`/api/posts/${pathID}/update/`, data)
    .then(() => {
        getPost(path);
    })
    .catch(err => {
        console.error(err);
    })
}

function deletePost(pathID) {
    const data = {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        }
    }
    fetch(`/api/posts/${pathID}/delete/`, data)
    .then(() => {
        window.location = '/';
        // console.log(pathID);
    })
    .catch(err => {
        console.error(err);
    })
}

function getPost(pathID) {
    fetch(`/api/posts/${pathID}/`)
    .then(res => res.json())
    .then(data => {
        prepopulateForm(data);
        renderPost(data);
    })
    .catch(err => {
        console.log(err);
    })
}

function prepopulateForm(data){
    title.value=data.title;
    content.value=data.content;
    author.value=data.author;
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, child) {
    return parent.appendChild(child);
}

function renderPost(post) {
    const div = createNode('div');
    // console.log(post);
    div.className = 'post-detail';
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
    append(div, title);
    append(div, author);
    append(div, content);
    append(div, breaktag);
    append(div, publish_date);
    append(div, breaktag);
    append(div, updated);
    append(root, div);

    appendDeleteBtn(post);
}

function appendDeleteBtn(post){
    const postDiv = document.querySelector('.post-detail');
    const deleteBtn = createNode('button');
    deleteBtn.className = 'post-delete-button';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', e => {
        deletePost(post.id);
    });
    append(postDiv, deleteBtn);
}

getPost(pathID);