function Search() {
  // User Input
  let input = document.getElementById("searchText");

  // Filter, makes search not case sensitive
  let filter = input.value.toUpperCase();

  let container = document.getElementById("repo-container");

  // Individual item on list
  let card = document.getElementsByClassName("repo-card");

  // Treats lists items like an array, where each item can be accessed through it's index
  for (i = 0; i < card.length; i++) {
    let item = card[i];

    // Iterate over each list item to see if the value of the input, ignoring case, matches the inner text or inner html of the item.
    let txtValue = item.textContent || item.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

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
    })
    .catch((err) => {
      console.log(err);
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
    })
    .catch((err) => {
      console.log(err);
    });
}
