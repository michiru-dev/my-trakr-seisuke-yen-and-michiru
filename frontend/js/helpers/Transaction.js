export function showTransactions() {
    // GET transations from API

    // Show them to the list

    // Call Michiru's function
    updateBalance(data)
}

export function addNewTransaction() {
    updateBalance(data)
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

    let description = $("#description-input").val()
    let amount = $("#amount-input").val()

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
    if(selectedTransactionType === "Transfer") {
        $("#accounts-menu").prop("disabled", true)
        $("#from-accounts-menu").prop("disabled", false)
        $("#to-accounts-menu").prop("disabled", false)
    } else {
        $("#accounts-menu").prop("disabled", false)
        $("#from-accounts-menu").prop("disabled", true)
        $("#to-accounts-menu").prop("disabled", true)
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
    $("#description-input").val("")
    $("#amount-input").val("")

    // Make From and To fields disabled 
    $("#accounts-menu").prop("disabled", true)
    $("#from-accounts-menu").prop("disabled", false)
    $("#to-accounts-menu").prop("disabled", false)
}