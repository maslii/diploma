window.onload = function() {
    'use strict'
    const fill = function() {
        const data = new FormData()

        const texts = Array.prototype.slice.call(
            document.querySelectorAll('input[type="text"]')
        )
        const checks = Array.prototype.slice.call(
            document.querySelectorAll('input[type="checkbox"]')
        )
        const selects = Array.prototype.slice.call(
            document.querySelectorAll('select')
        )
        const file = document.querySelector('input[type="file"]')

        texts.forEach(function(x) {
            data.append(x.id, x.value)
        })

        checks.forEach(function(x) {
            if (x.checked) {
                data.append(x.id, true)
            } else {
                data.append(x.id, false)
            }
        })

        selects.forEach(function(x) {
            data.append(x.id, x.value)
        })

        data.append('image', file.files[0])

        return data
    }

    const add = document.getElementById('add')

    add.addEventListener('click', function() {
        const xhr = new XMLHttpRequest()

        xhr.open('POST', '/admin/add', false)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.send(fill())

        if (xhr.status === 200) {
            window.location = '/admin'
        } else {
            alert(xhr.error)
        }
    })
}
