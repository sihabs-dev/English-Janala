const createBtnByLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((d) => createBtn(d.data));
};

// load word and display card start
const loadWordLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordByLevel(data.data));
};
const displayWordByLevel = (words) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  words.forEach((word) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div
          class="bg-white text-center px-3 py-6 space-y-2.5 rounded-lg shadow-lg"
        >
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p>Meaning /Pronounciation</p>
          <p class="text-xl font-medium bangla">"${word.meaning?word.meaning:"not found"} / ${word.pronunciation}"</p>
          <div class="flex justify-between mx-7">
          <div><i class="fa-solid fa-circle-info"></i></div>
          <div><i class="fa-solid fa-volume-high"></i></div>
           
          </div>
        </div>
    `;
    cardContainer.appendChild(newDiv);
  });
};
// load word end
const createBtn = (elements) => {
  const getBtnContainer = document.getElementById("level-container");
  getBtnContainer.innerHTML = "";
  elements.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
            <button onclick = "loadWordLevel(${element.level_no})" class="btn btn-outline btn-primary">
                  leason - ${element.level_no}
            </button>
        `;
    getBtnContainer.appendChild(newDiv);
  });
};
createBtnByLevel();
