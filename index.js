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

    data.data.forEach(singleNews=>{
        const newsContainer = document.getElementById('news-container');
        
        const categoryNewsDiv = document.createElement('div');
        categoryNewsDiv.classList.add('col');
        categoryNewsDiv.innerHTML = `
        <div class="card">
            <img src="${singleNews.image_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${singleNews.title}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        newsContainer.appendChild(categoryNewsDiv);
        
    }) 
}

loadData();