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

const clipboardIcon = '<svg class="icon-clipboard icon-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 512 512"><title></title><path d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><rect fill="none" height="64" rx="26.13" ry="26.13" stroke="currentColor" stroke-linejoin="round" stroke-width="32" width="160" x="176" y="32"></rect></svg>';
function addTestReportHtml(tdElement) {
  let anchors = tdElement.getElementsByTagName("a");
  if (anchors.length) {
    let anchor = anchors[0];
    let testReportUrl = `${anchor.getAttribute("href")}testReport`;
    tdElement.innerHTML = `${tdElement.innerHTML} <a href="${testReportUrl}">${clipboardIcon}</a>`;
  }
}

const terminalIcon = '<svg class="icon-terminal icon-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 512 512"><title></title><rect fill="none" height="416" rx="48" ry="48" stroke="currentColor" stroke-linejoin="round" stroke-width="32" width="448" x="32" y="48"></rect><path d="M96 112l80 64-80 64M192 240h64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg>';
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
