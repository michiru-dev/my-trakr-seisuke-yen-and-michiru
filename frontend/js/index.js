import { showCategories, addNewCategory } from './helpers/Category.js'
import { addTestData } from './default.js'

$(() => {  

  addTestData()
  // showAccounts()
  // showTransactions()
  showCategories()
  $("#add-new-category-btn").on("click", () => {
    addNewCategory()
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


  