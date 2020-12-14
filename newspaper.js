let previousSection = '';
let previousBtn = '';
/********************************Fetch******************************** */
async function fetchSectionData(category){
    try{
      const url = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=xYuovURhNH6XGKpwTOXPvTnHfuzoLl7r`  
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch(err){
      console.log(err);
    }
  }


  async function fetchData(section){
    if(previousSection !== ''){
      document.getElementById(previousSection).classList.add('hidden');
    }
    document.getElementById(section).classList.remove('hidden');
    const data = await fetchSectionData(section);    
    populateSection(data, section+'Column');
    previousSection = section;
  }
/******************************** CUSTOM DOM ******************************** */
  function createElement(element, elementClass = '', elementId = ''){
    const newElement = document.createElement(element);
    elementClass !== ''? newElement.setAttribute('class', elementClass): '';
    elementId !== ''? newElement.setAttribute('id', elementId): '';
    return newElement;
  }
  /********************************to add the data recieved to the card ******************************** */
  function populateSection(data, columnId){
    const section = data.section || '';
    data.results.forEach(article => {
        const div = createCard(article, section);
        document.getElementById(columnId).append(div);                  
    });
  }
/********************************create card******************************** */
  function createCard(article, section){
    let imageUrl = '';
    if(article.multimedia){
      imageUrl = article.multimedia[0].url;
    }
    const card = createElement('div', 'card mt-3');
      const cardRow = createElement('div', 'row');
        const column1 = createElement('div','col-md-8 col-12');
          const cardBody = createElement('div', 'card-body');
            const sectionTitle = createElement('h5', 'card-title text-uppercase');
              sectionTitle.innerHTML = `${section}`;
            const articleTitle = createElement('h6', 'card-title text-capitalize');
              articleTitle.innerHTML = `${article.title}`;
            const articlePublishedDate = createElement('h6', 'card-title');
              articlePublishedDate.innerHTML = `${formatDate(article.published_date)}`;   
            const articleAbstract = createElement('p', 'card-text');
              articleAbstract.innerHTML = `${article.abstract}`; 
            const articleLink = createElement('a', 'text-primary');
              articleLink.innerHTML = `+ Continue Reading`;
              articleLink.setAttribute('href', `${article.url}`);
              articleLink.setAttribute('target', '_blank');
          cardBody.append(sectionTitle, articleTitle, articlePublishedDate, articleAbstract, articleLink);
        column1.append(cardBody);       
  
        const column2 = createElement('div','col-md-4 col-12');
          const image = createElement('img', 'img-thumbnail');
            image.setAttribute('src', `${imageUrl}`);
            image.setAttribute('alt', 'image not found');
        column2.append(image);
      cardRow.append(column1, column2);
    card.append(cardRow);
    return card;        
  }

  function formattedDate(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    const dayName = days[d.getDay()];
    const monthName = monthNames[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();
    return `${dayName}, ${monthName}, ${date}, ${year}`
  }
  
  function generatePageHeader(){
      const pageHeaderContainer = createElement('div', 'container mt-2');
        const pageHeaderRow = createElement('div', 'row');
          const pageHeaderColumn1 = createElement('div', 'col-12 col-lg-2 text-center font-weight-bold dateClass')
            const dateP = createElement('p');
            dateP.innerHTML = formattedDate();
            dateP.style.fontFamily = 'cursive';
            pageHeaderColumn1.append(dateP);
          const pageHeaderColumn2 = createElement('div', 'col-12 col-lg-8 text-center');
            const pageTitle = createElement('p', 'pageTitle')
              pageTitle.innerHTML = 'The New York Times'
          pageHeaderColumn2.append(pageTitle);
        pageHeaderRow.append(pageHeaderColumn1, pageHeaderColumn2);
      pageHeaderContainer.append(pageHeaderRow);        
    document.body.append(pageHeaderContainer);  
  }
  
  function createLink(section){
    const li = createElement('li', 'nav-item');
      const a = createElement('a', 'nav-link text-uppercase', `${section}Btn`);
      a.text = section;
    li.append(a);
    return li;  
  }
  /********************************navigation bar******************************** */
  function generateNav(){
    const navContainer = createElement('div','container');
      const navRow = createElement('div', 'row');
        const navColumn = createElement('div', 'col-12');
          const nav = createElement('nav', 'navbar navbar-expand-lg navbar-light bg-light');
            const navButton = createElement('button', 'navbar-toggler');
              navButton.setAttribute('type' ,'button');
              navButton.setAttribute('data-toggle' ,'collapse');
              navButton.setAttribute('data-target' ,'#navbarNav');
              navButton.setAttribute('aria-controls' ,'navbarNav');
              navButton.setAttribute('aria-expanded' ,'false');
              navButton.setAttribute('aria-label' ,'Toggle navigation');
            const span = createElement('span', 'navbar-toggler-icon');
            navButton.append(span);
            //<a class="navbar-brand" href="#">Navbar</a>

            const navBrand = createElement('a', 'navbar-brand navBrandClass');
            navBrand.text = 'The New York Times';


            const navLinksDiv = createElement('div', 'collapse navbar-collapse', 'navbarNav');
              const navLinksUl = createElement('ul', 'navbar-nav');
                const liHome = createLink('home');
                const liWorld = createLink('world');
                const liPolitics = createLink('politics');
                const liMagazine = createLink('magazine');
                const liTechnology = createLink('technology');
                const liScience = createLink('science');
                const liHealth = createLink('health');
                const liSports = createLink('sports');
                const liArts = createLink('arts');
                const liFashion = createLink('fashion');
                const liFood = createLink('food');
                const liTravel = createLink('travel');
              navLinksUl.append(liHome, liWorld, liPolitics, liMagazine, liTechnology, liScience, liHealth, liSports, liArts, liFashion, liFood, liTravel);
            navLinksDiv.append(navLinksUl);  
            nav.append(navButton);
            nav.append(navBrand);
            nav.append(navLinksDiv);
          
        navColumn.append(nav);
      navRow.append(navColumn);
    navContainer.append(navRow);    
  document.body.append(navContainer);
}
/********************************container******************************** */
function createContainer(section){
  const div = createElement('div', 'container hidden', section);
    const row = createElement('div', 'row');
      const column = createElement('div', 'col-12', `${section}Column`);
    row.append(column);
  div.append(column);
  return div;    
}

function generateSections(){
    const homeContainer = createContainer('home');
    const worldContainer = createContainer('world');
    const politicsContainer = createContainer('politics');
    const magazineContainer = createContainer('magazine');
    const technologyContainer = createContainer('technology');
    const scienceContainer = createContainer('science');
    const healthContainer = createContainer('health');
    const sportsContainer = createContainer('sports');
    const artsContainer = createContainer('arts');
    const fashionContainer = createContainer('fashion');
    const foodContainer = createContainer('food');
    const travelContainer = createContainer('travel');
    document.body.append(homeContainer, worldContainer, politicsContainer, magazineContainer, technologyContainer, scienceContainer, healthContainer, sportsContainer, artsContainer, fashionContainer, foodContainer, travelContainer);
  }

  function generateHtmlBody(){
    generatePageHeader();
    generateNav();
    generateSections();
    fetchData('home');
    document.getElementById('homeBtn').classList.add('active');
    previousBtn = 'homeBtn';
  }

  generateHtmlBody();

function formatDate(publishedDate){
  const _date = new Date(publishedDate);
  const month = _date.toLocaleDateString('default', {month: 'long'});
  const day = _date.getDay();
  return month + ' '+ day; 
}

const links = document.querySelectorAll('a[id*="Btn"]');

links.forEach(link => {
  link.addEventListener('click', (event)=> {
    if(previousBtn !==''){
      document.getElementById(previousBtn).classList.remove('active');
    }
    const anchor = event.target;
    anchor.classList.add('active');
    fetchData(anchor.text);
    previousBtn = `${anchor.text}Btn`;
  });
});
