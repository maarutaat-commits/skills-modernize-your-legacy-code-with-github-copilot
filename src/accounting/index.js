const readline = require('readline');

class AccountManager {
    constructor(initialBalance = 1000.00) {
        this.balance = initialBalance;
    }

    viewBalance() {
        return `Current balance: ${this.balance.toFixed(2)}`;
    }

    credit(amount) {
        this.balance += amount;
        return `Amount credited. New balance: ${this.balance.toFixed(2)}`;
    }

    debit(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return `Amount debited. New balance: ${this.balance.toFixed(2)}`;
        } else {
            return 'Insufficient funds for this debit.';
        }
    }
}

module.exports = { AccountManager };

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const account = new AccountManager();

    let continueFlag = true;

    while (continueFlag) {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
        const choice = await new Promise((resolve) => {
            rl.question('Enter your choice (1-4): ', resolve);
        });

        switch (choice) {
            case '1':
                console.log(account.viewBalance());
                break;
            case '2':
                const creditAmount = await new Promise((resolve) => {
                    rl.question('Enter credit amount: ', resolve);
                });
                console.log(account.credit(parseFloat(creditAmount)));
                break;
            case '3':
                const debitAmount = await new Promise((resolve) => {
                    rl.question('Enter debit amount: ', resolve);
                });
                console.log(account.debit(parseFloat(debitAmount)));
                break;
            case '4':
                continueFlag = false;
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }

    console.log('Exiting the program. Goodbye!');
    rl.close();
}

if (require.main === module) {
    main();
}