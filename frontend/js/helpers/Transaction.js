import { addNewAccount, updateBalance } from "./Account.js";

let oldTransactions = [];
let userData = [];
let catagoryData = [];

// trying to convert accountIdFrom into name
// let accountIdFrom = [];
// trying to convert accountIdTo into name
// let accountIdTo = [];

// holding valuable and it doesn't missing....

export function showTransactions() {
    return new Promise((resolve, reject) => {
        // GET transactions from API
        $.ajax({
            method: "get",
            url: "http://localhost:3000/transactions",
            contentType: "application/json",
            data: JSON.stringify,
        }).done((data) => {

            // Empty the transaction table except for the header
            $("#transactionTable").html("")

            $.each(data, (index, transactionDetails) => {

                // Loop through the transactions array
                $.each(transactionDetails, (i, transaction) => {
    
                    // Convert account ID into user name
                    let accountName = "-";
                    let accountFromName = "-";
                    let accountToName = "-"
                    for (const account of userData) {
                        if (account.id === transaction.accountId) {
                            accountName = account.username;
                        }
                        if (account.id === transaction.accountIdFrom) {
                            accountFromName = account.username;
                        }
                        if (account.id === transaction.accountIdTo) {
                            accountToName = account.username;
                        }
                    }

                    // Convert category ID into category name
                    let categoryName = "";
                    for (const category of catagoryData) {
                        if (category.id === transaction.categoryId) {
                            categoryName = category.name;
                        }
                    }

                    const row = $(`<tr class="balloon-animation-parent">`);
                    row.append(`<td>${transaction.id}</td>`);
                    row.append(`<td>${accountName}</td>`);
                    row.append(`<td>${transaction.type}</td>`);
                    row.append(`<td>${categoryName}</td>`);
                    row.append(`<td>${transaction.description}</td>`);
                    row.append(`<td>${transaction.amount}</td>`);
                    row.append(`<td>${accountFromName}</td>`);
                    row.append(`<td>${accountToName}</td>`);

                    $("#transactionTable").append(row)
                });
            });
            resolve()
        });
    });
}

// Show them to the list

// Call Michiru's function
// Possibly no need to call this because balance can be calculated by account info

// updateBalance()

// if the transaction is transfer, accountIdFrom / To will be used

export function addNewTransaction(newTransactionObject) {
    if (newTransactionObject.newTransaction.type !== "Transfer") {
        newTransactionObject.newTransaction.accountIdFrom = null;
        newTransactionObject.newTransaction.accountIdTo = null;
    }


    $.ajax({
        method: "post",
        url: "http://localhost:3000/transactions",
        contentType: "application/json",
        data: JSON.stringify(newTransactionObject),
    }).done((data) => {

        $("#username").val("");
        $("#transaction").val("");
        $("#category").val("");
        $("#description").val("");
        $("#amount").val("");
        $("#from").val("");
        $("#to").val("");
        showTransactions().then(notifyNewTransactionAdded);
        updateBalance();
    });

    // $.ajax({
    //     method: "post",
    //     url: "http://localhost:3000/transactions",
    //     contentType: "application/json",
    //     data: JSON.stringify(newTransactionObject),
    // }).done((data) => {
    //     console.log("clearData", data);
    // });
}

// updateBalance()

export function updateAccounts(accounts /*Array*/) {
    let newAccountOptions = `<option value="">Select Account</option>`;

    // update pull-down menu
    for (const account of accounts) {
        const accountOption = `
            <option id=${account.id}>${account.username}</option>
        `;
        newAccountOptions += accountOption;
    }

    // Deploy HTML to each of the account selection menu
    $("#accounts-menu").html(newAccountOptions);
    $("#from-accounts-menu").html(newAccountOptions);
    $("#to-accounts-menu").html(newAccountOptions);

    // update accounts in filter

    userData = accounts; // convert id to username
}

// function's name may need to be changed
export function handleNewTransaction() {
    // Get parameters from elements
    let transactionType = $("input[name=transaction-option]:checked").val();

    let accountId = null;
    $("#accounts-menu")
        .children()
        .each((index, account) => {
            if ($(account).prop("selected")) {
                accountId = $(account).prop("id");
            }
        });

    let fromAccountId = null;
    $("#from-accounts-menu")
        .children()
        .each((index, account) => {
            if ($(account).prop("selected")) {
                fromAccountId = $(account).prop("id");
            }
        });

    let toAccountId = null;
    $("#to-accounts-menu")
        .children()
        .each((index, account) => {
            if ($(account).prop("selected")) {
                toAccountId = $(account).prop("id");
            }
        });

    let categoryId = null;
    $("#categories-menu")
        .children()
        .each((index, category) => {
            if ($(category).prop("selected")) {
                categoryId = $(category).prop("id");
            }
        });

    let description = $("input[name=description-input]").val();
    let amount = $("input[name=amount-input]").val();

    console.log("TransactionType:", transactionType);
    console.log("Account:", accountId);
    console.log("From Account:", fromAccountId);
    console.log("To Account:", toAccountId);
    console.log("Category:", categoryId);
    console.log("Description", description);
    console.log("Amount", amount);

    clearNewTransactionInput();

    // amount = Number(amount)
    // categoryId: Number(categoryId)

    // Call Yen's function
    addNewTransaction({
        newTransaction: {
            // don't need to clairfy the name cause it's inside the function //
            // put in different order//
            accountId: Number(accountId),
            accountIdFrom: Number(fromAccountId),
            accountIdTo: Number(toAccountId),
            type: transactionType,
            amount: Number(amount), // convert to num
            categoryId: Number(categoryId), // convert to num
            description: description,
        },
    });
    // receive the data and post to API //
}

