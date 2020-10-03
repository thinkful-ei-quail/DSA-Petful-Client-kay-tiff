function incrementCount() {
    let counter = 0
    for (let i = 0; i <= 5000; i++) {
        counter++
    }
      incrementCount()
}

module.exports = {incrementCount}