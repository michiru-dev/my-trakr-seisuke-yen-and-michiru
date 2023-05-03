import { addNewAccount, updateBalance } from "./Account.js";

export function showTransactions() {
    // GET transactions from API
    $.ajax({
        method: "get",
        url: "http://localhost:3000/transactions",
        contentType: "application/json",
        data: JSON.stringify,
    }).done((data) => {
        console.log("data", data);
        $.each(data, (index, transactionDetails) => {
            console.log("transaction details", transactionDetails);
            // Loop through the transactions array
            $.each(transactionDetails, (i, transaction) => {
                console.log("accountId", transaction.accountId);
                console.log("transaction", transaction);
                $("#username").append(`<li>${transaction.accountIdFrom}</li>`);
                $("#transaction").append(`<li>${transaction.type}</li>`);
                $("#category").append(`<li>${transaction.categoryId}</li>`);
                $("#description").append(`<li>${transaction.description}</li>`);
                $("#amount").append(`<li>${transaction.amount}</li>`);
                $("#from").append(`<li>${transaction.accountIdFrom}</li>`);
                $("#to").append(`<li>${transaction.accountIdTo}</li>`);
            });
        });
    });
}

// Show them to the list

// Call Michiru's function
// Possibly no need to call this because balance can be calculated by account info

// updateBalance()

export function addNewTransaction() {
    $.ajax({
        method: "post",
        url: "http://localhost:3000/transactions",
        contentType: "application/json",
        data: JSON.stringify,
    }).done((data) => {
        console.log("data", data);
    });
    showTransactions();
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

    // Call Yen's function
    addNewTransaction({
        newTransaction: {
            // don't need to clairfy the name cause it's inside the function //
            // put in different order//
            // type: transactionType.val(),
            accountId: accountId,
            accountIdFrom: fromAccountId,
            accountIdTo: toAccountId,
            categoryId: categoryName,
            description: description,
            amount: amount,
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
