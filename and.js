const sleep = require('sleep')

var datas = [
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1],
]

var weights = [
    -0.3,
    0.5,
    -0.4
]

var threshold = 0

var targets = [
    0,
    0,
    0,
    1
]

var epoch = 1

var miu = 0.1

const and_training = () => {
    let summations = []
    let outputs = []

    console.log(`Epoch\t\t->\t${epoch}`)

    for (let i = 0; i < datas.length; i++) {
        if (i === datas.length - 1) epoch++

        let summation = 0
        let output = 0
        
        for (let j = 0; j < datas[i].length; j++) {
            summation += datas[i][j] * weights[j]
        }
    
        output = summation >= threshold ? 1:0

        console.log(`Summation [${i+1}]\t->\t${summation}`)
        console.log(`Output [${i+1}]\t->\t${output}`)

        summations.push(summation)
        outputs.push(output)

        for (let j = 0; j < outputs.length; j++) {
            if (outputs[j] !== targets[j]) {
                console.log(outputs, targets)

                let error = targets[j] - outputs[j]

                for (let k = 0; k < weights.length; k++) {
                    weights[k] = weights[k] + miu * datas[i][k] * error
                }

                sleep.sleep(1)

                return and_training()
            }
        }
    }

    console.log('\nOutputs\t\t->\t', outputs)
    console.log('Targets\t\t->\t', targets)
    console.log('=======================================\n')
}

and_training()