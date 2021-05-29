export function moneyString(money: number): String {
    return `${money} ${money == 1 ? "RawrBuck" : "RawrBucks"}`;
}