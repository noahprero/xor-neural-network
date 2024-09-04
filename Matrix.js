class Matrix {
    constructor(rows, cols, fill=0) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        // Fill matrix with starting value
        for(let i = 0; i < rows; i++) {
            let row = [];
            for(let j = 0; j < cols; j++) {
                row.push(fill);
            }
            this.matrix.push(row);
        }
    }

    copy() {
        let m = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.matrix[i][j] = this.matrix[i][j];
            }
        }
        return m;
    }

    static subtract(a, b) {
        if(a.cols != b.cols || a.rows != b.rows) {
            console.error("Matrix dimensions must be the same.")
            return;
        }
        let result = new Matrix(a.rows, a.cols);
        for(let i = 0; i < result.rows; i++) {
            for(let j = 0; j < result.cols; j++) {
                result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
            }
        }

        return result;
    }

    static fromArray(arr){
        if(arr instanceof Matrix) {
            return arr;
        }

        let result = new Matrix(arr.length, 1);
        for(let i = 0; i < arr.length; i++) {
            result.matrix[i][0] = arr[i];
        }
        return result;
    }

    print() {
        console.table(this.matrix);
    }

    add(n) {
        if(n instanceof Matrix) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        }
        else{
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
        }

        return this;
    }

    randomize() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.random() * 2 - 1;
            } 
        }
    }

    static multiply(a, b) {
        if(a.cols != b.rows) {
            console.error("Cols of A must match rows of B");
            return undefined;
        }
        let output = new Matrix(a.rows, b.cols);
        for(let i = 0; i < output.rows; i++) {
            for(let j = 0; j < output.cols; j++) {
                let sum = 0;
                for(let k = 0; k < a.cols; k++) {
                    sum += a.matrix[i][k] * b.matrix[k][j];
                }
                
                output.matrix[i][j] = sum;
            }
        }

        return output;

    }

    multiply(n) {
        if(n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.error("Columns and rows of A must match with B");
                return;
            }

            // Hadamard product
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n.matrix[i][j];
                }
            }

            return this;
        }

        else {
            // Scalar multiplication
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n;
                }
            }

            return this;
        }
    }

    static transpose(a) {
        let result = new Matrix(a.cols, a.rows);
        for(let i = 0; i < result.rows; i++) {
            for(let j = 0; j < result.cols; j++) {
                result.matrix[i][j] = a.matrix[j][i];
            }
        }

        return result;
    }

    map(func) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let val = this.matrix[i][j];
                this.matrix[i][j] = func(val);
            }
        }
    }

    static map(m, func) {
        let result = m.copy();
        result.map(func);

        return result;
    } 

    toArray() {
        let result = [];
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                result.push(this.matrix[i][j]);
            }
        }

        return result;
    }
}