let mainDiv = document.getElementById("home-container");

if (mainDiv) {
  let fetchURL = "https://api.github.com/orgs/Netflix/repos";
  fetch(fetchURL)
    .then((response) => response.json())
    .then((repos) => {
      console.log(repos);
      let output = "";
      repos.forEach(function (data) {
        output += `
        <a href="${data.id}">  
                <div class="repo-card" id=${data.id}">
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
      count = repos.length;
      document.getElementById("home-container").innerHTML = output;
    });
}
