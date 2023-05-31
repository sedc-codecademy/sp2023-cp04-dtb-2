const scrollReveal = {
  // Initialize ScrollReveal
  sr: ScrollReveal({
    reset: true,
    distance: '600px',
    duration: 2500,
    delay: 100,
  }),

  oddCardsOnly: () => {
    return scrollReveal.sr.reveal('.row .sr-reveal:nth-child(odd)', {
      delay: 10,
      origin: 'left',
    })
  },

  evenCardsOnly: () => {
    return scrollReveal.sr.reveal('.row .sr-reveal:nth-child(even)', {
      delay: 500,
      scale: 0.5,
    })
  },

  firstCard: () => {
    return scrollReveal.sr.reveal('.mx-1 .card', {
      delay: 0,
      rotate: {
        x: 180,
        z: 180,
      },
      scale: 0.1,
      interval: 80,
    })
  },
}

let postsData = []

window.addEventListener('load', () => {
  fetchData()
})
// Fetch Data/Posts
const fetchData = async () => {
  try {
    const response = await fetch('./db/blogs.json')
    const data = await response.json()
    postsData.push(data)
    renderPostsPage(postsData[0])
  } catch (error) {
    console.log(error)
  }
}

// First Card
const firstCard = (data) => {
  const firstCardRow = document.createElement('div')
  firstCardRow.classList.add('row', 'mx-1')

  const card = document.createElement('div')
  card.classList.add('card')
  card.setAttribute('id', data.id)
  firstCardRow.appendChild(card)

  const rowOne = document.createElement('div')
  rowOne.classList.add('row', 'no-gutters')
  card.appendChild(rowOne)

  const colOne = document.createElement('div')
  colOne.classList.add('col-md-5', 'p-0')
  rowOne.appendChild(colOne)

  const img = document.createElement('img')
  img.classList.add('card-img', 'img-fluid', 'w-auto')
  img.src = data.image
  img.alt = 'post img'
  colOne.appendChild(img)

  const colTwo = document.createElement('div')
  colTwo.classList.add('col-md-7')
  rowOne.appendChild(colTwo)

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  colTwo.appendChild(cardBody)

  const title = document.createElement('h5')
  title.classList.add('card-title')
  title.textContent = data.title
  cardBody.appendChild(title)

  const content = document.createElement('p')
  content.classList.add('card-text')
  content.textContent = data.content.substring(0, 150) + '...'
  cardBody.appendChild(content)

  const tagsList = document.createElement('ul')
  tagsList.classList.add('list-inline')
  cardBody.appendChild(tagsList)

  data.tags.forEach((tag) => {
    const tagItem = document.createElement('li')
    tagItem.classList.add('list-inline-item')
    const tagLink = document.createElement('a')
    tagLink.href = '#'
    tagLink.classList.add('badge', 'bg-primary')
    tagLink.textContent = '#' + tag
    tagItem.appendChild(tagLink)
    tagsList.appendChild(tagItem)
  })

  const date = document.createElement('p')
  date.classList.add('card-text')
  date.innerHTML = `<small class="text-muted">Published on ${data.date}</small>`
  cardBody.appendChild(date)

  const loadMoreButton = document.createElement('button')
  loadMoreButton.classList.add('btn', 'btn-primary')
  loadMoreButton.textContent = 'Load More'
  cardBody.appendChild(loadMoreButton)

  const handleLoadMore = () => {
    window.scrollTo(0, 0)
    const main = document.querySelector('#main')
    main.innerHTML = ''

    const row = document.createElement('div')
    row.classList.add('row', 'm-0')
    main.appendChild(row)

    const loadMore = loadMoreCard(data)
    row.appendChild(loadMore)

    loadMoreButton.remove() // Remove the "Load More" button after loading additional content
  }
  loadMoreButton.addEventListener('click', handleLoadMore)

  return firstCardRow
}
// remaining cards
const otherCards = (data) => {
  if (!data) {
    return console.log('no data')
  }

  const col = document.createElement('div')
  col.classList.add(
    'col-sm-6',
    'col-md-4',
    'col-xl-3',
    'mb-3',
    'mb-sm-0',
    'sr-reveal'
  )

  const card = document.createElement('div')
  card.classList.add('card', 'cardHeight')
  card.setAttribute('id', data.id)
  col.appendChild(card)

  const img = document.createElement('img')
  img.classList.add('card-img', 'img-fluid', 'w-auto')
  img.src = data.image
  img.alt = 'post img'
  card.appendChild(img)

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  card.appendChild(cardBody)

  const title = document.createElement('h5')
  title.classList.add('card-title')
  title.textContent = data.title
  cardBody.appendChild(title)

  const content = document.createElement('p')
  content.classList.add('card-text')
  content.textContent = data.content.substring(0, 150) + '...'
  cardBody.appendChild(content)

  const tagsList = document.createElement('ul')
  tagsList.classList.add('list-inline')
  cardBody.appendChild(tagsList)

  data.tags.forEach((tag) => {
    const tagItem = document.createElement('li')
    tagItem.classList.add('list-inline-item')
    const tagLink = document.createElement('a')
    tagLink.href = '#'
    tagLink.classList.add('badge', 'bg-primary')
    tagLink.textContent = '#' + tag
    tagItem.appendChild(tagLink)
    tagsList.appendChild(tagItem)
  })

  const date = document.createElement('p')
  date.classList.add('card-text')
  date.innerHTML = `<small class="text-muted">Published on ${data.date}</small>`
  cardBody.appendChild(date)

  const loadMoreButton = document.createElement('button')
  loadMoreButton.classList.add('btn', 'btn-primary')
  loadMoreButton.textContent = 'Load More'
  cardBody.appendChild(loadMoreButton)

  const handleLoadMore = () => {
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    main.innerHTML = ''

    const row = document.createElement('div')
    row.classList.add('row', 'm-0')
    main.appendChild(row)

    const loadMore = loadMoreCard(data)
    row.appendChild(loadMore)

    loadMoreButton.remove()
  }
  loadMoreButton.addEventListener('click', handleLoadMore)

  return col
}
// LoadMore Card
const loadMoreCard = (data) => {
  const col = document.createElement('div')
  col.classList.add('mb-3', 'mb-sm-0', 'sr-reveal')

  const card = document.createElement('div')
  card.classList.add('card', 'overflow-hidden')
  card.setAttribute('id', data.id)
  col.appendChild(card)

  const imgContainer = document.createElement('div')
  imgContainer.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center'
  )
  card.appendChild(imgContainer)

  const img = document.createElement('img')
  img.classList.add('card-img', 'opacity-50', 'w-75', 'img-thumbnail')
  img.src = data.image
  img.alt = 'post img'
  imgContainer.appendChild(img)

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  card.appendChild(cardBody)

  const title = document.createElement('h5')
  title.classList.add('card-title')
  title.textContent = data.title
  cardBody.appendChild(title)

  const content = document.createElement('p')
  content.classList.add('card-text', 'lh-lg', 'fw-light')
  content.textContent = data.content
  cardBody.appendChild(content)

  const tagsList = document.createElement('ul')
  tagsList.classList.add('list-inline')
  cardBody.appendChild(tagsList)

  data.tags.forEach((tag) => {
    const tagItem = document.createElement('li')
    tagItem.classList.add('list-inline-item')
    const tagLink = document.createElement('a')
    tagLink.href = '#'
    tagLink.classList.add('badge', 'bg-primary')
    tagLink.textContent = '#' + tag
    tagItem.appendChild(tagLink)
    tagsList.appendChild(tagItem)
  })

  const date = document.createElement('p')
  date.classList.add('card-text')
  date.innerHTML = `<small class="text-muted">Published on ${data.date}</small>`
  cardBody.appendChild(date)

  const backBtn = document.createElement('button')
  backBtn.classList.add('btn', 'btn-primary')
  backBtn.textContent = 'Go Back'
  cardBody.appendChild(backBtn)
  const handleBackBtn = () => {
    window.scrollTo(0, 0)
    renderPostsPage(postsData[0])
  }
  backBtn.addEventListener('click', handleBackBtn)

  return col
}

