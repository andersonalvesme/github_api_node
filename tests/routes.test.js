const routes = require('../src/routes');

const request = require('supertest');
const express = require('express');
const app = express();

app.use("/", routes);

const mockUser = {
    "login": "brunobertolini",
    "id": 711315,
    "avatar_url": "https://avatars.githubusercontent.com/u/711315?v=4",
    "url": "https://api.github.com/users/brunobertolini",
    "created_at": "2011-04-05T18:15:40Z"
}
const mockRepo = {
    "id": 32100480,
    "name": "angular-markdown-embed",
    "full_name": "brunobertolini/angular-markdown-embed",
    "url": "https://api.github.com/repos/brunobertolini/angular-markdown-embed",
    "owner": mockUser
}

describe('testSuitGitHub', () => {
    test('testGetUsers', done => {
        let path = "/api/users?per_page=1&since=711314";

        request(app)
            .get(path)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                let user = res.body[0];
                expect(user.login).toBe(mockUser.login);
                expect(user.id).toBe(mockUser.id);

                return done();
            });
    });

    test('testGetUserByUsername', done => {
        let path = "/api/users/brunobertolini/details";

        request(app)
            .get(path)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                let user = res.body;
                expect(user.login).toBe(mockUser.login);
                expect(user.id).toBe(mockUser.id);

                return done();
            });
    });

    test('testGetReposByUsername', done => {
        let path = "/api/users/brunobertolini/repos?per_page=1&page=1";

        request(app)
            .get(path)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                let repo = res.body[0];
                let user = repo.owner;

                expect(repo.id).toBe(mockRepo.id);
                expect(repo.name).toBe(mockRepo.name);

                expect(user.login).toBe(mockUser.login);
                expect(user.id).toBe(mockUser.id);

                return done();
            });
    });
});