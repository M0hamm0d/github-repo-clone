import env from "./env.js";
const owner = document.querySelector(".owner-name");
let profilePics = document.querySelector(".pro-pics");
const profileSec = document.querySelector(".profile-sec");
const repositoryName = document.querySelector(".repos-container");
const reposNum = document.querySelector(".repos-num");
const description = document.querySelectorAll(".description");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const name = document.querySelector(".name");
const createRepo = document.querySelector(".create-repo");
const repoDropdown = document.querySelector(".repo-dropdown");
const sort = document.querySelector(".sort");
const sortDropdown = document.querySelector(".sort-dropdown");
const closeSort = document.querySelector(".sort-dropdown >.select-title > img");
const closeLang = document.querySelector(".close-lang");
const closeType = document.querySelector(".close-type");
const lang = document.querySelector(".lang-filter");
const langDropdown = document.querySelector(".language-dropdown");
const type = document.querySelector(".type");
const typeDropdown = document.querySelector(".type-dropdown");
const listMore = document.querySelector(".list-more");
const findRepo = document.querySelector("#find-repo");
const filterText = document.querySelector(".filter-text");
const listMoreDropdown = document.querySelector(".list-more-dropdown");
let filterUrl =
  "https://api.github.com/users/M0hamm0d/repos?sort=created&direction=desc&per_page=50";
const menuOverlay = document.querySelector(".menu-overlay");
const menuSlideOut = document.querySelector(".menu-slideout");
const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu");
const body = document.querySelector(".body");
const profileSlideOut = document.querySelector(".profile-slideout");
const profileBtn = document.querySelector(".profile-btn");
const closeProfile = document.querySelector(".close-profile");

profileBtn.addEventListener("click", () => {
  profileSlideOut.style.display = "flex";
  menuOverlay.style.display = "flex";
  body.style.overflow = "hidden";
});
closeProfile.addEventListener("click", () => {
  profileSlideOut.style.display = "none";
  menuOverlay.style.display = "none";
  body.style.overflowY = "scroll";
});

menu.addEventListener("click", () => {
  menuSlideOut.style.display = "flex";
  menuOverlay.style.display = "flex";
  body.style.overflow = "hidden";
});
closeMenu.addEventListener("click", () => {
  menuSlideOut.style.display = "none";
  menuOverlay.style.display = "none";
  body.style.overflowY = "scroll";
});

