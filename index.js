import express from 'express';
import { Channels, Providers, Repositories, Utils } from './Services/Notification/index.js';

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

const databaseRepository = new Repositories.NotificationRepository();
const emailService = new Channels.Email('emailOne', new Providers.SES({credentials:{'from':'karam@test.com'},type:'email',templates:{'btc-notification':new Utils.EmailTemplate('Todays BTC price has gone {btcStatus}', '<html>Hi {name}, \n Current BTC price: {btcPrice}</html>'),'default': new Utils.EmailTemplate("Basic hello from {name}","<html>Hi from {name}</html>")}}), databaseRepository);


// gets all notifications
app.get('/notification', async (req, res) => {
  try {
    const providerId = req.query.providerId;
    if(!providerId) return res.status(400).send({"message":'ProviderId is required'});

    const notifications = await emailService.getAllNotifications();
    res.send({notifications});
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).send({"message": 'Internal Server Error'});
  }
});

app.post('/notification', async (req, res) => {
  try {
    const { templateId, to, variables, channel } = req.body;

    if(channel !== 'email') {
      return res.status(400).send({"message":'Channel not supported'});
    }
    if(!templateId || !to) {
      return res.status(400).send({"message":'templateId and to are required'});
    }

    const notifications = await emailService.send(templateId, to, variables || {});
    res.send(notifications);

  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).send('Internal Server Error');
  }
});

// custom notification, ideally this would be in a parallel service, that handles notifications for our Bitcoin price usecase
app.post('/notification/custom', async (req, res) => {
  try {
    const { to, variables } = req.body;
    if(!to) return res.status(400).send({"message":'To is required'});
    const reqVariables = variables || {};
    reqVariables.name = reqVariables.name || 'User';
    const btcPrice = "Rs. 67,51,630.10"; // get from some a better source of truth
    const btcStatus = Math.random() > 0.5 ? 'up 🚀' : 'down 😥'; // get from some a better source of truth
    const notifications = await emailService.send("btc-notification", to, { subject: 'Bitcoin Price Update', btcPrice, btcStatus, ...reqVariables });
    res.send(notifications);
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/notification', async (req, res) => {
  try {
    const id = req.query.id;
    const providerId = req.query.providerId;
    if(!providerId) return res.status(400).send({"message":'ProviderId is required'});
    if(!id) return res.status(400).send({"message":'Id is required'});
    const notification = await emailService.getNotification(id);
    if(!notification) return res.status(404).send({"message":'Notification not found'});
    await emailService.deleteNotification(id);
    res.send({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).send('Internal Server Error');
  }
});

//exposes port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});