export function callSuccess(message,title){
    const event = new CustomEvent('successAPICall', { detail: {message,title} });
    window.dispatchEvent(event);
}
export function callError(message,title){
    const event = new CustomEvent('errorAPICall', { detail: {message,title} });
    window.dispatchEvent(event);
}