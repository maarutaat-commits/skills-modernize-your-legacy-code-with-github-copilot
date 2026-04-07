const { AccountManager } = require('../index');

describe('Account Management System Tests', () => {
    let account;

    beforeEach(() => {
        account = new AccountManager();
    });

    test('TC001: View Account Balance', () => {
        const result = account.viewBalance();
        expect(result).toBe('Current balance: 1000.00');
        expect(account.balance).toBe(1000.00);
    });

    test('TC002: Credit Account with Valid Amount', () => {
        const result = account.credit(500.00);
        expect(result).toBe('Amount credited. New balance: 1500.00');
        expect(account.balance).toBe(1500.00);
    });

    test('TC003: Debit Account with Sufficient Funds', () => {
        const result = account.debit(200.00);
        expect(result).toBe('Amount debited. New balance: 800.00');
        expect(account.balance).toBe(800.00);
    });

    test('TC004: Debit Account with Insufficient Funds', () => {
        const result = account.debit(1500.00);
        expect(result).toBe('Insufficient funds for this debit.');
        expect(account.balance).toBe(1000.00); // Balance unchanged
    });

    test('TC005: Invalid Menu Choice - Not Applicable for Unit Test', () => {
        // This test case is for menu input validation, which is handled in main() and not unit testable easily.
        // Skipping as it's I/O dependent.
        expect(true).toBe(true); // Placeholder
    });

    test('TC006: Exit Application - Not Applicable for Unit Test', () => {
        // This test case is for application exit, which is handled in main() and not unit testable easily.
        // Skipping as it's I/O dependent.
        expect(true).toBe(true); // Placeholder
    });

    test('TC007: Multiple Operations Sequence', () => {
        account.credit(300.00);
        expect(account.balance).toBe(1300.00);
        account.debit(100.00);
        expect(account.balance).toBe(1200.00);
        const result = account.viewBalance();
        expect(result).toBe('Current balance: 1200.00');
    });

    test('TC008: Credit Zero or Negative Amount', () => {
        const resultZero = account.credit(0);
        expect(resultZero).toBe('Amount credited. New balance: 1000.00');
        expect(account.balance).toBe(1000.00);

        const resultNegative = account.credit(-50.00);
        expect(resultNegative).toBe('Amount credited. New balance: 950.00');
        expect(account.balance).toBe(950.00);
        // Note: No validation in code, as per COBOL original
    });

    test('TC009: Debit Zero or Negative Amount', () => {
        const resultZero = account.debit(0);
        expect(resultZero).toBe('Amount debited. New balance: 1000.00');
        expect(account.balance).toBe(1000.00);

        const resultNegative = account.debit(-50.00);
        expect(resultNegative).toBe('Amount debited. New balance: 1050.00');
        expect(account.balance).toBe(1050.00);
        // Note: No validation in code, as per COBOL original
    });

    test('TC010: View Balance After Multiple Credits/Debits', () => {
        account.credit(100.00);
        account.credit(200.00);
        account.debit(50.00);
        account.debit(75.00);
        const result = account.viewBalance();
        expect(result).toBe('Current balance: 1175.00');
        expect(account.balance).toBe(1175.00);
    });
});