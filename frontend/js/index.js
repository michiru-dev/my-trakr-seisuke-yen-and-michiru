import { showCategories, addNewCategory } from './helpers/Category.js'
import { handleNewTransaction, updateAccounts } from './helpers/Transaction.js'
import { addTestData } from './default.js'

$(() => {  

  addTestData()
  // showAccounts()
  // showTransactions()
  showCategories()
  $("#add-new-category-btn").on("click", () => {
    addNewCategory()
  })
  $("#add-new-transaction-btn").on("click", () => {
    handleNewTransaction()
  })
  
  $.ajax({
    url: "http://localhost:3000/accounts",
    type: 'get',
    dataType:'json',
  }).done((accounts) => {
    updateAccounts(accounts)
  })

  // $("addNewAccount").on("click", () => {
  //   addNewAccount(data)
  // })

  // $("addTransaction").on("click", () => {
  //   addNewTransaction(data)
  // })
  
  // $("addCategory").on("click", () => {
  //   addNewCategory(data)
  // })
});


  