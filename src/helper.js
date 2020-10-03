// if user is adopting an animal
// autopopulate list every 5 seconds until they're 5 people in line

function incrementCount() {
    let counter = 0
    for (let i = 0; i <= 5000; i++) {
        counter++
    }
    incrementCount()
}

if (this.viewType === true) {
    function incrementCount() {
        let counter = 0
        let arr = ['Jim', 'Joe', 'Jan', 'Jack', 'Bob']
        for (let i = 0; i <= 5000; i++) {
            submitPerson(arr[i])
            counter++
        }
        if(counter === 6){
            return
        }
        incrementCount()
    }
}

module.exports = { incrementCount }