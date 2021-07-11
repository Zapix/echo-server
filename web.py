import sys
import logging

from aiohttp import web
import aiohttp_cors

from mtpylon.configuration import configure_app

from schema import schema as app_schema
from rsa_keys import get_rsa_keys

# create console handler and set level to debug
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(level=logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

logging.basicConfig(level=logging.DEBUG)


if __name__ == '__main__':
    app = web.Application()
    configure_app(
        app,
        app_schema,
        {
            'rsa_manager': {
                'params': {
                    'rsa_keys': get_rsa_keys()
                }
            },
            'pub_keys_path': '/pub-keys',
            'schema_path': '/schema',
        }
    )

    cors = aiohttp_cors.setup(
        app,
        defaults={
            '*': aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
        }
    )

    for route in list(app.router.routes()):
        cors.add(route)

    web.run_app(app, port=8081)