// Filter Navigation Bar
const filterNav = () => {
  // Create container element
  const container = document.createElement('div')
  container.classList.add('container', 'text-center', 'mb-2')

  // Create navbar element
  const navbar = document.createElement('div')
  navbar.classList.add(
    'navbar',
    'navbar-expand-md',
    'rounded-top-5',
    'rounded-start-5',
    'border'
  )

  // Create container fluid element
  const containerFluid = document.createElement('div')
  containerFluid.classList.add('container-fluid')

  // Create navbar toggler button
  const navbarToggler = document.createElement('button')
  navbarToggler.classList.add('navbar-toggler', 'mx-auto')
  navbarToggler.setAttribute('type', 'button')
  navbarToggler.setAttribute('data-bs-toggle', 'collapse')
  navbarToggler.setAttribute('data-bs-target', '#navbarSuportedContent')
  navbarToggler.setAttribute('aria-controls', 'navbarSuportedContent')
  navbarToggler.setAttribute('aria-expanded', 'false')
  navbarToggler.setAttribute('aria-label', 'Toggle navigation')
  navbarToggler.innerHTML = '<span class="">Menu</span>'

  // Create navbar collapse div
  const navbarCollapse = document.createElement('div')
  navbarCollapse.classList.add(
    'collapse',
    'navbar-collapse',
    'justify-content-between'
  )
  navbarCollapse.setAttribute('id', 'navbarSuportedContent')

  // Create navbar nav ul
  const navbarNav = document.createElement('ul')
  navbarNav.classList.add('navbar-nav', 'col-md-8', 'justify-content-around')

  // Create By Time dropdown li
  const byTimeLi = document.createElement('li')
  byTimeLi.classList.add('nav-item', 'dropdown')

  // Create By Time dropdown link
  const byTimeLink = document.createElement('a')
  byTimeLink.classList.add('nav-link', 'dropdown-toggle')
  byTimeLink.setAttribute('href', '#')
  byTimeLink.setAttribute('role', 'button')
  byTimeLink.setAttribute('data-bs-toggle', 'dropdown')
  byTimeLink.setAttribute('aria-expanded', 'false')
  byTimeLink.textContent = 'By Time'

  // Create By Time dropdown menu ul
  const byTimeMenu = document.createElement('ul')
  byTimeMenu.classList.add('dropdown-menu', 'text-center')
  byTimeMenu.setAttribute('id', 'ByTime')

  // Create By Time - Old To New dropdown item li
  const byTimeOldToNewLi = document.createElement('li')
  const byTimeOldToNewLink = document.createElement('a')
  byTimeOldToNewLink.classList.add('dropdown-item')
  byTimeOldToNewLink.setAttribute('href', '#')
  byTimeOldToNewLink.setAttribute('onclick', 'sortByOld()')
  byTimeOldToNewLink.textContent = 'Old To New'
  byTimeOldToNewLi.appendChild(byTimeOldToNewLink)

  // Create By Time - New To Old dropdown item li
  const byTimeNewToOldLi = document.createElement('li')
  const byTimeNewToOldLink = document.createElement('a')
  byTimeNewToOldLink.classList.add('dropdown-item')
  byTimeNewToOldLink.setAttribute('href', '#')
  byTimeNewToOldLink.setAttribute('onclick', 'sortByNew()')
  byTimeNewToOldLink.textContent = 'New To Old'
  byTimeNewToOldLi.appendChild(byTimeNewToOldLink)

  // Append dropdown items to By Time dropdown menu
  byTimeMenu.appendChild(byTimeOldToNewLi)
  byTimeMenu.appendChild(byTimeNewToOldLi)

  // Append By Time dropdown link and menu to By Time dropdown li
  byTimeLi.appendChild(byTimeLink)
  byTimeLi.appendChild(byTimeMenu)

  // Create By Month dropdown li
  const byMonthLi = document.createElement('li')
  byMonthLi.classList.add('nav-item', 'dropdown')

  // Create By Month dropdown link
  const byMonthLink = document.createElement('a')
  byMonthLink.classList.add('nav-link', 'dropdown-toggle')
  byMonthLink.setAttribute('href', '#')
  byMonthLink.setAttribute('role', 'button')
  byMonthLink.setAttribute('data-bs-toggle', 'dropdown')
  byMonthLink.setAttribute('aria-expanded', 'false')
  byMonthLink.textContent = 'By Month'

  // Create By Month dropdown menu ul
  const byMonthMenu = document.createElement('ul')
  byMonthMenu.classList.add(
    'dropdown-menu',
    'text-center',
    'overflow-scroll-sm-md'
  )
  byMonthMenu.setAttribute('id', 'monthDropdown')

  // Create By Month dropdown menu items (li) and links (a)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  for (const month of monthNames) {
    const monthLi = document.createElement('li')
    const monthLink = document.createElement('a')
    monthLink.classList.add('dropdown-item')
    monthLink.setAttribute('href', '#')
    monthLink.textContent = month

    monthLi.appendChild(monthLink)
    byMonthMenu.appendChild(monthLi)
  }
  // Get the month dropdown list

  // Add event listener to each dropdown item
  byMonthMenu.querySelectorAll('.dropdown-item').forEach((item) => {
    item.addEventListener('click', () => {
      const month = item.innerText
      filterByMonth(month)
    })
  })

  // Append By Month dropdown link and menu to By Month dropdown li
  byMonthLi.appendChild(byMonthLink)
  byMonthLi.appendChild(byMonthMenu)

  // Append By Time and By Month dropdowns to navbar nav ul
  navbarNav.appendChild(byTimeLi)
  navbarNav.appendChild(byMonthLi)

  // Create search form
  const searchForm = document.createElement('form')
  searchForm.classList.add('d-flex', 'col-lg-4', 'searchForm')
  searchForm.setAttribute('role', 'search')
  searchForm.setAttribute('onsubmit', 'searchByTag(event)')

  // Create search input
  const searchInput = document.createElement('input')
  searchInput.classList.add(
    'form-control',
    'me-2',
    'rounded-bottom-5',
    'text-center'
  )
  searchInput.setAttribute('type', 'search')
  searchInput.setAttribute('placeholder', 'Search By Tag')
  searchInput.setAttribute('aria-label', 'Search')
  searchInput.setAttribute('id', 'tagSearch')

  // Create search button
  const searchButton = document.createElement('button')
  searchButton.classList.add('btn', 'btn-outline-success', 'rounded-top-5')
  searchButton.setAttribute('type', 'submit')
  searchButton.textContent = 'Search'

  // Add event listeners to the input field for the placeholder
  searchInput.addEventListener('focus', function () {
    this.placeholder = ''
  })

  searchInput.addEventListener('blur', function () {
    this.placeholder = 'Search By Tag'
  })

  // Append search input and button to search form
  searchForm.appendChild(searchInput)
  searchForm.appendChild(searchButton)

  // Append navbar nav ul and search form to navbar collapse div
  navbarCollapse.appendChild(navbarNav)
  navbarCollapse.appendChild(searchForm)

  // Append navbar toggler button and navbar collapse div to container fluid element
  containerFluid.appendChild(navbarToggler)
  containerFluid.appendChild(navbarCollapse)

  // Append container fluid element to navbar element
  navbar.appendChild(containerFluid)

  // Append navbar element to container element
  container.appendChild(navbar)

  // Return the container element
  return container
}

