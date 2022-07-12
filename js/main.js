// Variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};
// Get repos function
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        reposData.innerHTML = "";

        repos.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let theURL = document.createElement("a");
          let theURLText = document.createTextNode("Visit");
          theURL.appendChild(theURLText);
          theURL.href = `https://github.com/${theInput.value}/${repo.name}`;
          theURL.setAttribute("target", "_blank");
          mainDiv.appendChild(theURL);
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText);

          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
}
