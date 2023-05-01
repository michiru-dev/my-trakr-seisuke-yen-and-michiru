import { updateBalance } from "./Account.js";

export function showTransactions() {
    // GET transations from API
    $.ajax({
      method: "get",
      url: "http://localhost:3000/transactions",
      contentType: "application/json",
      data: JSON.stringify,
     })
     .done((data) => {
      $.each(data,(index, transactionDetails) =>{
        $("#id").append(`<li>${transactionDetails.index}</li>`)
        $("#username").append(`<li>${transactionDetails.accountIdFrom}</li>`)
        $("#transaction").append(`<li>${transactionDetails.type}</li>`)
        $("#category").append(`<li>${transactionDetails.categoryId}</li>`)
        $("#description").append(`<li>${transactionDetails.description}</li>`)
        $("#amount").append(`<li>${transactionDetails.amount}</li>`)
        $("#from").append(`<li>${transactionDetails.accountIdFrom}</li>`)
        $("#to").append(`<li>${transactionDetails.accountIdTo}</li>`)
      })
    
      // transaction

    // Show them to the list

    // Call Michiru's function
    // Possibly no need to call this because balance can be calculated by account info

    // updateBalance()
}

export function addNewTransaction() {
    // updateBalance()
}

export function updateAccounts(accounts/*Array*/) {
    // update pull-down menu
    for(const account of accounts) {
        const accountOption = `
            <option>${account.username}</option>
        `
        $("#accounts-menu").append(accountOption)
        $("#from-accounts-menu").append(accountOption)
        $("#to-accounts-menu").append(accountOption)
    }

    // update accounts in filter
}

// function's name may need to be changed
export function handleNewTransaction() {
    // Get parameters from elements
    let transactionType = $("input[name=transaction-option]:checked").val()

    let accountName = ""
    $("#accounts-menu").children().each((index, account) => {
        if($(account).prop("selected")) {
            accountName = $(account).val()
        }
    })

    let fromAccountName = ""
    $("#from-accounts-menu").children().each((index, account) => {
        if($(account).prop("selected")) {
            fromAccountName = $(account).val()
        }
    })

    let toAccountName = ""
    $("#to-accounts-menu").children().each((index, account) => {
        if($(account).prop("selected")) {
            toAccountName = $(account).val()
        }
    })

    let categoryName = ""
    $("#categories-menu").children().each((index, category) => {
        if($(category).prop("selected")) {
            categoryName = $(category).val()
        }
    })

    let description = $("input[name=description-input]").val()
    let amount = $("input[name=amount-input]").val()

    console.log("TransactionType:", transactionType)
    console.log("Account:", accountName)
    console.log("From Account:", fromAccountName)
    console.log("To Account:", toAccountName)
    console.log("Category:", categoryName)
    console.log("Description", description)
    console.log("Amount", amount)

    clearNewTransactionInput()

    // Call Yen's function
    // addNewTransaction()
}

export function updateAccountSelection() {
    // Get the currently selected transaction type
    const selectedTransactionType = $("input[name=transaction-option]:checked").val()

    // From and To fields can only be used for Transfer
    if(selectedTransactionType === "Deposit" ||
       selectedTransactionType === "Withdraw") {

        // Show the input field for Deposit and Withdraw
        $("#deposit-withdraw-target").css({display: "flex"})

        // Hide the input field for Transfer
        $("#transfer-target").css({display: "none"})

        // Make the input field for Deposit and Withdraw required
        $("#accounts-menu").prop("required", true)

        // Make the input field for Transfer not required
        $("#from-accounts-menu").prop("required", false)
        $("#to-accounts-menu").prop("required", false)

    } else if (selectedTransactionType === "Transfer") {
        
        // Show the input field for Transfer
        $("#transfer-target").css({display: "flex"})

        // Hide the input field for Deposit and Withdraw 
        $("#deposit-withdraw-target").css({display: "none"})

        // Make the input field for Transfer required
        $("#from-accounts-menu").prop("required", true)
        $("#to-accounts-menu").prop("required", true)

        // Make the input field for Deposit and Withdraw not required
        $("#accounts-menu").prop("required", false)
    }
}

function clearNewTransactionInput() {
    // Make Deposit selected
    $("input[name=transaction-option]").prop("checked", false)
    $("input[name=transaction-option]").first().prop("checked", true)

    // Make the first line of pull-down menu selected
    $("#accounts-menu").children().prop("selected", false)
    $("#accounts-menu").children().first().prop("selected", true)

    $("#from-accounts-menu").children().prop("selected", false)
    $("#from-accounts-menu").children().first().prop("selected", true)

    $("#to-accounts-menu").children().prop("selected", false)
    $("#to-accounts-menu").children().first().prop("selected", true)

    $("#categories-menu").children().prop("selected", false)
    $("#categories-menu").children().first().prop("selected", true)

    // Empty input text
    $("input[name=description-input]").val("")
    $("input[name=amount-input]").val("")

    updateAccountSelection()
}

