async function generateLink() {
  var linkInput = document.getElementById('linkInput').value;
  var linkOutput = document.getElementById('linkOutput');
  
  // Validate input
  if (linkInput.trim() === '') {
    linkOutput.innerHTML = 'Please enter a valid link';
    return;
  }

  // Generate TinyURL
  var tinyUrl = await getTinyUrl(linkInput);

  // Display the link as a button
  linkOutput.innerHTML = '<a href="' + tinyUrl + '" class="button">Click here to get the download link</a>';
}

async function getTinyUrl(originalUrl) {
  var apiUrl = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(originalUrl);
  var response = await fetch(apiUrl);
  var tinyUrl = await response.text();
  return tinyUrl;
}
