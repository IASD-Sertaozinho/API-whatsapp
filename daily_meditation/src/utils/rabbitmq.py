import pika

# TODO: Refactor this class - the producer and consumer should be separated
class Rabbitmq:
    def __init__(self, callback):
        self.__host = "localhost"
        self.__port = 5672
        self.__username = "user"
        self.__password = "password"
        self.__consumer_queue = "data"
        self.__producer_queue = "data"
        self.__callback = callback
        self.__channel = self.create_channel()

    def create_channel(self):
        connection_parameters = pika.ConnectionParameters(
            host=self.__host,
            port=self.__port,
            credentials=pika.PlainCredentials(self.__username, self.__password)
        )
        channel = pika.BlockingConnection(connection_parameters).channel()
        return channel

    def consuming(self):
        self.__channel.queue_declare(
            queue=self.__consumer_queue,
            durable=True
        )
        self.__channel.basic_consume(
            queue=self.__consumer_queue,
            auto_ack=True,
            on_message_callback=self.__callback
        )
        print(' [*] Waiting for messages. To exit press CTRL+C')
        self.__channel.start_consuming()

    def publish(self, message):
        self.__channel.basic_publish(
            exchange="",
            routing_key=self.__producer_queue,
            body=message,
            properties=pika.BasicProperties(delivery_mode=2)
        )

    def minha_callback(self, ch, method, properties, body):
        print(f" [x] Received {body}")