async function findRepository() {
  let inputFilter = document.getElementById("find-repo").value.toUpperCase();
  let inputFilter2 = document.getElementById("find-repo").value;
  if (inputFilter != "") {
    repositoryName.innerHTML = "";
  }

  let response = await fetch(filterUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        window.location.origin === "http://127.0.0.1:5500" ? env.API_KEY : env
      }`,
    },
  });
  let data = await response.json();
  let filteredRepo = data.filter(
    (item) => item.name.toUpperCase().indexOf(inputFilter) > -1
  );
  filterText.textContent = "";
  if (inputFilter === "") {
    filterText.textContent = "";
  } else {
    filterText.innerHTML = `
    <div class='filter-container'>
      <div class='filter'>
        <span>${filteredRepo.length}</span>
        result for repository matching <span>${inputFilter2}</span> sorted by <span>last update</span>
      </div>
      <div class='clear'>
       <img src="asset/images/svg/cancel.svg" alt="" class="star-logo"/>
       <p>Clear filter</p>
      </div>
    </div>
    `;
  }
  const clearFilter = document.querySelector(".clear");
  clearFilter.addEventListener("click", function () {
    filterText.innerHTML = "";
    if (inputFilter2 !== "") {
      inputFilter2 = "";
    }
  });
  if (inputFilter != "") {
    filteredRepo.forEach((item) => {
      let html = `
      <li>
                  <div class="">
                    <div class="git-title">
                      <h3>
                        <a href="#">${item.name}</a>
                      </h3>
                      <p class="">${item.visibility}</p>
                    </div>
                    <p class="description">
                      ${item.description === null ? "" : item.description}
                    </p>
                    <div class="language">
                      <div class="lang">
                        <div class="lang-color"></div>
                        <p class="prog-lang">${
                          item.language === null ? "HTML" : item.language
                        }</p>
                      </div>
                      <div class="update">Updated 17 hours ago</div>
                    </div>
                  </div>
                  <div class="">
                    <button class="stars">
                      <div class="star-container">
                        <img src="asset/images/svg/star.svg" alt="" class="star-logo"/>
                        <p class="star-text">Star</p>
                      </div>
                      <div class="stars-dropdown">
                        <div class="star-drop">
                          <img src="asset/images/svg/dropdown.svg" alt="" />
                        </div>
                        <div class="dropdown">
                          <div class="title">
                            <h4>List</h4>
                            <img class="close-modal" src="asset/images/svg/cancel.svg" alt="" />
                          </div>
                          <ul class="select-list">
                            <li>
                              <input type="checkbox" name="" id="">
                              <span>🔮 Future ideas</span>
                            </li>
                            <li>
                              <input type="checkbox" name="" id="">
                              <span>🚀 My stack</span>
                            </li>
                            <li>
                              <input type="checkbox" name="" id="">
                              <span>✨ Inspiration</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </button>
                  </div>
                </li>
      `;
      repositoryName.insertAdjacentHTML("beforeend", html);
    });
    const dropdown = document.querySelectorAll(".dropdown");
    const starsDropdown = document.querySelectorAll(".star-drop");
    const main = document.querySelector(".main");
    const starContainer = document.querySelectorAll(".star-container");
    const starText = document.querySelectorAll(".star-text");
    const starLogo = document.querySelectorAll(".star-logo");
    const closeModal = document.querySelectorAll(".close-modal");

    starContainer.forEach((item, i) => {
      item.addEventListener("click", () => {
        if (starText[i].textContent === "Star") {
          starText[i].textContent = "Starred";
          starLogo[i].src = "asset/images/svg/starred.svg";
        } else {
          starText[i].textContent = "Star";
          starLogo[i].src = "asset/images/svg/star.svg";
        }
      });
    });

    closeModal.forEach((item, i) => {
      item.addEventListener("click", () => {
        // console.log(item.className === "close-modal");
        if (item.className === "close-modal") {
          dropdown[i].classList.toggle("active");
        }
      });
    });

    starsDropdown.forEach((item, i) => {
      item.addEventListener("click", () => {
        console.log(item);
        if (item.className === "star-drop") {
          dropdown[i].classList.toggle("active");
        }
        // dropdown[i].style.display = "flex";
      });
    });
  } else {
    repoEndPoint();
  }
}
findRepo.addEventListener("keyup", () => findRepository());

listMore.addEventListener("click", function () {
  listMoreDropdown.classList.toggle("active");
});
let url =
  "https://api.github.com/users/M0hamm0d/repos?sort=created&direction=desc";

sort.addEventListener("click", () => {
  if (sort.className === "sort") {
    typeDropdown.classList.remove("active");
    langDropdown.classList.remove("active");
    sortDropdown.classList.toggle("active");
  }
});
closeSort.addEventListener("click", () => {
  if (closeSort.className === "close-sort") {
    sortDropdown.classList.remove("active");
  }
});
closeLang.addEventListener("click", () => {
  if (closeLang.className === "close-lang") {
    langDropdown.classList.remove("active");
  }
});
closeType.addEventListener("click", () => {
  if (closeType.className === "close-type") {
    typeDropdown.classList.remove("active");
  }
});

type.addEventListener("click", () => {
  typeDropdown.classList.toggle("active");
  langDropdown.classList.remove("active");
  sortDropdown.classList.remove("active");
});
lang.addEventListener("click", () => {
  typeDropdown.classList.remove("active");
  sortDropdown.classList.remove("active");
  langDropdown.classList.toggle("active");
});
createRepo.addEventListener("click", () => {
  repoDropdown.classList.toggle("active");
});

window.location.origin === "http://127.0.0.1:5500"
  ? console.log("I am currently running offline")
  : console.log("I am currently running online");
async function repoEndPoint() {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        window.location.origin === "http://127.0.0.1:5500" ? env.API_KEY : env
      }`,
    },
  });
  const linkHeader = response.headers.get("link");
  let linkHeaderPrev = linkHeader.split(",")[0].includes("prev");
  let linkHeaderNext = linkHeader.split(",")[0].includes("next");

  prevBtn.addEventListener("click", () => {
    if (linkHeaderPrev) {
      repositoryName.innerHTML = "";
      url = linkHeader.split(",")[0].split(";")[0].slice(1, -1);
      prevBtn.style.color = "black";
      nextBtn.style.color = "#0969da";
      repoEndPoint();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (linkHeaderNext) {
      repositoryName.innerHTML = "";
      url = linkHeader.split(",")[0].split(";")[0].slice(1, -1);
      prevBtn.style.color = "#0969da";
      nextBtn.style.color = "black";
      repoEndPoint();
    }
  });

  let data = await response.json();

  owner.textContent = data[0].owner.login;
  name.textContent = data[0].owner.login;
  // profilePics.src = data[0].owner.avatar_url;
  profileSec.src = data[0].owner.avatar_url;
  repositoryName.innerHTML = "";
  data.forEach((item) => {
    let html = `
    <li>
                <div class="">
                  <div class="git-title">
                    <h3>
                      <a href="#">${item.name}</a>
                    </h3>
                    <p class="">${item.visibility}</p>
                  </div>
                  <p class="description">
                    ${item.description === null ? "" : item.description}
                  </p>
                  <div class="language">
                    <div class="lang">
                      <div class="lang-color"></div>
                      <p class="prog-lang">${
                        item.language === null ? "HTML" : item.language
                      }</p>
                    </div>
                    <div class="update">Updated 17 hours ago</div>
                  </div>
                </div>
                <div class="">
                  <button class="stars">
                    <div class="star-container">
                      <img src="asset/images/svg/star.svg" alt="" class="star-logo"/>
                      <p class="star-text">Star</p>
                    </div>
                    <div class="stars-dropdown">
                      <div class="star-drop">
                        <img src="asset/images/svg/dropdown.svg" alt="" />
                      </div>
                      <div class="dropdown">
                        <div class="title">
                          <h4>List</h4>
                          <img class="close-modal" src="asset/images/svg/cancel.svg" alt="" />
                        </div>
                        <ul class="select-list">
                          <li>
                            <input type="checkbox" name="" id="">
                            <span>🔮 Future ideas</span>
                          </li>
                          <li>
                            <input type="checkbox" name="" id="">
                            <span>🚀 My stack</span>
                          </li>
                          <li>
                            <input type="checkbox" name="" id="">
                            <span>✨ Inspiration</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </button>
                </div>
              </li>
    `;
    repositoryName.insertAdjacentHTML("beforeend", html);
  });
  const dropdown = document.querySelectorAll(".dropdown");
  const starsDropdown = document.querySelectorAll(".star-drop");
  const main = document.querySelector(".main");
  const starContainer = document.querySelectorAll(".star-container");
  const starText = document.querySelectorAll(".star-text");
  const starLogo = document.querySelectorAll(".star-logo");
  const closeModal = document.querySelectorAll(".close-modal");

  starContainer.forEach((item, i) => {
    item.addEventListener("click", () => {
      if (starText[i].textContent === "Star") {
        starText[i].textContent = "Starred";
        starLogo[i].src = "asset/images/svg/starred.svg";
      } else {
        starText[i].textContent = "Star";
        starLogo[i].src = "asset/images/svg/star.svg";
      }
    });
  });

  closeModal.forEach((item, i) => {
    item.addEventListener("click", () => {
      // console.log(item.className === "close-modal");
      if (item.className === "close-modal") {
        dropdown[i].style.display = "none";
      }
    });
  });

  starsDropdown.forEach((item, i) => {
    item.addEventListener("click", () => {
      console.log(item);
      if (item.className === "star-drop") {
        dropdown[i].classList.toggle("active");
      }
      // dropdown[i].style.display = "flex";
    });
  });

  const programmingLang = document.querySelectorAll(".prog-lang");
  const langColor = document.querySelectorAll(".lang-color");
  programmingLang.forEach((item, i) => {
    if (item.textContent === "JavaScript") {
      langColor[i].style.backgroundColor = "#f1e05a";
    }
    if (item.textContent === "CSS") {
      langColor[i].style.backgroundColor = "#563d7c";
    }
  });
}
repoEndPoint();
