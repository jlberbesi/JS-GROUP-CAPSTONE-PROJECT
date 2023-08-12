const postData = async (items, user, usercomment) => {
  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/s14u04tuKMAoE5jNDTZW/comments', {
      method: 'POST',
      body: JSON.stringify({
        item_id: items.id,
        username: user.value,
        comment: usercomment.value,
      }),
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
    });
    if (response.status === 201) {
      console.log('Comment added successfully');
    } else {
      console.error('Failed to add comment');
    }
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};
const fetchLikes = async (item) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/s14u04tuKMAoE5jNDTZW/likes?item_id=${item.id}`);
    const likesData = await response.json();
    return likesData[0]?.likes || 0;
  } catch (error) {
    return 0;
  }
};
const renderComments = (data) => {
  const commentsContainer = document.querySelector('.container__comments');
  commentsContainer.innerHTML = '';
  if (Array.isArray(data)) {
    data.forEach((data) => {
      commentsContainer.innerHTML += `<p class="comment"><strong>${data.username}:</strong> ${data.comment}</p>`;
    });
  }
};
const getData = async (items) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/s14u04tuKMAoE5jNDTZW/comments?item_id=${items.id}`);
    const data = await response.json();
    renderComments(data);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
// eslint-disable-next-line camelcase
const postLike = async (app_id, item_id) => {
  try {
    // eslint-disable-next-line camelcase
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${app_id}/likes`, {
      method: 'POST',
      body: JSON.stringify({ item_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      console.log('Like added successfully');
    } else {
      console.error('Failed to add like');
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
};
export {
  postData, getData, postLike, fetchLikes,
};