const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username) {

    try {
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorMessage('The Profile you Searched is not Found')

        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos')
        addReposToCard(data)
    } catch (error) {

    }
}

form.addEventListener('submit', evnt => {
    evnt.preventDefault()

    const user = search.value
    if (user) {
        getUser(user)
        search.value = ''
    }
})

function createUserCard(user) {
    const userCard = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>

            <div class="user-info">
                <h3 class="name">${user.name}</h3>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `
    main.innerHTML = userCard
}

function createErrorMessage(msg) {
    const userCard = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = userCard
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 8)
        .forEach(repo => {
            const repoLink = document.createElement('a')
            repoLink.classList.add('repo')
            repoLink.href = repo.html_url
            repoLink.target = '_blank'
            repoLink.innerText = repo.name
            reposEl.appendChild(repoLink)
        });
}
