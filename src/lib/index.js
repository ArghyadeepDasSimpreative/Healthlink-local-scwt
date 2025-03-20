export function getToken() {
    let token = localStorage.getItem("token");
    console.log("from inside eeeeee ", token)
    return token;
}