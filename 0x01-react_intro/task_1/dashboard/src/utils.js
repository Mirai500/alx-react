export function getFullYear() {
    return new Date().getFullYear();
}
export function getFooterCopy(isindex) {
    if (isindex){
        return 'Holberton School';
    }
    return 'Holberton School main dashboard'
}