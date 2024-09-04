function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoid_d(x) {
    return x * (1 - x);
}

function tanh(x) {
    return Math.tanh(x);
}

function tanh_d(x) {
    let t = tanh(x);
    return 1 - (t * t);
}

function relu(x) {
    return Math.max(0, x);
}

function relu_d(x) {
    return x > 0 ? 1 : 0;
}

class NeuralNetwork {
    constructor(input_size, hidden_size, output_size, learning_rate=0.1) {
        this.input_size = input_size;
        this.hidden_size = hidden_size;
        this.output_size = output_size;

        // Initialize weights and randomize
        this.weights_ih = new Matrix(this.hidden_size, this.input_size);  // Weights between input and hidden layers
        this.weights_ho = new Matrix(this.output_size, this.hidden_size);  // Weights between hidden and output layers
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        // Initialize biases
        this.bias_h = new Matrix(this.hidden_size, 1);
        this.bias_o = new Matrix(this.output_size, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learning_rate = learning_rate;
        this.activation_function = sigmoid;
        this.activation_function_d = sigmoid_d;
    }

    predict(input_array) {
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(this.activation_function);
    
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(this.activation_function);
    
        return output.toArray();
    }
    

    train(input_array, target_array) {
        // Convert arrays to matrices
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(this.activation_function);
        
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(this.activation_function);
        let targets = Matrix.fromArray(target_array)
    
        // Calculate errors of output layer
        let output_errors = Matrix.subtract(targets, outputs);
    
        // Calculate output gradient
        let gradients = Matrix.map(outputs, this.activation_function_d);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);
    
        // Calculate hidden deltas
        let hidden_T = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
    
        // Adjust weights and bias
        this.weights_ho.add(weight_ho_deltas);
        this.bias_o.add(gradients);
    
        // Calculate errors of hidden layer
        let weights_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_ho_T, output_errors);
    
        // Calculate hidden gradient
        let hidden_gradient = Matrix.map(hidden, this.activation_function_d);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);
    
        // Calculate input deltas
        let inputs_T = Matrix.transpose(inputs);
        let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
    
        // Adjust weights and bias
        this.weights_ih.add(weight_ih_deltas);
        this.bias_h.add(hidden_gradient);
    }
}