const loadBtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((d) => createBtn(d.data));
};

// remove active class
const removeActiveClass = () => {
  const selectAllBtn = document.querySelectorAll(".lesson-btn");
  // console.log(selectAllBtn);
  selectAllBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// load word and display card start
const loadWordLevel = (id) => {
  mannageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayWordByLevel(data.data);
    });
};
// create synonyms
const createSynonyms = (arr) => {
  const create = arr.map((synonym) => `<span class='btn'>${synonym}</span>`);
  return create.join(" ");
};
// load word detail
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetail(data.data));
};

// id: 5;
// level: 1;
// meaning: "আগ্রহী";
// partsOfSpeech: "adjective";
// points: 1;
// pronunciation: "ইগার";
// sentence: "The kids were eager to open their gifts.";
// synonyms: (3)[("enthusiastic", "excited", "keen")];
// word: "Eager";
const displayWordDetail = (detail) => {
  document.getElementById("my_modal_5").showModal();
  const wordDetailCard = document.getElementById("word_detail");
  wordDetailCard.innerHTML = `
              <div>
            <h2 class="text-2xl font-bold">${detail.word} (<i class="fa-solid fa-microphone-lines"></i> :${detail.pronunciation})</h2>
          </div>
          <div>
            <h2 class="text-xl font-medium">Meaning</h2>
            <p>${detail.meaning}</p>
          </div>
          <div>
            <h2 class="text-xl font-medium">Example</h2>
            <p>${detail.sentence}</p>
          </div>
          <div>
            <h2 class="text-xl font-medium">সমার্থক শব্দ গুলো</h2>
            <p class="space-x-1">${createSynonyms(detail.synonyms)}</p>
          </div>
  `;
};
// spinner
const mannageSpinner = (input) => {
  if (input === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};

const displayWordByLevel = (words) => {
  
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (words.length === 0) {
    cardContainer.innerHTML = `<div class="text-center col-span-full bangla space-y-4">
          <div class="flex justify-center"> <img src="./assets/alert-error.png" ></div>
          <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h3 class="font-bold text-4xl text-[#292524]">
            নেক্সট Lesson এ যান
          </h3>
        </div>`;
    mannageSpinner(false);
    return;
  }
  //   "id": 5,
  // "level": 1,
  // "word": "Eager",
  // "meaning": "আগ্রহী",
  // "pronunciation": "ইগার"
  words.forEach((word) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div
          class="bg-white text-center px-3 py-6 space-y-2.5 rounded-lg shadow-lg"
        >
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p>Meaning /Pronounciation</p>
          <p class="text-xl font-medium bangla">"${word.meaning ? word.meaning : "not found"} / ${word.pronunciation}"</p>
          <div class="flex justify-between items-center mx-7">
          <button onclick = "loadWordDetail(${word.id})"  class="btn btn-info"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="" class="btn btn-info"><i class="fa-solid fa-volume-high"></i></button>
           
          </div>
        </div>
    `;
    cardContainer.appendChild(newDiv);
  });
  mannageSpinner(false);
};

const createBtn = (elements) => {
  const getBtnContainer = document.getElementById("level-container");
  getBtnContainer.innerHTML = "";
  elements.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
            <button onclick = "loadWordLevel(${element.level_no})" id="lesson-btn-${element.level_no}" class="btn btn-outline btn-primary lesson-btn">
                  leason - ${element.level_no}
            </button>
        `;
    getBtnContainer.appendChild(newDiv);
  });
};
loadBtn();
