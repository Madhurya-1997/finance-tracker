export function convertToPaise(amount: number) {
    return Math.round(amount * 100);
}
export function convertToRupee(amount: number) {
    return amount / 100;
}