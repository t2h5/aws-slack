import logging
import os
import sys

sys.path.append('./lib')
import redis

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.DEBUG)

REDIS = redis.StrictRedis(
    host=os.environ.get('REDIS_HOST'),
    port=6379,
    db=0
)

def handler(event, context):
    LOGGER.info('event: %s', event)
    LOGGER.info('context: %s', context)
    message = event['Records'][0]['Sns']['Message']
    if message == 'info':
        LOGGER.info(REDIS.info())
    elif message == 'flushdb':
        LOGGER.info(REDIS.flushdb())
    else:
        LOGGER.debug('invalid message: %s', message)
