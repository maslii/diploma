module.exports = db => {
    const parsed = db

    parsed.map(x => {
        let o = x
        for (let i in o) {
            if (o.hasOwnProperty(i)) {
                if (o[i] === 'true') {
                    o[i] = true
                } else if (o[i] === 'false') {
                    o[i] = false
                } else if (!isNaN(o[i])) {
                    o[i] = parseFloat(o[i])
                }
            }
        }

        return o
    })

    return parsed
}
