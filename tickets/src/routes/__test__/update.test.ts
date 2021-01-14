import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('return a 404 if the provided id does not exiest ', async()=>{
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie',global.signin())
        .send({
          title: 'sdkf',
          price: 20
        })
        .expect(404);

});

it('return a 401 if the user is not authenticated', async()=>{
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'aslkdfj',
      price: 20,
    })
        .expect(401); 

});

it('return a 401 if the user does not own the ticket ', async()=>{
  const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
          title: 'concert',
          price:20
        }).expect(201);
  await request(app)
        .put(`/api/tickets/${response.body._id}`)
        .set('Cookie', global.signin())
        .send({
          title:'conecerto2',
          price: 10
        })
        .expect(401);
});

it('return a 400 if the user provieded an invalid title or price', async()=>{
  const cookie = global.signin();
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title: 'concert',
    price:20
  }).expect(201);
await request(app)
  .put(`/api/tickets/${response.body._id}`)
  .set('Cookie', cookie)
  .send({
    title:'',
    price: 10
  })
  .expect(400);
  await request(app)
  .put(`/api/tickets/${response.body._id}`)
  .set('Cookie', cookie)
  .send({
    title:'concerto4',
    price: -10
  })
  .expect(400);

});

it('it updates the ticket provided valid inputs ', async()=>{
  const cookie = global.signin();
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title: 'concert',
    price:20
  }).expect(201);

  await request(app)
        .put(`/api/tickets/${response.body._id}`)
        .set('Cookie', cookie)
        .send({
          title: 'new concert',
          price: 300
        })
        .expect(200);

  const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body._id}`)
      .send();

    expect(ticketResponse.body.title).toEqual('new concert');
    expect(ticketResponse.body.price).toEqual(300);
});