export function updateAccountSelection() {
    // Get the currently selected transaction type
    const selectedTransactionType = $(
        "input[name=transaction-option]:checked"
    ).val();

    // From and To fields can only be used for Transfer
    if (
        selectedTransactionType === "Deposit" ||
        selectedTransactionType === "Withdraw"
    ) {
        // Show the input field for Deposit and Withdraw
        $("#deposit-withdraw-target").css({ display: "flex" });

        // Hide the input field for Transfer
        $("#transfer-target").css({ display: "none" });

        // Make the input field for Deposit and Withdraw required
        $("#accounts-menu").prop("required", true);

        // Make the input field for Transfer not required
        $("#from-accounts-menu").prop("required", false);
        $("#to-accounts-menu").prop("required", false);
    } else if (selectedTransactionType === "Transfer") {
        // Show the input field for Transfer
        $("#transfer-target").css({ display: "flex" });

        // Hide the input field for Deposit and Withdraw
        $("#deposit-withdraw-target").css({ display: "none" });

        // Make the input field for Transfer required
        $("#from-accounts-menu").prop("required", true);
        $("#to-accounts-menu").prop("required", true);

        // Make the input field for Deposit and Withdraw not required
        $("#accounts-menu").prop("required", false);
    }

    $("#transaction-options")
        .children("input")
        .each((index, inputElement) => {
            let imagePath = "";
            if ($(inputElement).prop("checked")) {
                imagePath = `img/${$(inputElement).next().prop("for")}-on.png`;
            } else {
                imagePath = `img/${$(inputElement).next().prop("for")}-off.png`;
            }
            $(inputElement).prev().prop("src", imagePath);
        });
}

function clearNewTransactionInput() {
    // Make Deposit selected
    $("input[name=transaction-option]").prop("checked", false);
    $("input[name=transaction-option]").first().prop("checked", true);

    // Make the first line of pull-down menu selected
    $("#accounts-menu").children().prop("selected", false);
    $("#accounts-menu").children().first().prop("selected", true);

    $("#from-accounts-menu").children().prop("selected", false);
    $("#from-accounts-menu").children().first().prop("selected", true);

    $("#to-accounts-menu").children().prop("selected", false);
    $("#to-accounts-menu").children().first().prop("selected", true);

    $("#categories-menu").children().prop("selected", false);
    $("#categories-menu").children().first().prop("selected", true);

    // Empty input text
    $("input[name=description-input]").val("");
    $("input[name=amount-input]").val("");

    updateAccountSelection();
}

export function updateCategories(categories) {
    // Store data here
    catagoryData = categories;
}


function notifyNewTransactionAdded() {
    // Get the final row
    // because the animation should be displayed only for the new account that has just been added
    let transactionAddedLast = null
    let transactionAddedSecondLast = null
    let transactionType = ""

    const numTransactions = $("#transactionTable").children().length

    $("#transactionTable").children().each((index, transactionRow) => {
        const transactionId = Number($(transactionRow).children().first().text())

        // Find the last row
        if(transactionId === numTransactions) {
            transactionAddedLast = $(transactionRow)
            transactionType = $(transactionRow).children().eq(2/*transaction type*/).text()
        }
        // Find the row second from the last
        else if(transactionId === numTransactions - 1) {
            transactionAddedSecondLast = $(transactionRow)
        }
    })
  
    addBaloon(transactionAddedLast)

    if(transactionType === "Transfer") {
        addBaloon(transactionAddedSecondLast)
    }
}


function addBaloon(rowElement) {
    // Create an element for the animation
    const message = "A new transaction has been added."
    const animationElement = $(`
        <div class="balloon-left-animation">
            <div class="balloon-left">
                <p>${message}</p>
            </div>
        </div>
    `)
    
    // Add the animation element
    rowElement.append(animationElement)

    // Remove the animation so that this animation can work next time
    setTimeout(() => {
        animationElement.remove()
    }, 4000)
}