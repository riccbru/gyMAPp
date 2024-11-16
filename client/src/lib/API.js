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
    const res = await fetch(SERVER_URL + "/api/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Login failed with ${res.status} ${res.statusText}`);
    }
    return await res.json();
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
    return getJSON(fetch(SERVER_URL + "/api/signup", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(userData)
    })).then((res) => {
        console.log(res);
    }).catch((err) => { throw err; });
}

const bia = () => {
    return getJSON(
        fetch(SERVER_URL + "/api/bia", {
            credentials: 'include'
        })
    );
}

const meal = () => {
    const url = new URL(SERVER_URL + "/api/meals");
    url.searchParams.append('weekday', weekday);
    url.searchParams.append('meal', meal);

    return getJSON(
        fetch(url, {
            credentials: 'include'
        })
    );
}

const workout = (weekday) => {
    const url = new URL(SERVER_URL + `/api/workouts/${weekday}`);
    return getJSON(
        fetch(SERVER_URL, {
            credentials: 'include'
        })
    );
}

export default { info, login, logout, signup, bia, meal, workout };