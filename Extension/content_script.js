chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action == 'get page url') {
      sendResponse();
    }
  });

function setIssueActivitySortDirection(direction) {
  var sortLink = document.getElementsByClassName('issue-activity-sort-link')[0];
  if (sortLink) {
    var dataOrder = sortLink.getAttribute('data-order');
    if (dataOrder) {
      if (dataOrder == direction) { // we're sorting in the wrong order
        // toggle the sort order (forces a page reload)
        window.location.replace(sortLink.getAttribute('href'));
      }

      // the sort order will stick for the session, so no need to continue checking
      return;
    }
  }

  setTimeout(function () { setIssueActivitySortDirection(direction); }, 100);
}

chrome.storage.sync.get({
  commentSorting: 'no-sort'
},
  function (items) {
    if (items) {
      if (items.commentSorting === 'no-sort') {
        return;
      } else {
        setIssueActivitySortDirection(items.commentSorting);
      }
    }
  });

function isAlreadyLinked(node) {
  while (node.parentNode) {
    node = node.parentNode;
    if (node.nodeName.toUpperCase() == 'A') {
      return true;
    }
  }
  return false;
}

function replace(originalNode, newNode) {
  originalNode.parentNode.replaceChild(newNode, originalNode);
}

function getTextNodeIterator() {
  return document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: function (node) { return NodeFilter.FILTER_ACCEPT; } },
    false
  );
}

function addServiceNowLinks() {
  var serviceNowRegex = /((CMTSK|COM|PRB)[0-9]+)/g;

  var iterator = getTextNodeIterator();
  var textNode;
  while ((textNode = iterator.nextNode()) != null) {
    try {
      if (!textNode.nodeValue || isAlreadyLinked(textNode) || !textNode.nodeValue.match(serviceNowRegex)) {
        continue;
      }

      var span = document.createElement('span');
      span.innerHTML = textNode.nodeValue.replace(
        serviceNowRegex,
        '<a href="https://agfa.service-now.com/textsearch.do?sysparm_search=$1">$1</a>');
      replace(textNode, span);
    } catch (err) {
      console.log("Unknown error while adding ServiceNowLinks", err);
    }
  }
}

var contentNode = document.getElementById('content');
if (contentNode) {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function (mutations, observer) {
    addServiceNowLinks();
  });

  observer.observe(contentNode, {
    subtree: false,
    childList: true,
    attributes: false
  });
}

addServiceNowLinks();
