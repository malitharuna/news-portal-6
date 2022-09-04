const loadData = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMenu(data.data.news_category);
    }
    catch(error){
        alert('data is not available')
    }
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
    try{
        const res = await fetch(url);
         // console.log(res);
        const data = await res.json();
        // console.log(data.data);
    }catch(error){
        alert('data is not available')
    }


    data.data.sort((a, b) =>  b.total_view - a.total_view)
       
        // console.log(data.data)

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
                    <p class="fw-bold">${singleNews.author.name ? singleNews.author.name : 'n/a'}</p>
                   
                   <p ><span class=" d-flex flex-row" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-2 h-2 ">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                   <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </span> 
                    <span class=" d-flex flex-row">${singleNews.total_view ? singleNews.total_view : 'n/a'} </span> </p>              
                    
                    <button onclick='loadNewsDetails("${singleNews._id}")' class="btn btn-primary p-1 m-0" data-bs-toggle="modal" data-bs-target="#newsDetailModal">see more..</button>
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
    try{
        const res = await fetch(url);
        // console.log(res);
        const data = await res.json();
        displayNewsDetails(data.data);
    }catch(error){
        alert('data is not available')
    }
}

const displayNewsDetails = news =>{
    // console.log(news);
    news.forEach(detailNews => {
        const modalTitle = document.getElementById('newsDetailModalLabel');
        modalTitle.innerText = detailNews.title;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
         <img src="${detailNews.image_url ? detailNews.image_url:' n/a' }" alt="" class="img-fluid">
         <p>Rating: ${detailNews.rating.number} </p>
         <p>Publish Date: ${detailNews.author.published_date} </p>
         <p class="card-text">${detailNews.details}</p>
        `;
    })  
}

loadData();