const renderPostsPage = (data) => {
  const main = document.getElementById('main')
  main.innerHTML = ''

  // Render the filter navigation
  const filterNavContainer = filterNav()
  main.appendChild(filterNavContainer)

  const post = document.createElement('div')
  post.classList.add('posts')
  main.appendChild(post)

  // Render the first Post in the specified card format
  const firstObject = data[0]
  const firstPost = firstCard(firstObject)
  post.appendChild(firstPost)

  // Render the rest of the objects in the alternate card format
  const remainingObjects = data.slice(1)
  const firstRowSecondCard = document.createElement('div')
  firstRowSecondCard.classList.add('row', 'm-0', 'g-2')

  remainingObjects.forEach((data) => {
    const card = otherCards(data)
    firstRowSecondCard.appendChild(card)
  })
  post.appendChild(firstRowSecondCard)

  const cards = Array.from(firstRowSecondCard.getElementsByClassName('card'))
  const maxHeight = Math.max(...cards.map((card) => card.offsetHeight))

  // Set the maximum height to all the cards
  cards.forEach((card) => {
    card.style.height = `${maxHeight}px`
  })
  scrollReveal.oddCardsOnly()
  scrollReveal.evenCardsOnly()
  scrollReveal.firstCard()
}

// Call the fetchData function

