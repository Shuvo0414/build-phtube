// console.log("all okh");
const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const phTubeData = data.data;
  //   console.log(phTubeData);
  const tabContainer = document.querySelector("#tab-container");
  phTubeData.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick = "handelLoad('${category.category_id}')" class="tab text-base font-medium w-[104px] bg-[#25252526] rounded"
          >${category.category}</a
        >
    `;
    tabContainer.appendChild(div);
  });
};

const handelLoad = (categoryId) => {
  console.log(categoryId);
};

loadData();
