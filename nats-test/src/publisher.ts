import nats from 'node-nats-streaming';
console.clear();
// stan is client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');
  // you must publish a JSON data to the NATS
  const data= JSON.stringify({
    id: '12345',
    title: 'concert',
    price: 20
  });
  
  stan.publish('ticket:created', data, ()=>{
    console.log('Event published');
  });
});

