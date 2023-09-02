const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const tabContainer = document.getElementById('tab-container');
    // console.log(data.data);
    // forEach loop
    data.data.slice(0, 4).forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="loadCategoryId(${category.category_id})" class="cursor-pointer lg:text-lg font-medium px-5 py-3 bg-gray-300 text-black hover:text-white hover:bg-[#FF1F3D] rounded-lg">${category.category}</a>
        `;
        tabContainer.appendChild(div)
    });
};

// category id 
let sortDataID ;
const loadCategoryId = async (categoryId) => {
    sortDataID = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    // console.log(data.data);

    // draw content apply
    if (data.data.length > 0) {
        drawContent(true)
    }
    else {
        drawContent(false)
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.data.forEach((card) => {
        // time apply
        let postedDate = card.others?.posted_date;
        const totalSec = postedDate;
        const currentMins = totalSec % 60;
        const minutes = (totalSec - currentMins) / 60;
        const currentHrs = minutes % 60;
        const hrs = (minutes - currentHrs) / 60;
        let time;
        if (totalSec.length == 0){
            time;
        }
        else{
            time = `${hrs} hrs ${currentHrs} min ago`
        }

        // card making 
        const div = document.createElement('div');
        div.classList = "bg-base-100 shadow-xl rounded-lg mb-[35px]";
        div.innerHTML = `
        <div class="relative"><img class="relative w-full h-full lg:h-[200px] rounded-lg" src=${card?.thumbnail} alt="Shoes" />
        <p class="absolute ${time ? 'bg-black' : 'bg-none' }  p-1 text-white text-xs right-[10px] lg:bottom-[15px]">${time ? time : ''}</p>
        </div>
        
                <div class="flex mt-4 gap-8 p-3">
                  <img class="h-[40px] w-[40px] rounded-[40px]" src=${card?.authors[0]?.profile_picture} alt="Shoes" />
                  <h2 class="card-title">${card?.title}</h2>
                </div>

                <div class="flex justify-center gap-10 p-3">
                  <div><p>${card?.authors[0]?.profile_name}</p></div>
                  <div><img class = "w-5 h-5" src=" ${card?.authors[0]?.verified === true ? './img/v.svg' : './img/w.png'}" />
                  </div>
                </div>

                <div class="flex justify-center mb-3">
                   <h4>${card?.others?.views} views</h4>
                </div>

        `;
        cardContainer.appendChild(div)
    })
}

// draw content
const drawContent = (yes) => {
    if (yes) {
        const drawContent = document.getElementById('draw-content');
        drawContent.classList.add('hidden');
    }
    else if (!yes) {
        const drawContent = document.getElementById('draw-content');
        drawContent.classList.remove('hidden');
    }
}

// sort by view apply
const sortBtn = document.getElementById('sort-btn');
const sortData =  async() =>{
     const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${sortDataID}`);
    const data = await res.json();
    const getData = data.data;
    const sortData = getData.sort((a,b)=> parseInt(b.others?.views) - parseInt(a.others?.views));
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    sortData.forEach((card) => {
        // console.log(card)
        // time apply
        let postedDate = card.others?.posted_date;
        const totalSec = postedDate;
        const currentMins = totalSec % 60;
        const minutes = (totalSec - currentMins) / 60;
        const currentHrs = minutes % 60;
        const hrs = (minutes - currentHrs) / 60;
        let time;
        if (totalSec.length == 0){
            time;
        }
        else{
            time = `${hrs} hrs ${currentHrs} min ago`
        }

        // card making 
        const div = document.createElement('div');
        div.classList = "bg-base-100 shadow-xl rounded-lg mb-[35px]";
        div.innerHTML = `
        <div class="relative"><img class="relative w-full h-full lg:h-[200px]" src=${card?.thumbnail} alt="Shoes" />
        <p class="absolute ${time ? 'bg-black' : 'bg-none' }  p-1 text-white text-xs right-[10px] lg:bottom-[15px]">${time ? time : ''}</p>
        </div>
        
                <div class="flex mt-4 gap-8 p-3">
                  <img class="h-[40px] w-[40px] rounded-[40px]" src=${card?.authors[0]?.profile_picture} alt="Shoes" />
                  <h2 class="card-title">${card?.title}</h2>
                </div>

                <div class="flex justify-center gap-10 p-3">
                  <div><p>${card?.authors[0]?.profile_name}</p></div>
                  <div><img class = "w-5 h-5" src=" ${card?.authors[0]?.verified === true ? './img/v.svg' : './img/w.png'}" />
                  </div>
                </div>

                <div class="flex justify-center mb-3">
                   <h4>${card?.others?.views} views</h4>
                </div>

        `;
        cardContainer.appendChild(div)
    })
}

loadCategoryId(1000)
loadCategory()