function podnesi(){
    var confirmed = window.confirm("Ви благодариме за пополнување на анкетата!");
    return !confirmed;
}

document.getElementById('anketa').onsubmit = podnesi;

function kupi(){
    document.getElementById('kupidiv').style.display = 'block';
}

function closekupi(){
    document.getElementById('kupidiv').style.display = 'none';
}

window.onclick = function(event){
    var k = document.getElementById('kupidiv');
    if(event.target == k)
    {
        closekupi();
    }
}

let sliki = [];

function uploadImage(){
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if(file)
    {
        const reader = new FileReader();

        reader.onload = function(e){
            const imageData = {
                src: e.target.result,
                likes: 0,
                comments: []
            };

            sliki.push(imageData);
            renderImages();
        };

        reader.readAsDataURL(file);
    }
}

function deleteImage(index){
    sliki.splice(index,1);
    renderImages();
}

function likeImage(index){
    sliki[index].likes++;
    renderImages();
}

function addComment(index, commentInput){
    const comment = commentInput.value;
    if(comment.trim() !== '')
    {
        sliki[index].comments.push(comment);
        renderImages();
        commentInput.value = '';
    }
    
}

function renderImages(){
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';
    
    sliki.forEach((image, index) => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('image');

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = `Image ${index + 1}`;

        const likeBtn = document.createElement('span');
        likeBtn.classList.add('like-button');
        likeBtn.innerHTML = ` &#x2661; ${image.likes}`;
        likeBtn.onclick = () => likeImage(index);
        
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Додадете коментар...';

        const commentBtn = document.createElement('button');
        commentBtn.innerHTML = 'Коментирај';
        commentBtn.onclick = () => {
            const commentInputValue = commentInput.value;
            if(commentInputValue.trim() !== '')
            {
                addComment(index, commentInput);
                commentInput.value = '';
                renderImages();
            }
        };

        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comments-container');

        image.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Избриши';
        deleteBtn.onclick = () => deleteImage(index);

        imageElement.appendChild(img);
        imageElement.appendChild(likeBtn);
        imageElement.appendChild(commentInput);
        imageElement.appendChild(commentBtn);
        imageElement.appendChild(commentsContainer);
        imageElement.appendChild(deleteBtn);

        imageContainer.appendChild(imageElement);
    });
}

