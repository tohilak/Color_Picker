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

  // Display the link as a button
  linkOutput.innerHTML = '<a href="' + downloadLink + '" class="button">Click here to get the download link</a>';
}
