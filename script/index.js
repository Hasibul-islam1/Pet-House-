// loading
setTimeout(() => {
  const loader = document.getElementById("body-loader");
  loader.style.display = "none";
}, 2000);

const loadAnimalCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log("error :", err));
};

const displayCatagories = (item) => {
  const CatagoryContainer = document.getElementById("animale-catagories");
  CatagoryContainer.innerHTML = ""; // আগেরগুলা ক্লিয়ার করো

  item.forEach((category) => {
    const btn = document.createElement("button");
    btn.className =
      " focus:bg-[#0E7A8110] focus:[border-radius:120px] p-6 rounded-lg border h-full w-full flex gap-6 justify-center items-center";

    btn.innerHTML = `
      <img class="category-btn size-14" src="${category.category_icon}" alt="animal-img" />
      <h2 class="text-6 font-bold ">${category.category}</h2>
    `;

    // ✅ Click event attach
    btn.addEventListener("click", () => {
      loadCatagoriesName(category.category);
    });

    CatagoryContainer.appendChild(btn);
  });
};
////////////////////////////////////////// click pets naem or show pets
const loadpetsId = async (animalId, clickedButton) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${animalId}`
    );
    const data = await res.json();
    animalLike(data);
  } catch (error) {
    console.log("error  :", error);
  }
};

const animalLike = (data) => {
  const likeContainer = document.getElementById("like-animale");
  // console.log(data.petData);
  const pet = data.petData;
  const div = document.createElement("div");
  div.className = "h-28";

  div.innerHTML = `
    <img src="${pet.image}" class="w-full h-full object-cover rounded-lg" />
    `;
  likeContainer.appendChild(div);
};
/////////////////////////////////////////////////
// sort
let allPets = []; // global scope e rakha
const sortByprice = (viewStr) => {
  if (!viewStr) return 0; // null, undefined, empty string হলে 0 return করো
  return parseFloat(viewStr.toString().replace(/[^0-9.]/g, ""));
};

const sortAnimalPrice = () => {
  const animleContainer = document.getElementById("animale-container");

  // ⏳ Step 1: প্রথমে লোডার দেখাও
  animleContainer.innerHTML = `
      <div class="w-full h-full flex justify-center items-center">
        <span class="loading loading-bars loading-lg text-primary"></span>
      </div>
    `;
  animleContainer.classList.remove("grid");
  setTimeout(() => {
    allPets.sort((a, b) => {
      return sortByprice(b.price) - sortByprice(a.price);
    });
    animleContainer.classList.add("grid");
    // আগে পুরনোগুলো মুছে ফেলো
    animleContainer.innerHTML = "";

    // তারপর নতুনগুলো দেখাও
    displyAnimales(allPets);
  }, 2000);
};
