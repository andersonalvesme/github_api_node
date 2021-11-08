const axios = require('axios');
require('dotenv').config();

const githubHost = process.env.GITHUB_API;

exports.getUsers = function (res, perPage, since) {
    let url = `${githubHost}/users?per_page=${perPage}&since=${since}`;

    axios
        .get(url)
        .then(response => {
            const result = response.data.map(ret => {
                return {
                    login: ret.login,
                    id: ret.id,
                    avatar_url: ret.avatar_url,
                    url: ret.url,
                    created_at: ret.created_at
                }
            });

            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.getUserByUsername = function (res, username) {
    let url = `${githubHost}/users/${username}`;

    axios
        .get(url)
        .then(response => {
            const result = {
                login: response.data.login,
                id: response.data.id,
                avatar_url: response.data.avatar_url,
                url: response.data.url,
                created_at: response.data.created_at
            };

            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.getReposByUsername = function (res, username, perPage, page) {
    let url = `${githubHost}/users/${username}/repos?per_page=${perPage}&page=${page}`;

    axios
        .get(url)
        .then(response => {
            const result = response.data.map(ret => {
                return {
                    id: ret.id,
                    name: ret.name,
                    full_name: ret.full_name,
                    url: ret.url,
                    owner: {
                        login: ret.owner.login,
                        id: ret.owner.id,
                        avatar_url: ret.owner.avatar_url,
                        url: ret.owner.url,
                        created_at: ret.owner.created_at
                    }
                }
            });

            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};