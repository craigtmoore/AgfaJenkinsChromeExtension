function onWindowLoad() {
  function showKeybinding(command) {
    console.log(command.shortcut)
    console.log(command.shortcut)
    if (command.shortcut) {
      document.getElementById(command.name).innerHTML += ' (' + command.shortcut + ')';
    }
  }

  chrome.commands.getAll(function(commands) {
    commands.map(showKeybinding);
  });

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    var tabId = tabs[0].id;
    var url = tabs[0].url
    chrome.tabs.sendMessage(tabId, {action: 'get page details'}, function(response) {
      var titleItem = document.getElementById('copy-jira');
      titleItem.onclick = function(event) {
        snagJiraFormat(url, response);
        window.close();
      }

      var urlItem = document.getElementById('copy-markdown');
      urlItem.onclick = function(event) {
        snagMarkdownFormat(url, response);
        window.close();
      }

      var htmlItem = document.getElementById('copy-html');
      htmlItem.onclick = function(event) {
        snagHtmlFormat(url, response);
        window.close();
      }
    });
  });
}

window.onload = onWindowLoad;
