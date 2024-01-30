// Function to get the value of a cookie by its key
export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

// Function to format a number as currency
export function currencyFormat(amount: number) {
    return '$' + (amount/100).toFixed(2);
}