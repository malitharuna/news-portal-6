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


const displayNews = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    // console.log(res);
    const data = await res.json();
    console.log(data.data);
    // console.log((data.data.news_category[0].category_id)
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
                <div class="d-flex, "> 
                    <img src="${singleNews.author.img ? singleNews.author.img : 'n/a'}" alt="" style = "height:100px; width:100px; border-radius:50px">
                    <p class="inline">${singleNews.author.name ? singleNews.author.name : 'n/a'}</p>
                    <p class="inline">${singleNews.total_view ? singleNews.total_view : 'n/a'}</p>
                    <button class="btn btn-primary">click</button>
                </div>
            </div>
        </div>
        `;
        const totalNews = newsContainer.appendChild(categoryNewsDiv); 
         
        newArr.push(totalNews) ;   
    }) 
    const inputField = document.getElementById('show-number');
    inputField.value = newArr.length + ' found for this category ';
        
}

loadData();