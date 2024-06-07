async function generateLink() {
  var linkInput = document.getElementById('linkInput').value;
  var linkOutput = document.getElementById('linkOutput');
  
  // Validate input
  if (linkInput.trim() === '') {
    linkOutput.innerHTML = 'Please enter a valid link';
    return;
  }

  // Generate the TinyURL
  var tinyUrl = await getTinyUrl(linkInput);

  // Display the TinyURL as a button
  linkOutput.innerHTML = '<a href="' + tinyUrl + '" class="button">Click here to get the download link</a>';
}

async function getTinyUrl(url) {
  var response = await fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url));
  var data = await response.text();
  return data;
}

function redirectToOriginalLink() {
  var urlParams = new URLSearchParams(window.location.search);
  var originalLink = urlParams.get('link');
  
  // Redirect to the original link
  window.location.href = originalLink;
}

// Prevent going back to the main page
history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function () {
  history.pushState(null, null, window.location.href);
});
