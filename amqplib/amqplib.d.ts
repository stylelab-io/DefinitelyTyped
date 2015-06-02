declare module "amqplib" {

    interface AMQPConnection {

        createChannel() : Q.IPromise<AMQPChannel>;

    }

    interface AMQPChannel {

        prefetch(prefetchCount : number, global : boolean);

        assertQueue(queueName : string);

        sendToQueue(queueName : string, buffer : Buffer, options? : { replyTo? : string; persistent? : boolean; });

        consume(queueName : string, messageDeliveryCallback : (msg : AMQPMessage) => void);

        ack(msg : AMQPMessage);

    }

    interface AMQPMessage {

        content : Buffer;

        fields : {

            routingKey : string;

        };

        properties : {

            replyTo : string;

        }

    }

    export function connect(str : string) : Q.IPromise<AMQPConnection>;

}