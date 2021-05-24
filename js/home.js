// let repos = [];
// console.log(repos);

// const searchBar = document.getElementById("searchText");

// searchBar.addEventListener("keyup", (e) => {
//   const searchString = e.target.value;
//   const filteredRepos = repos.filter((repo) => {
//     return repo.name.contains(searchString);
//   });
//   console.log(filteredRepos);
// });

//Showing all the repos
let reposPage = document.getElementById("repo-container");

if (reposPage) {
  let fetchURL = "https://api.github.com/orgs/Netflix/repos";
  fetch(fetchURL)
    .then((response) => response.json())
    .then((repos) => {
      let output = "";
      repos.sort(function (a, b) {
        return parseInt(b.forks_count) - parseInt(a.forks_count);
      });
      repos.forEach(function (data) {
        createdOn = new Date(data.created_at).toDateString();
        output += `
        <a onclick=repoSelected('${data.name}') onclick=getCommit()>
                <div class="repo-card" id=${data.id} ">
                    <div class="repo-name">${data.name}</div>
                    <div class="repo-desc">${data.description}</div>
                    <div class="repo-info">
                      <div class="repo-sub-info">
                        <div class="repo-lang">Language: ${data.language}</div>
                        <div class="repo-star"> <ion-icon name="star"></ion-icon> Stars: ${data.stargazers_count}</div>
                        <div class="repo-fork"><ion-icon name="git-network"></ion-icon> Forks: ${data.forks_count}</div>
                      </div>
                        <div class="repo-created">Created on: ${createdOn}</div>
                    </div>
                    
                </div>
        </a>`;
      });
      document.getElementById("repo-container").innerHTML = output;
    });
}

//stores the repo name which was selected
function repoSelected(name) {
  sessionStorage.setItem("repoName", name);
  window.location = "commits.html";
  return false;
}

//showing the commits of the repos
function getCommit() {
  let repoName = sessionStorage.getItem("repoName");
  let fetchURL = "https://api.github.com/repos/Netflix/" + repoName + "/commits";
  fetch(fetchURL)
    .then((response) => response.json())
    .then((commits) => {
      let output = `<div class="commit-line"> <div class="repo-selected">${repoName}</div>`;
      commits.forEach(function (data) {
        createdOn = new Date(data.commit.author.date).toDateString();
        output += `
          <div class="each-commit">
              <div class="committer"><ion-icon class = "commit-icon" name="git-commit-outline"></ion-icon> ${data.commit.author.name} on ${createdOn}</div>
              <div class="commit-info">
                <div class="commit-message">Commit: ${data.commit.message}</div>
                <div class="commit-hash">Hash: ${data.sha}</div>
              </div>
          </div>`;
      });
      document.getElementById("commit-container").innerHTML = output;
    });
}
