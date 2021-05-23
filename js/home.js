let mainDiv = document.getElementById("home-container");

if (mainDiv) {
  let fetchURL = "https://api.github.com/orgs/Netflix/repos";
  fetch(fetchURL)
    .then((response) => response.json())
    .then((repos) => {
      let output = "";
      repos.sort(function (a, b) {
        return parseInt(b.forks_count) - parseInt(a.forks_count);
      });
      repos.forEach(function (data) {
        output += `
        <a onclick=repoSelected('${data.name}') onclick=getCommit()>
                <div class="repo-card" id=${data.id} ">
                    <div class="repo-name">${data.name}</div>
                    <div class="repo-desc">${data.description}</div>
                    <div class="repo-info">
                        <div class="repo-lang">Language: ${data.language}</div>
                        <div class="repo-star"> <ion-icon name="star"></ion-icon> Stars: ${data.stargazers_count}</div>
                        <div class="repo-fork"><ion-icon name="git-network"></ion-icon> Forks: ${data.forks_count}</div>
                    </div>
                    <div class="repo-created">Created on: ${data.created_at}</div>
                </div>
        </a>`;
      });
      document.getElementById("home-container").innerHTML = output;
    });
}

function repoSelected(name) {
  sessionStorage.setItem("repoName", name);
  window.location = "commits.html";
  return false;
}

function getCommit() {
  let repoName = sessionStorage.getItem("repoName");
  let fetchURL = "https://api.github.com/repos/Netflix/" + repoName + "/commits";
  fetch(fetchURL)
    .then((response) => response.json())
    .then((repos) => {
      let output = "";
      repos.sort(function (a, b) {
        return parseInt(b.forks_count) - parseInt(a.forks_count);
      });
      repos.forEach(function (data) {
        output += `
        <a onclick=repoSelected('${data.name}') onclick=getCommit()>
                <div class="repo-card" id=${data.node_id} ">
                    <div class="repo-name">${data.node_id}</div>
                    <div class="repo-desc">${data.description}</div>
                    <div class="repo-info">
                        <div class="repo-lang">Language: ${data.language}</div>
                        <div class="repo-star"> <ion-icon name="star"></ion-icon> Stars: ${data.stargazers_count}</div>
                        <div class="repo-fork"><ion-icon name="git-network"></ion-icon> Forks: ${data.forks_count}</div>
                    </div>
                    <div class="repo-created">Created on: ${data.created_at}</div>
                </div>
        </a>`;
      });
      document.getElementById("container").innerHTML = output;
    });
}
