chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action == 'get page url') {
      sendResponse();
    }
  });

