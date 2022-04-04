chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action == 'get page url') {
      sendResponse();
    }
  });

  
var url = window.location.href;

// The column with a link to the latest successful build
let successColumn = 4;
// The column with a link to the latest failure build
let failColumn = 5;
// There is one less column on the jenkins01-iibu jenkins server
if (url.includes("jenkins01-iibu")) {
  successColumn = 3;
  failColumn = 4;
}

function addBuildLinks(trElement) {
  let tdSuccessfulBuild = trElement.children[successColumn];
  addTestReportHtml(tdSuccessfulBuild);
  addConsoleHtml(tdSuccessfulBuild);
  
  
  let tdFailedBuild = trElement.children[failColumn];
  addTestReportHtml(tdFailedBuild);
  addConsoleHtml(tdFailedBuild);
}

const clipboardIcon = '<img alt="Results" src="/jenkins/static/ead2b369/images/24x24/clipboard.png" style="width: 24px; height: 24px; width: 24px; height: 24px; margin: 2px;" class="icon-clipboard icon-md">';
function addTestReportHtml(tdElement) {
  let anchors = tdElement.getElementsByTagName("a");
  if (anchors.length) {
    let anchor = anchors[0];
    let testReportUrl = `${anchor.getAttribute("href")}testReport`;
    tdElement.innerHTML = `${tdElement.innerHTML} <a href="${testReportUrl}">${clipboardIcon}</a>`;
  }
}

const terminalIcon = '<img alt="Console" src="/jenkins/static/ead2b369/images/24x24/terminal.png" style="width: 24px; height: 24px; width: 24px; height: 24px; margin: 2px;" class="icon-terminal icon-md">';
function addConsoleHtml(tdElement) {
  let anchor = tdElement.getElementsByTagName("a");
  if (anchor.length) {
    let linkElement = anchor[0];
    let consoleUrl = `${linkElement.getAttribute("href")}console`;
    tdElement.innerHTML = `${tdElement.innerHTML} <a href="${consoleUrl}">${terminalIcon}</a>`;
  }
}

function addLinkToMaster(urlFirstPart, elementH1) {
  let masterUrl = urlFirstPart + "ei-master";
  elementH1.innerHTML = `${elementH1.innerHTML} <a href="${masterUrl}">master</a>`;
}

function addLinkToTeam(urlFirstPart, teamName, elementH1) {
  let teamUrl = `${urlFirstPart}ei-team-${teamName}`;
  elementH1.innerHTML = `${elementH1.innerHTML} <a href="${teamUrl}">${teamName}</a>`;
}

function addBuildLinksForStatus(jobStatus) {
  let builds = document.getElementsByClassName(jobStatus);
  for (let i = 0; i < builds.length; i++) {
    addBuildLinks(builds[i]);
  }
}

const jobStatuses = ['job-status-blue', 'job-status-yellow', 'job-status-red', 'job-status-aborted'];
for (let i = 0; i < jobStatuses.length; i++) {
  let jobStatus = jobStatuses[i];
  addBuildLinksForStatus(jobStatus);
  addBuildLinksForStatus(`${jobStatus}-anime`);
}

// Add link to team branch and master branch next to the 2nd H1 element on the topic branch page
if (url.includes("ei-topic-")) {
  let index = url.indexOf("ei-topic-");
  let urlPrefix = url.substring(0, index);
  let tmp = url.slice(index + 9)
  let teamName = tmp.substring(0, tmp.indexOf("-"));
  let elementsH1 = document.getElementsByTagName("H1")
  if (elementsH1.length > 1) {
    let elementH1 = elementsH1[1];
    addLinkToTeam(urlPrefix, teamName, elementH1);
    addLinkToMaster(urlPrefix, elementH1);
  }
}

// Add link to master branch next to the 2nd H1 element on the team branch page
if (url.includes("ei-team-")) {
  let index = url.indexOf("ei-team-");
  let urlPrefix = url.substring(0, index);
  let elementsH1 = document.getElementsByTagName("H1")
  if (elementsH1.length > 1) {
    let elementH1 = elementsH1[1];
    addLinkToMaster(urlPrefix, elementH1);
  }
}
