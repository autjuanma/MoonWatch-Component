describe('api testing with supertest in nightwatch POST', function () {

    let server;

    before(async function (client) {
        server = await client.mockserver.create();
        server.setup((app) => {
            app.post('/api/v1/datasets/', function (req, res) {
                if (!req.body.name) {
                    return res.status(400).json({ error: 'Name is required' });
                }
                if (typeof req.body.name !== 'string') {
                    return res.status(400).json({ error: 'Name must be a string' });
                }
                // Simulate duplicate entry check
                if (req.body.name === 'duplicate') {
                    return res.status(409).json({ error: 'Dataset already exists' });
                }
                res.status(200).json({ id: 'test-dataset-id' });
            });
        });

        await server.start(3000);
    });

    after(() => {
        server.close();
    });

    it('demo test', async function (client) {
        const req = await server.request()
            .post('/api/v1/datasets/')
            .send({ name: 'medea' })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/);

        await client.assert.deepStrictEqual(server.route.post('/api/v1/datasets/').requestBody, { name: 'medea' });
    });

    // Test for missing required field
    it('should return 400 for missing name', async function (client) {
        await server.request()
            .post('/api/v1/datasets/')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(res => {
                client.assert.deepStrictEqual(res.body, { error: 'Name is required' });
            });
    });

    // Test for invalid data type
    it('should return 400 for invalid name type', async function (client) {
        await server.request()
            .post('/api/v1/datasets/')
            .send({ name: 123 })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(res => {
                client.assert.deepStrictEqual(res.body, { error: 'Name must be a string' });
            });
    });

    // Test for duplicate entry
    it('should return 409 for duplicate dataset', async function (client) {
        await server.request()
            .post('/api/v1/datasets/')
            .send({ name: 'duplicate' })
            .set('Accept', 'application/json')
            .expect(409)
            .expect('Content-Type', /json/)
            .expect(res => {
                client.assert.deepStrictEqual(res.body, { error: 'Dataset already exists' });
            });
    });

    // Test for server error simulation (if applicable)
    it('should handle server error', async function (client) {
        // You can simulate a server error by modifying your mock server setup
        server.setup((app) => {
            app.post('/api/v1/datasets/', function (req, res) {
                res.status(500).json({ error: 'Internal Server Error' });
            });
        });

        await server.request()
            .post('/api/v1/datasets/')
            .send({ name: 'medea' })
            .set('Accept', 'application/json')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(res => {
                client.assert.deepStrictEqual(res.body, { error: 'Internal Server Error' });
            });
    });

});