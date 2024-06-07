function generateLink() {
  var linkInput = document.getElementById('linkInput').value;
  var linkOutput = document.getElementById('linkOutput');
  
  // Validate input
  if (linkInput.trim() === '') {
    linkOutput.innerHTML = 'Please enter a valid link';
    return;
  }

  // Generate the link
  var downloadLink = 'download.html?link=' + encodeURIComponent(linkInput);

  // Display the link
  linkOutput.innerHTML = '<a href="' + downloadLink + '" class="button red">Click here to get the download link</a>';
}

function pasteLink() {
  navigator.clipboard.readText()
    .then(text => {
      document.getElementById('linkInput').value = text;
    })
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
}
