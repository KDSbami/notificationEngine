import express from 'express';

const app = express();


// gets all notifications
app.get('/notification', (req, res) => {


  // Send the usersList as a response to the client
  res.send({
    notification: {
      status: 'success',
      message: 'Notification sent successfully',
    },
  });
});