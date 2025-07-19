'use strict';

const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

function getJSON(httpResponsePromise) {
    return new Promise((resolve, reject) => {
        httpResponsePromise
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(json => resolve(json))
                        .catch(err => reject({ error: `API.getJSON: Cannot parse server response ok-catch:\n${err}` }))
                } else {
                    response.json()
                        .then(obj => reject(obj))
                        .catch(err => reject({ error: `API.getJSON: Cannot parse server response !ok-catch:\n${err}` }))
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
    return getJSON(
        fetch(SERVER_URL + "/signup", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
    ).then(() => {})
    .catch((err) => { throw err; });
}

const fetchBIAs = () => {
    const url = new URL(SERVER_URL + "/bia");
    return getJSON(
        fetch(url, {
            credentials: 'include'
        })
    );
}

const pushBIA = async (biaData) => {
    return getJSON(
        fetch(SERVER_URL + "/bia", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(biaData),
            headers: {'Content-Type': 'application/json'}
        })
    ).then(() => {})
    .catch((err) => { throw err; });
}

const deleteBIA = async (bid) => {
    const url = new URL(SERVER_URL + `/bia/${bid}`);
    return getJSON(
        fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        })
    );
}

const fetchMeal = async (weekday, mealtype) => {
    const url = new URL(SERVER_URL + `/meals?weekday=${weekday}&meal=${mealtype}`);

    const res = await fetch(url, {
        credentials: 'include'
    });

    return await res.json();
}

const fetchWorkout = async (weekday) => {
    const url = new URL(SERVER_URL + `/workouts?weekday=${weekday}`);
    const res = await fetch(url, {
            credentials: 'include'
    });
    return await res.json();
}

const fetchWeights = () => {
    const url = new URL(SERVER_URL + "/weights");
    return getJSON(
        fetch(url, {
            credentials: 'include'
        })
    );
}

const pushWeight = async (weight) => {
    return getJSON(
        fetch(SERVER_URL + `/weights?weight=${weight}`, {
            method: 'POST',
            credentials: 'include'
        })
    ).then(() => {})
    .catch((err) => { throw err; });
}

export default {
  info,
  login,
  logout,
  signup,
  fetchBIAs,
  pushBIA,
  deleteBIA,
  fetchMeal,
  fetchWorkout,
  fetchWeights,
  pushWeight,
};