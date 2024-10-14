document.addEventListener('DOMContentLoaded', function () {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveButton');
  const messageDiv = document.getElementById('message');

  // Load the API key when the options page is opened
  chrome.storage.sync.get(['apiKey'], function (result) {
      if (result.apiKey) {
          apiKeyInput.value = result.apiKey;
      }
  });

  // Save the API key when the button is clicked
  saveButton.addEventListener('click', function () {
      const apiKey = apiKeyInput.value;
      chrome.storage.sync.set({ apiKey: apiKey }, function () {
          messageDiv.textContent = 'API Key saved successfully!';
          messageDiv.style.color = 'green';
      });
  });
});
