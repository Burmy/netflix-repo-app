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
                <ul class="home_posts" id=${data.id} onclick="fadeOut(${data.id})">
                    <li class="home_titles">${data.name}</li>
                    <li class="home_titles">${data.description}</li>
                    <li class="home_titles">${data.language}</li>
                    <li class="home_titles">${data.stargazers_count}</li>
                    <li class="home_titles">${data.forks_count}</li>
                    <li class="home_titles">${data.created_at}</li>
                </ul>`;
      });
      count = repos.length;
      document.getElementById("home-container").innerHTML = output;
    });
}
