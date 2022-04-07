/* eslint-disable import/no-anonymous-default-export */

import qs from "qs";
import router from "next/router"
// const storeConfig = require("../store").default;

const statusHandler = async (response) => {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.status = response.status;
    error.response = response;

    throw error;
};

const nonJsonErrorHandler = {
    type: "Error",
    payload: "Error to connect server",
};

const errorHandler = async (error, isServer) => {
    if (error.response && error.response.status === 401) {
        if (!isServer) {
            location.href = "/auth/login"
        }

        // message.error()
        // return {
        //     type: "Error",
        //     payload: "Must enter as a user",
        // };
    }

    if (error.response) {
        try {
            const json = await error.response.json();

            return json.error ? json.error : json;
        } catch (jsonParseError) {
            return jsonParseError;
        }
    } else {
        return nonJsonErrorHandler;
    }
};

// const api_host = process.env.NODE_ENV === "production" ? process.env.API_HOST || "" : "";

const request = async (url, data, options, isServer) => {
    const defaultOptions = {
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
        ...options,
    };

    let queryString = "";

    if (options.method === "GET") {
        delete defaultOptions.body;

        queryString = `?${qs.stringify(data)}`;
    }

    try {
        const res = await fetch(`${url}${queryString}`, defaultOptions);
        await statusHandler(res);

        const json = await res.json();
        return json;
    } catch (err) {
        // if (isUrlUse) {

        // } else {
        //   return await request(`${process.env.api_host}${url}`, data || {}, options || {}, true)
        // }
        console.log("error ", err)
        throw await errorHandler(err, isServer);
    }
};

const httpMethod = (signal, isServer) => ({
    get: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "GET",
        }, isServer);
    },
    post: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "POST",
        }, isServer);
    },
    put: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "PUT",
        }, isServer);
    },
    del: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "DELETE",
        }, isServer);
    },
});

export default {
    ...httpMethod(undefined, false),
    signal: (signal) => httpMethod(signal),

};


export const apiRequest = {
    ...httpMethod(null, true),
    signal: (signal) => httpMethod(signal),
}