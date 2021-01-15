import nats from 'node-nats-streaming';
import { TicketCreatedListner } from './events/ticket-created-listner';
import {TicketCreatedPublisher} from './events/ticket-created-publisher';

console.clear();
// stan is client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async() => {
  console.log('Publisher connected to NATS');
  const publisher = new TicketCreatedPublisher(stan);
  try{
    await publisher.publish({
      id: '1234',
      title: 'concert',
      price: 20
    });
  }catch(err){
    console.log(err);
  }

  // you must publish a JSON data to the NATS

  // const data= JSON.stringify({
  //   id: '12345',
  //   title: 'concert',
  //   price: 20
  // });
  
  // stan.publish('ticket:created', data, ()=>{
  //   console.log('Event published');
  // });
});

