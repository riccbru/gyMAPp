'use strict';

const SERVER_URL = 'http://localhost:3001/api/v1';

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

const info = async () => {
    return getJSON(
        fetch(SERVER_URL + "/session", {
            credentials: 'include'
        })
    );
}

const login = async (credentials) => {
    const res = await fetch(SERVER_URL + "/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Login failed with ${res.status} ${res.statusText}`);
    }
    return await res.json();
}

const logout = async () => {
    return getJSON(
        fetch(SERVER_URL + "/session", {
            method: 'DELETE',
            credentials: 'include'
        })
    );
}

const signup = async (userData) => {
    return getJSON(fetch(SERVER_URL + "/signup", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // credentials: 'include',
        body: JSON.stringify(userData)
    })).then((res) => {
        // empty
    }).catch((err) => { throw err; });
}

const bia = () => {
    const url = new URL(SERVER_URL + "/bia");
    return getJSON(
        fetch(url, {
            credentials: 'include'
        })
    );
}

const meal = async (weekday, mealtype) => {
    const url = new URL(SERVER_URL + `/meals?weekday=${weekday}&meal=${mealtype}`);

    const res = await fetch(url, {
        credentials: 'include'
    });

    return await res.json();
}

const workout = async (weekday) => {
    const url = new URL(SERVER_URL + `/workouts/${weekday}`);
    const res = await fetch(url, {
            credentials: 'include'
    });
    return await res.json();
}

export default { info, login, logout, signup, bia, meal, workout };