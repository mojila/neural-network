const fs = require('fs')
const { Random } = require('random-js')
const random = new Random()

let data = fs.readFileSync(`${__dirname}/fruits.csv`).toString()
let data_array = data.split('\n').map((d, i) => d = d.split(','))
let data_array_headless = Array.from(data_array).slice(1, data_array.length)
let data_array_number = Array(data_array_headless.length)

// transform to number
data_array_headless.map((d, i) => {
    let new_numbers = Array(Array.from(d).length)

    Array.from(d).map((e, j) => {
        switch(e) {
            case 'apel':
                new_numbers[j] = 0
                break
            case 'pisang':
                new_numbers[j] = 1
                break
            case 'pendek':
                new_numbers[j] = 0
                break
            case 'sedang':
                new_numbers[j] = 1
                break
            case 'panjang':
                new_numbers[j] = 2
                break
            default:
                Error(`expected error for new bin.`)
                break
        }
    })

    data_array_number[i] = new_numbers
})

let create_w = () => {
    let result = random.integer(-1, 1) * random.realZeroToOneInclusive()

    return result === 0 
        ? create_w()
        : result
}

// AND perceptron
let treshold = 0
let data_array_polute = data_array_number
let w = Array.from(Array(data_array_polute.length), (x, i) => create_w())

console.log(w)

let training_and = (treshold_temporary, data_temporary, w_temporary) => {
    Array.from(data_temporary).map((d, i) => {
        let total = 0

        Array.from(d).map((e, j) => {
            Array.from(w_temporary).map((f, k) => {
                total += e * f
            })
        })

        total = total >= treshold_temporary ? 1 : 0
        
        // rekursif dengan w baru ketika total >= 1
        if (total >= 1) {

        }
    })
}

// training_and(treshold, data_array_polute, w)

