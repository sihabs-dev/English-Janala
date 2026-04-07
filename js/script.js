const loadLesons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
};
const displayLevelWord = (words) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (words.length === 0) {
    cardContainer.innerHTML = `
        <div class="text-center col-span-full bangla space-y-3">
          <img class='mx-auto' src='./assets/alert-error.png'>
          <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h3 class="font-bold text-4xl text-[#292524]">
            নেক্সট Lesson এ যান
          </h3>
        </div>
        `;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="text-center bg-white rounded-lg py-5  shadow-2xl space-y-2">
          <h3 class="font-bold text-xl ">${word.word ? word.word : "not found"}</h3>
          <p class="text-gray-500">Meaning /Pronounciation</p>
          <p class="text-[#18181B] font-medium bangla">"${word.meaning ? word.meaning : "not found meaning".} / ${word.pronunciation ? word.pronunciation : "not found pronunciation"}"</p>
          <div class="flex  items-center justify-between w-10/12 mx-auto">
               <button class="bg-[#1A91FF15] py-1.5 px-2 rounded-sm cursor-pointer hover:bg-[#1A91FF45]"><i class="fa-solid fa-circle-info"></i></button>
               <button class="bg-[#1A91FF15] py-1.5 px-2 rounded-sm cursor-pointer hover:bg-[#1A91FF45]"><i class="fa-solid fa-volume-high"></i></button>
         </div>
        </div>
      `;
    cardContainer.appendChild(card);
  });
};
const displayLesson = (lesons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lesons.forEach((leson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick = "loadLevelWord(${leson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${leson.level_no}    
        </button>      
        `;
    levelContainer.appendChild(btnDiv);
  });
};
loadLesons();