const sortByNew = async (data = null) => {
  try {
    if (!data) {
      const response = await fetch('./db/blogs.json')
      data = await response.json()
    }

    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))

    const post = document.querySelector('.posts')
    post.innerHTML = ''

    renderPostsPage(sortedData)
  } catch (error) {
    console.log(error)
  }
}

const sortByOld = async (data = null) => {
  try {
    if (!data) {
      const response = await fetch('./db/blogs.json')
      data = await response.json()
    }

    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))

    const post = document.querySelector('.posts')
    post.innerHTML = ''

    renderPostsPage(sortedData)
  } catch (error) {
    console.log(error)
  }
}

const searchByTag = async (event) => {
  event.preventDefault()

  try {
    const searchInput = document.querySelector('#tagSearch')
    const searchValue = searchInput.value.toLowerCase()

    const btn = document.querySelector('.searchForm button')

    if (searchValue.length === 0) {
      searchInput.classList.remove('border', 'border-success')
      btn.classList.remove('btn', 'btn-outline-success')

      searchInput.classList.add('border', 'border-danger')
      btn.classList.add('btn', 'btn-outline-danger')
      return
    } else {
      searchInput.classList.remove('border', 'border-danger')
      btn.classList.remove('btn', 'btn-outline-danger')

      btn.classList.add('btn', 'btn-outline-success')
    }

    const response = await fetch('./db/blogs.json')
    const data = await response.json()

    const filteredData = data.filter((post) => {
      return post.tags.some((tag) => tag.toLowerCase().includes(searchValue))
    })

    const post = document.querySelector('.posts')
    post.innerHTML = ''

    return renderPostsPage(filteredData)
  } catch (error) {
    console.log(error)
  }
}

const filterByMonth = async (month) => {
  try {
    const response = await fetch('./db/blogs.json')
    const data = await response.json()

    const filteredData = data.filter((post) => {
      const postMonth = new Date(post.date).toLocaleString('default', {
        month: 'long',
      })
      return postMonth === month
    })

    const post = document.querySelector('.posts')
    post.innerHTML = ''

    if (filteredData.length === 0) {
      const message = document.createElement('p')
      message.classList.add(
        'd-flex',
        'justify-content-center',
        'align-content-center'
      )
      message.textContent = `There are no post in the month ${month}`
      post.appendChild(message)
    } else {
      renderPostsPage(filteredData)
    }
  } catch (error) {
    console.log(error)
  }
}
