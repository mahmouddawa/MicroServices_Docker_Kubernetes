import {Message} from 'node-nats-streaming';
import {Listner} from './base-listner';
import { TicketCreatedEvent} from './ticket-created-event';
import { Subjects } from './subjects';


export class TicketCreatedListner extends Listner<TicketCreatedEvent>{
  //readonly i can use read only  instead of subject: Subjects.TicketCreated
  // this will prevent me from changing the value of the subject #297-298
  // that means the following line can be replacement for the one after it
  //readonly subject = Subjects.TicketCreated;
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message){

    console.log('event data ', data);
    console.log(data.id);

    msg.ack();
  }
}