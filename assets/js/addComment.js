import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

// 댓글을 달자마자 추가된 댓글이 보이도록 함
const addComment = (comment) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = comment;
    li.appendChild(span)
    commentList.prepend(li); // 객체를 앞에 추가해주는것!
    increaseNumber();
}

const sendComment = async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios.post(`/api/${videoId}/comment`, {
        comment
    });
    if (response.status === 200) addComment(comment);
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

const init = () => {
    addCommentForm.addEventListener('submit', handleSubmit)
}

if (addCommentForm) {
    init();
}