export const genCookies = () => {

    return (
        document.cookie.split(';').map((c) => {
            return c.trim().split('=').map(decodeURIComponent);
        }).reduce((a, b) => {
            try {
                a[b[0]] = JSON.parse(b[1]);
            } catch (e) {
                a[b[0]] = b[1];
            }
            return a;
        }, {})
    )
}