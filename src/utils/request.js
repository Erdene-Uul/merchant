/* eslint-disable import/no-anonymous-default-export */

import qs from "qs";

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

const errorHandler = async (error) => {
    // if (error.response && error.response.status === 401) {
    //   localStorage.removeItem("session");
    //   // message.error()
    //   return {
    //     type: "Error",
    //     payload: "Must enter as a user",
    //   };
    // }

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

const request = async (url, data, options, isUrlUse = false) => {
    const defaultOptions = {
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "client-token":
                "7980054aa8ed55facf4a4b683a9ecdede74272c23ed93433fd4555a549758e05c18e92bf8b613c01f4af00c2225af9410391aa3ac1f4e5adbdf21dcb523b6c14",
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
        throw await errorHandler(err);
    }
};

const httpMethod = (signal) => ({
    get: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "GET",
        });
    },
    post: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "POST",
        });
    },
    put: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "PUT",
        });
    },
    del: (url, data, options) => {
        if (signal) options.signal = signal;

        return request(url, data, {
            ...options,
            method: "DELETE",
        });
    },
});

export default {
    ...httpMethod(),
    signal: (signal) => httpMethod(signal),
};
