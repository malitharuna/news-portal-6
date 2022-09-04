const loadData = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayMenu(data.data.news_category);
}

const displayMenu = menus =>{
    // console.log(menus);
    const menuContainer = document.getElementById('menu-container');
    menus.forEach(menu =>{
        // console.log(menu);
        const menuLi = document.createElement('li');
            menuLi.classList.add('nav-item');
            menuLi.innerHTML = `
            <a onclick='displayNews("${menu.category_id}")' class="nav-link active" href="#">${menu.category_name}</a>      
            `;
            menuContainer.appendChild(menuLi);
    })
};

// category news divv -----------------
const displayNews = async id =>{
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    // console.log(res);
    const data = await res.json();
    // console.log(data.data);

    const newArr = [];
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ' ';
    data.data.forEach(singleNews=>{
        const categoryNewsDiv = document.createElement('div');
        categoryNewsDiv.classList.add('col');
        categoryNewsDiv.innerHTML = `
        <div class="card">
            <img src="${singleNews.image_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${singleNews.title}</h5>
                <p class="card-text">${singleNews.details.slice(0, 250)}</p>
                <div class="d-flex justify-content-evenly align-items-center"> 
                    <img src="${singleNews.author.img? singleNews.author.img : 'author image not found' }" alt="" style = "height:50px; width:50px; border-radius:50px">
                    <p class="inline">${singleNews.author.name ? singleNews.author.name : 'n/a'}</p>
                    <p class="inline">Total view : ${singleNews.total_view ? singleNews.total_view : 'n/a'}</p>
                    <button onclick= 'loadNewsDetails("${singleNews._id}")' class='btn p-0 m-0'>see more..</button>
                </div>
            </div>
        </div>
        `;
        const totalNews = newsContainer.appendChild(categoryNewsDiv); 
        toggleSpinner(false);
         
        newArr.push(totalNews) ;   
    }) 
    const inputField = document.getElementById('show-number');
    inputField.value = newArr.length + ' found for this category ';      
}

// loader / spinner --------------
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none') 
    }
};

const loadNewsDetails = async(_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    const res = await fetch(url);
    // console.log(res);
    const data = await res.json();
    displayNewsDetails(data.data);
}

const displayNewsDetails = news =>{
    // console.log(news);
    news.forEach(detailNews => {
        const modalTitle = document.getElementById('newsDetailModalLabel');
        modalTitle.innerText = detailNews.title;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
         <img src="${detailNews.thumbnail_url ? detailNews.thumbnail_url:' n/a' }" alt="" class="img-fluid">
         <p>Rating: ${detailNews.rating.number} </p>
         <p>Publish Date: ${detailNews.author.published_date} </p>
         <p class="card-text">${detailNews.details.slice(0, 180)}</p>
        `;
    })
   
}

loadData();
