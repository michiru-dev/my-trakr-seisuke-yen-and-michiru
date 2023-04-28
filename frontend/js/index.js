$(() => {

  showAccounts()
  showTransactions()
  showCategories()

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
