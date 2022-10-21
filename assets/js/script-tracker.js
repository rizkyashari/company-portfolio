let transactions = [];

const form = document.getElementById('form');
const history = document.getElementById('history');
const details = document.getElementById('details');
const amount = document.getElementById('amount');

const balance = document.getElementById('balance');
const incomes = document.getElementById('incomes');
const expenses = document.getElementById('expenses');


function generateID() {
    return +new Date();
}

function addTransactionDOM(transaction) {

    const mark = transaction.amount < 0 ? '-' : '+';
    const container = document.createElement('div');
    container.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    container.innerHTML = `
        ${transaction.details} <span>${mark}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `;
    history.appendChild(container);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const saldo = amounts.reduce((acc, item) => (acc += item), 0).toFixed();
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed();
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed();
    balance.innerText = `Rp ${saldo}`;
    incomes.innerText = `+ Rp ${income}`;
    expenses.innerText = `- Rp ${expense}`;
}

function addTransaction(e) {
    e.preventDefault();
    const transaction = {
        id: generateID(),
        details: details.value,
        amount: +amount.value
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues()
    details.value = ''
    amount.value = ''
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    initDOM();
}

function initDOM() {
    history.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues()
}

initDOM();
form.addEventListener('submit', addTransaction);


