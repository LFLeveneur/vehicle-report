const {WebClient} = require('@slack/web-api');

// Initialize token from the environment variables
const token = 'xoxb-4143610569559-4151643166630-1aAZos6D0YAiBRZB6jxlZq4x' // process.env.SLACK_BOT_TOKEN;

// Initialize web client
const web = new WebClient(token);

// Initialize slack channel
const channelId = 'C0450PZPSAD' // process.env.SLACK_CHANNEL_ID;

// Required SignalModel required for the request type
const SignalModel = require('../models/signal.model');

module.exports.sendSlack = async () => {
  SignalModel.find({}, async (err, data) => {
    try {
      const dateServer = new Date(); // Set teh date server
      const dataLength = data.length; // Get the length of the data
      if (dataLength > 0) {
        console.log(`Size Database > 0 // In database ${dataLength} element, DATE: ${dateServer}`);
        // Loop through the data
        for (let i = 0; i < dataLength; i++) {
          const dateData = new Date(data[i].date); // Get the date of the signal
          const diff = dateServer.getTime() - dateData.getTime(); // Get the difference between the date server and the date signal
          const diffMinutes = Math.round(((diff % 86400000) % 3600000) / 60000); // Convert the difference in minutes

          // If the difference is greater than 10 minutes
          if (diffMinutes > 10) {
            // delete the signal
            SignalModel.deleteOne({_id: data[i]._id}, (err) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log('Signal deleted');
              }
            });
            
            // Get the information of the signal
            const idTicket = data[i].idTicket;
            const imatriculation = data[i].imatriculation;
            const situation = data[i].situation;
            const picture = data[i].picture
            const dateFormat = data[i].dateFormat;
            
            try {
              // Post a message to the channel, and await the result
              const result = await web.chat.postMessage({
                channel: channelId,
                text: "fallback text message",
                blocks: [
                  {
                    type: 'header',
                    text: {
                      type: 'plain_text',
                      text: 'Signalement de véhicule : '
                    }
                  },
                  {
                    type: 'divider',
                    block_id: 'divider'
                  },
                  {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": `Imatriculation: ${imatriculation}\nSituation : ${situation}\nDate : ${dateFormat}  \nID Tiket : ${idTicket}`
                    },
                    "accessory": {
                      "type": "image",
                      "image_url": picture,
                      "alt_text": "image situation scooter"
                    }
                  }
                ],
                attachments: [
                  {
                    fallback: 'Image envoyée !',
                    image_url: picture
                  }
                ],
              });
              // The result contains an identifier for the message, `ts`.
              console.log(`Successfully send message ${result.ts} in conversation ${channelId}`);
            }
            catch (err) {
              console.log(err);
            }
          }
        }
        console.log('End of the loop');
      } if (dataLength === 0) {
        console.log(`I'm testing a database SIZE: ${dataLength}, DATE: ${dateServer}`);
        console.log('No signal to send');
        return;
      }
    }
    catch (err) {
      console.log(err);
    }
  });
}