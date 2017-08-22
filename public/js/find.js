window.onload = function() {
    'use strict'
    const fill = function() {
        const data = {}

        const texts = Array.prototype.slice.call(
            document.querySelectorAll('input[type="text"')
        )
        const checks = Array.prototype.slice.call(
            document.querySelectorAll('input[type="checkbox"]')
        )
        const selects = Array.prototype.slice.call(
            document.querySelectorAll('select')
        )

        texts.forEach(function(x) {
            data[x.id] = x.value
        })

        checks.forEach(function(x) {
            if (x.checked) {
                data[x.id] = true
            } else {
                data[x.id] = false
            }
        })

        selects.forEach(function(x) {
            data[x.id] = x.value
        })

        if (window.location.pathname.trim() === '/fast') {
            data['fast'] = true
        }

        return JSON.stringify(data)
    }

    const find = document.getElementById('find')

    find.addEventListener('click', function() {
        const xhr = new XMLHttpRequest()

        xhr.open('POST', '/answer', false)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(fill())

        if (xhr.status === 200) {
            document.body.removeChild(document.querySelector('.about'))
            document.body.removeChild(document.querySelector('.wrapper'))
            const div = document.createElement('div')
            document.body.appendChild(div)
            div.innerHTML = xhr.responseText
        } else {
            alert(xhr.error)
        }
    })
}
