import { showCategories, addNewCategory } from './helpers/Category.js'
import { handleNewTransaction, updateAccounts, updateAccountSelection } from './helpers/Transaction.js'
import { showAccounts } from "./helpers/Account.js";
import { showTransactions } from "./helpers/Transaction.js";
import { addNewAccount } from "./helpers/Account.js";

$(() => {  
  showAccounts();
  showTransactions()
  showCategories()
  updateAccountSelection()

  $("#add-new-category-btn").on("click", () => {
    addNewCategory()
  })
  $("#new-transaction").on("submit", (event) => {
    event.preventDefault()
    handleNewTransaction()
  })
  $("#transaction-options").on("change", () => {
    updateAccountSelection()
  })
  
  // This is a temporary code
  // Should be deleted after Michiru's calling from Account.js is added
  $.ajax({
    url: "http://localhost:3000/accounts",
    type: 'get',
    dataType:'json',
  }).done((accounts) => {
    updateAccounts(accounts)
  })

  $("addNewAccount").on("click", () => {
    addNewAccount(data)
  })

  $("addTransaction").on("click", () => {
    addNewTransaction(data)
  })
  
  $("addCategory").on("click", () => {
    addNewCategory(data)
  })
});


  