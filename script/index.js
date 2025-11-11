//
// loading
setTimeout(() => {
  const loader = document.getElementById("body-loader");
  loader.style.display = "none";
}, 2000);

//
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
const loadCatagoriesName = (name) => {
  const animleContainer = document.getElementById("animale-container");

  animleContainer.classList.remove("grid");

  // ধাপ ১: কন্টেইনার খালি করে সেখানে সরাসরি একটি লোডার বসিয়ে দিন
  animleContainer.innerHTML = `
    <div class="w-full h-full flex justify-center items-center">
      <span class="loading loading-bars loading-lg text-primary"></span>
    </div>
  `;

  // ধাপ ২: দুটি Promise তৈরি করা
  // Promise 1: API থেকে ডেটা আনা
  const fetchData = fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${name}`
  ).then((res) => res.json());

  // Promise 2: ২ সেকেন্ডের একটি ডিলে তৈরি করা
  const delay = new Promise((resolve) => setTimeout(resolve, 2000)); // 2000ms = 2 সেকেন্ড

  // Promise.all() হল JavaScript-এর একটি powerful utility যেটা একাধিক Promise একসাথে parallel ভাবে run করে এবং সবগুলো resolve হলে রেজাল্ট দেয়।
  // ধাপ ৩: Promise.all() দিয়ে দুটি কাজই শেষ হওয়ার জন্য অপেক্ষা করা
  Promise.all([fetchData, delay])
    .then(([dataResult]) => {
      // যখন ডেটা এবং ডিলে দুটোই সম্পন্ন হবে, তখন এই কোড চলবে
      // dataResult হলো fetchData থেকে পাওয়া ডেটা
      displyAnimales(dataResult.data);
    })

    .catch((error) => console.log(error));
};
loadAnimalCatagories();

//////////////////////////////////

// all animals load////////////////////
const loadAllAnimales = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displyAnimales(data.pets))
    .catch((error) => console.log(error));
};
loadAllAnimales();

const displyAnimales = (animales) => {
  // for sort
  allPets = animales;
  //
  const animleContainer = document.getElementById("animale-container");
  animleContainer.innerHTML = "";

  if (!animales || animales.length === 0) {
    animleContainer.classList.remove("grid");
    animleContainer.innerHTML = `
    <div class="h-full w-full flex flex-col gap-5 justify-center items-center text-center bg-[#13131303] rounded-lg
    ">
    <img class="size-[155px]" src="./images/error.webp" Alt="error"/>

    <h2 class="text-center text-3xl font-bold">No Information Available</h2>
    <p class="text-base text-[#13131370] lg:w-[760px]">It is a long established fact that a reader will be distracted by the readable content of a page
     when looking at its layout. The point of using Lorem Ipsum is that it has a.
    </p>
    </div>`;
    return;
  } else {
    animleContainer.classList.add("grid");
  }
  animales.forEach((animal) => {
    const div = document.createElement("div");
    div.className = "animale-card border p-5 rounded-lg";
    div.innerHTML = `
    <div class="h-[160px mb-6"><img class="h-full w-full object-cover rounded-lg" src="${
      animal.image
    }" alt="all"/></div>
     <div>
     <h3 class="text-xl font-bold">${animal.pet_name}</h3>
      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/plumpy/24/deviation.png" alt="breed-icon"/> 
      <p class="text-base text-[#13131370]">Breed : <span>${
        animal.breed ?? "N/A"
      }</span> </p></div>

      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg" 
      src="https://img.icons8.com/material-outlined/48/calendar--v1.png" alt="birth-icon"/>
       <p class="text-base text-[#13131370]">Birth : <span>${
         animal.date_of_birth ?? "Date unavailable"
       }</span> </p>
       </div>

      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/windows/32/gender.png" alt="gender-icon"/>
       <p class="text-base text-[#13131370]">Gender : <span>${
         animal.gender ?? "Others"
       }</span> </p>
       </div>

      <div class="flex gap-2"><img class="size-5 object-cover rounded-lg"
       src="https://img.icons8.com/material-outlined/48/us-dollar--v1.png" alt="doller-icon"/> 
      <p class="text-base text-[#13131370]">Price :  <span>${
        animal.price ?? "Free"
      }</span> 💲 </p></div>

     </div>
     <hr/>
    <div class="flex flex-row gap-2 py-2">

    <button onclick="loadanimalId('${animal._id}"
     class="like-btn p-2 border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2
      focus:ring-blue-500 transition">
     <img
    class="size-5 object-cover"
    src="https://img.icons8.com/material-rounded/50/facebook-like.png"
    alt="Like icon"
     />
</button>

    <button id="disAdapt"  class="adopt-btn py-[9px] px-[16px] border rounded-lg text-[#0E7A81] hover:bg-gray-100 focus:outline-none focus:ring-2
     focus:ring-blue-500 transition">Adopt</button>

    <button onclick="loadanimalId('${
      animal.petId
    }')" class="py-[9px] px-[16px] border rounded-lg text-[#0E7A81] hover:bg-gray-100 focus:outline-none focus:ring-2
     focus:ring-blue-500 transition">Details</button>
    </div>
    `;
    const btn = div.querySelector(".like-btn");
    btn.addEventListener("click", () => {
      loadpetsId(animal.petId, btn); // prottek ta animl abong btn a click kora hoice
    });

    const adoptBtn = div.querySelector(".adopt-btn"); // ⬅️ adopt button টা খুঁজে আনলাম

    // ⬇️ এখন ইভেন্ট বসাও
    adoptBtn.addEventListener("click", () => {
      showAdoptModal(adoptBtn); // ⬅️ এই adopt button কে পাঠাচ্ছি
    });
    animleContainer.appendChild(div);
  });
};
