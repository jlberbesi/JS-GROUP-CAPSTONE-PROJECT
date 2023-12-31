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
const fetchLikes = async (itemId) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/s14u04tuKMAoE5jNDTZW/likes?item_id=${itemId}`);
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
    data.forEach((commentData) => {
      commentsContainer.innerHTML += `<p class="comment"><strong>${commentData.username}:</strong> ${commentData.comment}</p>`;
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
const postLike = async (appId, itemId) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`, {
      method: 'POST',
      body: JSON.stringify({ item_id: itemId }),
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