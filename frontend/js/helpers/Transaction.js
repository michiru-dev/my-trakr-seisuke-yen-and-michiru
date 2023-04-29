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

    // Call Yen's function
    // addNewTransaction()
}

export function updateAccountSelection() {
    const selectedTransactionType = $("input[name=transaction-option]:checked").val()
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