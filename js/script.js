const createBtnByLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((d) => createBtn(d.data));
};
const createBtn = (elements) => {
  const getBtnContainer = document.getElementById("level-container");
  getBtnContainer.innerHTML = "";
  elements.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
            <button class="btn btn-outline btn-primary">
                  leason - ${element.level_no}
            </button>
        `;
    getBtnContainer.appendChild(newDiv);
  });
};
createBtnByLevel();
