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