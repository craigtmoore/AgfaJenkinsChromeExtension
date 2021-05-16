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

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, {action: 'get page details'}, function(response) {
      if ( ! response ) {
        var lis = document.getElementsByTagName('li');
        for ( var i = 0; i < lis.length; i++ ) {
          lis[i].style.cursor = 'not-allowed';
        }

        return;
      }

      var titleItem = document.getElementById('copy-jira');
      titleItem.onclick = function(event) {
        snagTitle(response);
        window.close();
      }

      var urlItem = document.getElementById('copy-markdown');
      urlItem.onclick = function(event) {
        snagLink(response);
        window.close();
      }

      var htmlItem = document.getElementById('copy-html');
      htmlItem.onclick = function(event) {
        snagHtmlLink(response);
        window.close();
      }

      // We can't set window.location.href from within a popup's code,
      // so delegate to the code we've injected into the host page.
      var emailItem = document.getElementById('send-email');
      emailItem.onclick = function(event) {
        chrome.tabs.sendMessage(tabId, {action: 'send e-mail'});
        window.close();
      }
    });
  });
}

window.onload = onWindowLoad;
