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
            <a class="nav-link" href="#">${menu.category_name}</a>      
            `;
            menuContainer.appendChild(menuLi);
    })
}

loadData();