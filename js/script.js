
const domElements = {
  results: document.getElementById('results'),
  search: {
    input: document.getElementById('search-input'),
    button: document.getElementById('search-button')
  },
  filters: {
    category: document.getElementById('filter-category'),
    color: document.getElementById('filter-color'),
    year: document.getElementById('filter-year'),
    country: document.getElementById('filter-country')
  }
}



function generationCards(cardsData) {

  const cards = [];
  for (let i = 0; i < cardsData.length; i++) {
    let countClass = `card__count`
    let countValue = cardsData[i].count
    if (cardsData[i].count === 0) {
      countClass = `card__count card__count_empty`
      countValue = `Нет в наличии`
    }
    cards.push(`
    <div class="card">
    <img src="img/1.jpg" alt="" class="card__img">
    
    <div class="card__content">
      <h3 class="card_title">${cardsData[i].title}</h3>
    <div class="card__description">${cardsData[i].description}</div>
    <div class="card__info">
      <div class="card__params">
        <label for="">Год</label>
        <div id="year">${cardsData[i].params.year}</div>
      </div>
      <div class="card__params">
        <label for="">Цвет:</label>
        <div id="color">${cardsData[i].params.color}</div>
      </div>
    
      <div class="card__params">
        <label for="">Страна</label>
        <div id="country">${cardsData[i].params.country}</div>
      </div>
      <div class="card__params">
        <label for="">Категория:</label>
        <div id="color">Техника</div>
      </div>
      </div>
      <div class="card__footer">
        <div class="${countClass}">
          <label for="">Количество:</label>
          <div id="count">${countValue}</div>
        </div>  
          <div class="card__cost">
            <label for="">Цена:</label>
            <div id="count">${cardsData[i].cost}</div>
          </div>
        </div>
    </div>

    </div>`)
  }
  return cards
}

const cardsArr = generationCards(cardsData)
domElements.results.innerHTML = cardsArr.join('')



{
  let searchValue = ''
  domElements.search.input.oninput = (event) => {
    searchValue = event.target.value
    filterSearch()
  }

  domElements.search.button.onclick = () => {
    filterSearch()
  }

  function filterSearch() {
    const rgx = new RegExp(searchValue, 'i')
    let filterCardsData = cardsData.filter(card => {
      if (rgx.test(card.title)) {
        return true
      } else {
        return false
      }

    })
    const filteredCardsHTML = generationCards(filterCardsData)
    domElements.results.innerHTML = filteredCardsHTML.join('')
  }
}

{
  const filtersType = [
    'category',
    'color',
    'year',
    'country'
  ]
  function filterSelect(filterType) {
    domElements.filters[filterType].onchange = (event) => {
      const value = event.target.value

      const filteredCards = cardsData.filter(card => {
        const rgx = new RegExp(value)
        // if (rgx.test(card.params[filterType])) {        
        //   return true
        // } else {
        //   return false
        // }

        return rgx.test(card.params[filterType])
      })

      const fullFilteredCards = checkOtherFilters(filtersType, filteredCards)//чому два
      const filteredCardsHTML = generationCards(fullFilteredCards)
      domElements.results.innerHTML = filteredCardsHTML.join('')
    }
  }

  filtersType.forEach(type => filterSelect(type))//перебираем

  function checkOtherFilters(filtersType, filteredCards) {//как две функции работают связано
    let updateFilteredCards = filteredCards
    filtersType.forEach(type => {
      const value = domElements.filters[type].value
      
      const rgx = new RegExp(value)
      const newFilteredCards = updateFilteredCards.filter(card => {
        return rgx.test(card.params[type])
      })
      updateFilteredCards = newFilteredCards

    })

    return updateFilteredCards

  }
}
// два массива







