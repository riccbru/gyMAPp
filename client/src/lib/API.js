'use strict';

const SERVER_URL = 'http://localhost:3001';

function getJSON(httpResponsePromise) {
    return new Promise((resolve, reject) => {
        httpResponsePromise
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(json => resolve(json))
                        .catch(err => reject({ error: `Cannot parse server response ok-catch:\n${err}` }))
                } else {
                    response.json()
                        .then(obj => reject(obj))
                        .catch(err => reject({ error: `Cannot parse server response !ok-catch:\n${err}` }))
                }
            })
            .catch(err =>
                reject({ error: `Cannot communicate (${err})` })
            )
    });
}

async function info() {
    return getJSON(
        fetch(SERVER_URL + "/api/session", {
            credentials: 'include'
        })
    );
}

async function login(credentials) {
    return getJSON(
        fetch(SERVER_URL + "/api/sessions", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
    );
}

const logout = async () => {
    return getJSON(
        fetch(SERVER_URL + "/api/session", {
            method: 'DELETE',
            credentials: 'include'
        })
    );
}

async function signup(userData) {
    return getJSON(
        fetch(SERVER_URL + "/api/singup", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
    );
}

export default { info, login, logout, signup };