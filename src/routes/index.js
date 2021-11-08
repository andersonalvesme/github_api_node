const express = require('express');
const router = express.Router();

const githubController = require('../controllers/githubController');
const CONST_FIVE = 5;
const CONST_ZERO = 0;

/**
 * Rest request example
 * - local: http://localhost:8080/api
 * - server: https://shawandpartnersnode.herokuapp.com/api
 **/
router.get('/api', (req, res, next) => {
    res.status(200).send({
        title: 'API',
        version: process.env.API_VERSION
    })
});

/**
 * Rest request example
 * - local: http://localhost:8080/api/users?per_page=3&since=1500
 * - server: https://shawandpartnersnode.herokuapp.com/api/users?per_page=3&since=1500
 **/
router.get('/api/users', (req, res, next) => {
    const perPage = req.query.per_page || CONST_FIVE;
    const since = req.query.since || CONST_ZERO;

    githubController.getUsers(res, perPage, since);
});

/**
 * Rest request example
 * - local: http://localhost:8080/api/users/andersonalvesme/details
 * - server: https://shawandpartnersnode.herokuapp.com/api/users/andersonalvesme/details
 **/
router.get('/api/users/:username/details', (req, res, next) => {
    const username = req.params.username;

    githubController.getUserByUsername(res, username);
});

/**
 * Rest request example
 * - local: http://localhost:8080/api/users/brunobertolini/repos?per_page=3&page=2
 * - server: https://shawandpartnersnode.herokuapp.com/api/users/brunobertolini/repos?per_page=3&page=2
 **/
router.get('/api/users/:username/repos', (req, res, next) => {
    const username = req.params.username;
    const perPage = req.query.per_page || CONST_FIVE;
    const page = req.query.page || CONST_ZERO;

    githubController.getReposByUsername(res, username, perPage, page);
});

module.exports = router;