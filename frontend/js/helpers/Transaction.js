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
    // Clear previous transactions
    $("#idTransaction").empty();
    $("#username").empty();
    $("#transaction").empty();
    $("#category").empty();
    $("#description").empty();
    $("#amount").empty();
    $("#from").empty();
    $("#to").empty();

    // GET transactions from API
    $.ajax({
        method: "get",
        url: "http://localhost:3000/transactions",
        contentType: "application/json",
        data: JSON.stringify,
    }).done((data) => {
        console.log("data", data);
        let newTransactions = [];
        $.each(data, (index, transactionDetails) => {
            console.log("transaction details", transactionDetails);
            // Loop through the transactions array
            $.each(transactionDetails, (i, transaction) => {
                console.log("accountId", transaction.accountId);
                console.log("transaction", transaction);
                // how can I convert

                let accountName = "";
                for (const account of userData) {
                    if (account.id === transaction.accountId) {
                        accountName = account.username;
                    }
                }
                let categoryName = "";
                for (const category of catagoryData) {
                    if (category.id === transaction.categoryId) {
                        categoryName = category.name;
                    }
                }

                // trying to convert accountIdFrom into name

                // let accountFromName = "";
                // for (const account of accountIdFrom) {
                //     if ( account.accountIdFrom === transaction.accountIdFrom) {
                //         accountFromName = accountFromName;
                //     }
                // }

                // trying to convert accountIdTo into name

                // let accountToName = "";
                // for (const account of accountIdTo) {
                //     if (account..accountIdTo === transaction.accountIdTo) {
                //         accountIdTo = accountToName;
                //     }
                // }

                $("#idTransaction").append(`<p>${transaction.id}<p>`);
                $("#username").append(`<p>${accountName}<p>`);
                $("#transaction").append(`<p>${transaction.type}</p>`);
                $("#category").append(`<p>${categoryName}</p>`);
                $("#description").append(`<p>${transaction.description}</p>`);
                $("#amount").append(`<p>${transaction.amount}</p>`);
                $("#from").append(`<p>${transaction.accountIdFrom}</p>`);
                $("#to").append(`<p>${transaction.accountIdTo}</p>`);
                newTransactions.push(transaction);
            });
        });

        // Display only new transactions
        newTransactions.forEach((transaction) => {
            data = data.filter((t) => t.id !== transaction.id);
        });

        // Add headers
        $("#idTransaction").prepend("<h3>Id</h3>");
        $("#username").prepend("<h3>Username</h3>");
        $("#transaction").prepend("<h3>Transaction Type</h3>");
        $("#category").prepend("<h3>Category</h3>");
        $("#description").prepend("<h3>Description</h3>");
        $("#amount").prepend("<h3>Amount</h3>");
        $("#from").prepend("<h3>From Account</h3>");
        $("#to").prepend("<h3>To Account</h3>");

        console.log("oldTransactions", data); // previous transactions
        console.log("newTransactions", newTransactions); // new transactions
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
    console.log("newTransaction", newTransactionObject);

    $.ajax({
        method: "post",
        url: "http://localhost:3000/transactions",
        contentType: "application/json",
        data: JSON.stringify(newTransactionObject),
    }).done((data) => {
        console.log("data", data);
        $("#username").val("");
        $("#transaction").val("");
        $("#category").val("");
        $("#description").val("");
        $("#amount").val("");
        $("#from").val("");
        $("#to").val("");
        showTransactions();
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
