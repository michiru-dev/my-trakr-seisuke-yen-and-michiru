import { showCategories } from './helpers/Category.js'
import { addTestData } from './default.js'

$(() => {  

  addTestData()
  // showAccounts()
  // showTransactions()
  showCategories()

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


  