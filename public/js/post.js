const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-title').value.trim();
  const summary = document.querySelector('#new-summary').value.trim();
  const date = document.querySelector('#new-date').value.trim();

  if (title && summary && date) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, summary, date }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);
