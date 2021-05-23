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
        <a href="https://api.github.com/repos/Netflix/${data.name}/commits">
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

// if (mainDiv) {
//   let fetchURL = "https://api.github.com/orgs/Netflix/repos";
//   fetch(fetchURL)
//     .then((response) => response.json())
//     .then((repos) => {
//       let output = "";
//       repos.sort(function (a, b) {
//         return parseInt(b.forks_count) - parseInt(a.forks_count);
//       });
//       repos.forEach(function (data) {
//         output += `
//         <a href="https://api.github.com/repos/Netflix/${data.name}/commits">
//                 <div class="repo-card" id=${data.id} ">
//                     <div class="repo-name">${data.name}</div>
//                     <div class="repo-desc">${data.description}</div>
//                     <div class="repo-info">
//                         <div class="repo-lang">Language: ${data.language}</div>
//                         <div class="repo-star"> <ion-icon name="star"></ion-icon> Stars: ${data.stargazers_count}</div>
//                         <div class="repo-fork"><ion-icon name="git-network"></ion-icon> Forks: ${data.forks_count}</div>
//                     </div>
//                     <div class="repo-created">Created on: ${data.created_at}</div>
//                 </div>
//         </a>`;
//         fetch(`https://api.github.com/repos/Netflix/${data.name}/commits`)
//           .then((response) => response.json())
//           .then((commits) => {
//             let commit_output = "";
//             commits.forEach(function (data) {
//               commit_output += `
//               <div class="repo-name">${data.commit.message}</div>
//               `;
//             });
//             document.getElementById("container").innerHTML = commit_output;
//           });
//       });

//       document.getElementById("home-container").innerHTML = output;
//     });
// }
