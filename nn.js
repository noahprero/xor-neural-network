const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
const iteration_counter = document.getElementById('iteration-counter');
const weights_ih_tracker = document.getElementById('weights-ih');
const weights_ho_tracker = document.getElementById('weights-ho');

const nn = new NeuralNetwork(2, 4, 1, 0.001);  // Slow learning rate for better visualization

// Set the data to train off of
let training_data = [
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    }
];


// Visualize on canvas
let resolution = 10;
let rows = canvas.height / resolution;
let cols = canvas.width / resolution;

let iterations = 0;
function animate() {
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            // Train the network
            for(let i = 0; i < 10; i++) {
                let random_input = Math.floor(Math.random() * training_data.length);
                nn.train(training_data[random_input].inputs, training_data[random_input].outputs);
            }

            let x1 = i / cols;
            let x2 = j / rows;
            let inputs = [x1, x2];
            let y = nn.predict(inputs);

            let predicted_color = 255 * y;
            ctx.fillStyle = 'rgb('+predicted_color+','+predicted_color+','+predicted_color+')';
            ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
        }
    }

    // Update DOM texts
    iterations++;
    iteration_counter.innerHTML = "ITERATIONS: " + iterations;

    // Convert input / hidden weights to text
    let weights_ih = nn.weights_ih.toArray();
    let ih_text = "";
    for(let weight of weights_ih) {
        ih_text += weight.toFixed(2) + "&nbsp;&nbsp;&nbsp;";
    }
    weights_ih_tracker.innerHTML = "Input / hidden weights: <br> " + ih_text;

    // Covert hidden / output weights to text
    let weight_oh = nn.weights_ho.toArray();
    let ho_text = "";
    for(let weight of weight_oh) {
        ho_text += weight.toFixed(2) + "&nbsp;&nbsp;&nbsp;";
    }
    weights_ho_tracker.innerHTML = "Hidden / output weights: <br> " + ho_text;

    requestAnimationFrame(animate);
}

animate();