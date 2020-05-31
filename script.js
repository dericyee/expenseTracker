const text = document.getElementById("text");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const form = document.getElementById("form");
const list = document.getElementById("list");

//step 1: create dummytransactions
let dummyTransactions = [];

//step 2: add transactions to the dom
function addTransactionDom(transaction) {
  // 1. get the sign of the amount. (+/-)
  const sign = transaction.amount < 0 ? "-" : "+";
  // 2. using js, create a new element. Hint: .createElement("li")
  const item = document.createElement("li");
  // 3. using js, add a class of "minus" or "plus" .classList.add
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  // 4. add in the list into transaction history - .innerHTML
  item.innerHTML = `
	${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" 
  onclick="removeTransaction(${transaction.id})">x</button>
	`;
  list.appendChild(item);
}

// update balance, income & expenses
function updateValues() {
  const amounts = dummyTransactions.map((x) => {
    return x.amount;
  });
  console.log(amounts);

  //get total of the amounts
  const total = amounts.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
  console.log(total);

  const income = amounts
    .filter((x) => x >= 0)
    .reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
  console.log(income);

  const expense = amounts
    .filter((x) => x < 0)
    .reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
  console.log(expense);

  //insert in the dom
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

// adding transactions here into transaction history
function addTransaction(e) {
  e.preventDefault();
  if (text.value == "" || amount.value == "") {
    alert("input some text and amount please");
  } else {
    const newTransaction = {
      id: generateID(),
      text: text.value,
      amount: Number(amount.value),
    };
    console.log(newTransaction);
    dummyTransactions.push(newTransaction);
    console.log(dummyTransactions);
    addTransactionDom(newTransaction);
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

//generate ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

//remove transaction
function removeTransaction(id) {
  dummyTransactions = dummyTransactions.filter((x) => x.id !== id);
  init();
}

//initiate the app
function init() {
  list.innerHTML = "";
  dummyTransactions.forEach(addTransactionDom);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
