import nats, {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'crypto';
import { TicketCreatedListner } from './events/ticket-created-listner';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', ()=>{
  console.log('Listner connected to NATS');

  stan.on('close', ()=>{
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListner(stan).listen();


});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


// if i send a message to one of the listner i need to get a deleivery status (msg.ack)
// in case there was an error we will send it to another listner
  // const options = stan
  // .subscriptionOptions()
  // .setManualAckMode(true)//ack = acknowledjment
  // .setDeliverAllAvailable()// first time we bring this service online it will bring all the messages
  // .setDurableName('accounting-service');// this will specify what we wanna retrive " after being offline because an error"

  // const subscription = stan.subscribe('ticket:created',
  // 'queue-group-name',
  //  options);

  // subscription.on('message', (msg:Message)=>{
  //   const data = msg.getData();
  //   if(typeof data === 'string'){
  //     console.log(`Recieved event# ${msg.getSequence()}, with data : ${(data)}`)
  //   }
  //   msg.ack();
  // });




