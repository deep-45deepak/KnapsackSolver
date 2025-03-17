function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function fractionalKnapsack(n, capacity, profits, weights) {
    let ratio = [];
    for (let i = 0; i < n; i++) {
        ratio[i] = profits[i] / weights[i];
    }

    // Sort items based on profit/weight ratio in descending order
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (ratio[i] < ratio[j]) {
                swap(ratio, i, j);
                swap(profits, i, j);
                swap(weights, i, j);
            }
        }
    }

    let maxProfit = 0;
    for (let i = 0; i < n; i++) {
        if (capacity > 0 && weights[i] <= capacity) {
            capacity -= weights[i];
            maxProfit += profits[i];
        } else {
            maxProfit += profits[i] * (capacity / weights[i]);
            break;
        }
    }

    return maxProfit.toFixed(2);
}

function dynamicKnapsack(n, capacity, profits, weights) {
    let dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(profits[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Display the dp matrix
    displayMatrix(dp);

    return dp[n][capacity];
}

function generateInputs() {
    const numObjects = document.getElementById('numObjects').value;
    const profitsWeightsDiv = document.getElementById('profitsWeights');
    profitsWeightsDiv.innerHTML = '';

    for (let i = 0; i < numObjects; i++) {
        profitsWeightsDiv.innerHTML += `<label for="profit${i}">Profit of object ${i + 1} 💰:</label><input type="number" id="profit${i}" name="profit${i}" step="0.01" required><br>`;
        profitsWeightsDiv.innerHTML += `<label for="weight${i}">Weight of object ${i + 1} ⚖️:</label><input type="number" id="weight${i}" name="weight${i}" step="0.01" required><br>`;
    }
}

function calculateFractionalKnapsack() {
    const n = parseInt(document.getElementById('numObjects').value);
    const capacity = parseFloat(document.getElementById('capacity').value);
    let profits = [], weights = [];

    for (let i = 0; i < n; i++) {
        profits.push(parseFloat(document.getElementById(`profit${i}`).value));
        weights.push(parseFloat(document.getElementById(`weight${i}`).value));
    }

    const result = fractionalKnapsack(n, capacity, profits, weights);
    document.getElementById('result').innerText = `Maximum profit (Fractional) is: ${result} 💸`;
}

function calculateDynamicKnapsack() {
    const n = parseInt(document.getElementById('numObjects').value);
    const capacity = parseFloat(document.getElementById('capacity').value);
    let profits = [], weights = [];

    for (let i = 0; i < n; i++) {
        profits.push(parseFloat(document.getElementById(`profit${i}`).value));
        weights.push(parseFloat(document.getElementById(`weight${i}`).value));
    }

    const result = dynamicKnapsack(n, capacity, profits, weights);
    document.getElementById('result').innerText = `Maximum profit (Dynamic) is: ${result} 💸`;
}

function displayMatrix(matrix) {
    let matrixDiv = document.getElementById('matrix');
    let table = '<table><tr><th></th>';

    for (let j = 0; j < matrix[0].length; j++) {
        table += `<th>${j}</th>`;
    }
    table += '</tr>';

    for (let i = 0; i < matrix.length; i++) {
        table += `<tr><th>${i}</th>`;
        for (let j = 0; j < matrix[i].length; j++) {
            table += `<td>${matrix[i][j]}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    matrixDiv.innerHTML = table;
}