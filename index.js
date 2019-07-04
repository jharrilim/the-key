const { BallDontLie: { v1 } } = require('@jharrilim/balldontlie-client');

const fastify = require('fastify')({
    logger: true,
});

const ball = v1();

fastify.register(require('fastify-swagger'), {
    swagger: {
        info: {
            title: 'The Key',
            description: 'Basketball stats',
            version: '0.1.0'
        },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'code', description: 'Code related end-points' }
        ]
    },
    exposeRoute: true,
    routePrefix: '/swagger',

});


fastify.get('/', (request, reply) => {
    reply.status(200).send(request.query);
});

fastify.ready( err => {
    if (err) console.error(err);

    fastify.swagger();
});


fastify.listen(8080,(err, address) => {
    if (err) console.error(err);

})