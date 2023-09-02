// console.log("all okh");
function blogPage() {
  //   console.log("click");
  document.querySelector("#blog-btn");
  window.open("blog.html", "_blank");
}

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

const handelLoad = async (categoryId) => {
  //   console.log(categoryId);
  allCategoryId = categoryId;
  // console.log(allCategoryId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const data = await res.json();
  //   console.log(data.data);
  const cardContainer = document.querySelector("#card-container");
  cardContainer.textContent = "";

  if (data.data && data.data.length > 0) {
    data.data?.forEach((cardInfo) => {
      // console.log(cardInfo);
      const div = document.createElement("div");
      const postDateString = cardInfo.others.posted_date;
      // console.log(typeof postDateString);

      let postDateConvertHourToMIn = "";
      if (postDateString) {
        const postDate = parseInt(postDateString);
        const hours = Math.floor(postDate / 3600);
        const remainingSeconds = postDate % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        postDateConvertHourToMIn = `${hours > 0 ? hours + "hrs" : ""} ${
          minutes > 0 ? minutes + " min" : ""
        } ago`;
      }
      // console.log(`Posted: ${postDateConvertHourToMIn}`);
      div.innerHTML = `
      <div class="card  bg-base-100 ">
            <figure>
              <img class ="w-[312px] h-[200px] rounded-lg relative"
                src=${cardInfo?.thumbnail}
              />
              <a class="absolute text-white text-[10px] font-normal py-1 px-1 rounded mt-40 ml-48 ${
                postDateConvertHourToMIn ? "bg-black" : ""
              }">${postDateConvertHourToMIn ? postDateConvertHourToMIn : ""}</a>
            </figure>
            <div class="card-body">
              <div class="flex gap-3">
                <img class ="w-[40px] h-[40px] rounded-[50%]" src=${
                  cardInfo?.authors[0]?.profile_picture
                } />
                <h2 class="card-title text-base font-bold">
                  ${cardInfo.title}
                </h2>
              </div>
              <div class="flex gap-2">
                <div>
                <p class="text-sm font-normal text-[#171717B3]">${
                  cardInfo?.authors[0]?.profile_name
                }</p>
                </div>
                <div>
                ${
                  cardInfo?.authors[0]?.verified
                    ? `<a>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_11_245)">
                  <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                  <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                </g>
                <defs>
                  <clipPath id="clip0_11_245">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              </a>`
                    : ""
                }
              </div>
              </div>
              <p class="text-sm font-normal text-[#171717B3]">${
                cardInfo.others?.views
              } viwes</p>
            </div>
          </div>
      `;
      cardContainer.appendChild(div);
    });
  } else {
    const noContentDiv = document.createElement("div");
    noContentDiv.classList = `container mt-0 lg:mt-[100px] mx-auto ml-0 md:ml-[230px]  lg:ml-[600px]`;
    noContentDiv.innerHTML = `
   <div class = "">
   <img class="mx-auto" src="./resource/Icon.png" alt="" />
   <p class="mt-4 text-[32px] font-bold text-center mx-auto">Oops!! Sorry, There is no content here.</p>
   </div>
    `;
    cardContainer.appendChild(noContentDiv);
  }
};
let allCategoryId = "";
const handleSortByView = async () => {
  if (allCategoryId) {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${allCategoryId}`
    );
    const data = await response.json();
    //   console.log("click", data);
    const getData = data.data;
    //   console.log(getData);
    const AllViews = [];
    getData.forEach((getAllViewsData) => {
      // console.log(getAllViewsData.others.views);
      const getAllViewaString = getAllViewsData.others.views;
      const getAllViews = parseInt(getAllViewaString);
      AllViews.push(getAllViews);
      // console.log(getAllViews);
    });
    AllViews.sort((a, b) => b - a);
    //   console.log(AllViews);

    const cardContainer = document.querySelector("#card-container");
    cardContainer.textContent = "";

    AllViews.forEach((views) => {
      const cardInfo = getData.find((i) => parseInt(i.others.views) === views);
      // console.log(cardInfo);
      if (cardInfo) {
        const div = document.createElement("div");
        const postDateString = cardInfo.others.posted_date;

        let postDateConvertHourToMIn = "";
        if (postDateString) {
          const postDate = parseInt(postDateString);
          const hours = Math.floor(postDate / 3600);
          const remainingSeconds = postDate % 3600;
          const minutes = Math.floor(remainingSeconds / 60);
          postDateConvertHourToMIn = `${hours > 0 ? hours + "hrs" : ""} ${
            minutes > 0 ? minutes + " min" : ""
          } ago`;
        }

        div.innerHTML = `
          <div class="card  bg-base-100 ">
            <figure>
              <img class="w-[312px] h-[200px] rounded-lg relative" src=${
                cardInfo?.thumbnail
              } />
              <a class="absolute text-white text-[10px] font-normal py-1 px-1 rounded mt-40 ml-48 ${
                postDateConvertHourToMIn ? "bg-black" : ""
              }">${postDateConvertHourToMIn ? postDateConvertHourToMIn : ""}</a>
            </figure>
            <div class="card-body">
              <div class="flex gap-3">
                <img class="w-[40px] h-[40px] rounded-[50%]" src=${
                  cardInfo?.authors[0]?.profile_picture
                } />
                <h2 class="card-title text-base font-bold">${
                  cardInfo.title
                }</h2>
              </div>
              <div class="flex gap-2">
                <div>
                  <p class="text-sm font-normal text-[#171717B3]">${
                    cardInfo?.authors[0]?.profile_name
                  }</p>
                </div>
                <div>
                  ${
                    cardInfo?.authors[0]?.verified
                      ? `<a>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_11_245)">
                              <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                              <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.84690 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7610 6.80481 13.1110 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_11_245">
                                <rect width="20" height="20" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </a>`
                      : ""
                  }
                </div>
              </div>
              <p class="text-sm font-normal text-[#171717B3]">${
                cardInfo.others?.views
              } views</p>
            </div>
          </div>
        `;
        cardContainer.appendChild(div);
      }
    });
  }
};
loadData();
handelLoad("1000");
