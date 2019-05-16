const fs = require('fs')
const { Random } = require('random-js')
const random = new Random()
const sleep = require('sleep')

let data = fs.readFileSync(`${__dirname}/fruits.csv`).toString()
let data_array = data.split('\n').map((d, i) => d = d.split(','))
let data_array_headless = Array.from(data_array).slice(1, data_array.length)
let data_array_number = Array(data_array_headless.length)

let miu = 0.1

let create_w = () => {
    let result = random.integer(-1, 1) * random.realZeroToOneInclusive()

    return result === 0
        ? create_w()
        : result
}

// AND perceptron
let and_treshold = 0
let and_data_array_polute = data_array_number
let and_w = Array.from(Array(3), () => create_w())
let and_epoch = 1
let and_sequence = [[0, 0], [0, 1], [1, 0], [1, 1]]
let target = [0, 0, 0, 1]

// print w
console.log('| Generate W: |')
console.log(`${and_w}\n`)

let and_data = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 0]
]

let new_w = Array(and_w.length)

let and_training = () => {
    console.log(`Epoch -> ${and_epoch}`)

    and_epoch++

    let outputs = Array(and_data.length)
    
    and_data.map((d, i) => {
        let output = 0
        let summation = 0

        d.map((e, j) => {
            summation += e * and_w[j]
        })

        output = summation >= and_treshold ? 1:0

        let err = target[i] - output

        console.log(`Summation -> ${summation} | Output -> ${output}`)

        if (err !== 0) {
            console.log(`Not fit. change w!`)

            and_w.map((e, j) => {
                new_w[j] = e + miu * d[j] * err
            })

            sleep.sleep(2)

            return and_training()
        }

        outputs[i] = output
    })
    console.log(outputs, target)
}

and_training()