const getResponse = async (url, count = false) => {
    let response = await fetch(url)
    let content = await response.json()
    return count ? content.splice(0, count) : content
}

const getResponseFetch = (url, count) => {
    return fetch(url).then(response => response.json()).then(data => {
        return data.splice(0, count)
    })
}

const addPost = async (url) => {

    const form = document.getElementById('addPost')

    if(!form) return false

    form.onsubmit = async (event) => {

        event.preventDefault()

        let response = await fetch(url, {
            method: 'POST',
            body: new FormData(form)
        })

        let data = await response.json();

        if(data.status === true) {
            await render()
        }

    }

}

const getPosts = async () => {

    // const posts = await getResponse('https://jsonplaceholder.typicode.com/posts', 100)

    const posts = await getResponse('http://api.jsonplaceholder/posts', 100)

    // const postsFetch = await getResponseFetch('https://jsonplaceholder.typicode.com/posts', 100)

    const postsList = document.querySelector('.posts')

    if(!posts && !postsList) return false

    // Очистка постов
    postsList.innerHTML = ''

    posts.forEach(post => {
        postsList.innerHTML += `
            <div class="post w-1/5">
                <h2 class="text-xl">${post.title}</h2>
                <p class="text-base">${post.body}</p>
                <a href="#" class="text-base text-indigo-600">Подробнее</a>
                <a href="#" class="text-base text-indigo-600 editButton" data-id="${post.id}">Редактировать</a>
                <a href="#" class="text-base text-red-500 removeButton" data-id="${post.id}">Удалить</a>
            </div>
        `
    })
}

const deletePost = async () => {

    const buttons = document.querySelectorAll('.removeButton')

    buttons.forEach( (button) => {

        button.addEventListener('click', async (event) => {

            event.preventDefault()

            let postId = button.dataset.id

            const response = await fetch(`http://api.jsonplaceholder/posts/${postId}`, {
                method: "DELETE"
            })

            const data = await response.json()

            if(data.status === true) {

                await render()

            }

        })

    })

}

const updatePost = async () => {

    const buttons = document.querySelectorAll('.editButton')

    buttons.forEach( (button) => {

        button.addEventListener('click', async (event) => {

            event.preventDefault()

            let postId = button.dataset.id

            // Получаем один пост
            const post = await getResponse(`http://api.jsonplaceholder/posts/${postId}`)

            const form = document.getElementById('editPost')

            const title = form.querySelector('input[name="title"]')
            const body = form.querySelector('textarea[name="body"]')

            title.value = post.title
            body.value = post.body

            form.addEventListener('submit', async (event) => {

                event.preventDefault()

                // Отправка обновленных значений
                const data = {
                    title: title.value,
                    body: body.value
                }

                const response = await fetch(`http://api.jsonplaceholder/posts/${postId}`, {
                    method: "PATCH",
                    body: JSON.stringify(data)
                })

                const resData = await response.json()

                if(resData.status === true) {
                    await render()
                    title.value = ''
                    body.value = ''
                }

            })

        })

    })

}

const render = async () => {
    await getPosts()
    await deletePost()
    await updatePost()
    await addPost('http://api.jsonplaceholder/posts')
}

const init = async () => {
    await render()
}

document.addEventListener('DOMContentLoaded', init)