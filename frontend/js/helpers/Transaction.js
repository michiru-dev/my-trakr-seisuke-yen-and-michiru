import { addNewAccount, updateBalance } from "./Account.js";

export function showTransactions() {
    // GET transations from API

    // Show them to the list

    // Call Michiru's function
    // Possibly no need to call this because balance can be calculated by account info

    // updateBalance()
}

export function addNewTransaction() {
    // updateBalance()
}

export function updateAccounts(accounts/*Array*/) {

    // Create HTML of new account options
    let newAccountOptions = `<option>Select Account</option>`
    for(const account of accounts) {
        const newAccountOption = `
            <option>${account.username}</option>
        `
        newAccountOptions += newAccountOption
    }

    // Deploy HTML to each of the account selection menu
    $("#accounts-menu").html(newAccountOptions)
    $("#from-accounts-menu").html(newAccountOptions)
    $("#to-accounts-menu").html(newAccountOptions)

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

