import json
import pika

class RabbitmqProducer:
    def __init__(self, host="localhost", port=5672, username="user", password="password", exchange="message-receiver", routing_key=""):
        self.__host = host
        self.__port = port
        self.__username = username
        self.__password = password
        self.__exchange = exchange
        self.__routing_key = routing_key
        self.__channel = self.create_channel()

    def create_channel(self):
        connection_parameters = pika.ConnectionParameters(
            host=self.__host,
            port=self.__port,
            credentials=pika.PlainCredentials(self.__username, self.__password)
        )
        connection = pika.BlockingConnection(connection_parameters)
        channel = connection.channel()
        channel.exchange_declare(exchange=self.__exchange, exchange_type='direct', durable=True)
        return channel

    def publish(self, message):
        self.__channel.basic_publish(
            exchange=self.__exchange,
            routing_key=self.__routing_key,
            body=json.dumps(message),
            properties=pika.BasicProperties(delivery_mode=2)
        )
        print(f" [x] Sent {message}")


class RabbitmqConsumer:
    def __init__(self, callback, host="localhost", port=5672, username="user", password="password", queue="data"):
        self.__host = host
        self.__port = port
        self.__username = username
        self.__password = password
        self.__queue = queue
        self.__callback = callback
        self.__channel = self.create_channel()

    def create_channel(self):
        connection_parameters = pika.ConnectionParameters(
            host=self.__host,
            port=self.__port,
            credentials=pika.PlainCredentials(self.__username, self.__password)
        )
        connection = pika.BlockingConnection(connection_parameters)
        channel = connection.channel()
        channel.queue_declare(queue=self.__queue, durable=True)
        return channel

    def consuming(self):
        self.__channel.basic_consume(
            queue=self.__queue,
            auto_ack=True,
            on_message_callback=self.__callback
        )
        print(' [*] Waiting for messages. To exit press CTRL+C')
        self.__channel.start_consuming()
