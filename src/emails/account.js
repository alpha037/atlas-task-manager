const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'subhronil.dutta@gmail.com',
    subject: 'Thank you for signing up with us.',
    html: `
  <h2>Hey there, ${name}!</h2>
  <br>
  <p style="font-size: 20px;">
    Welcome to <span style="color: rgb(73, 50, 64);">IOT Space</span> by Atlas Inc.
  </p>`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'subhronil.dutta@gmail.com',
    subject: 'Cancellation Follow Up.',
    html: `<h2>Goodbye, ${name}!</h2>
    <br>
    <p style="font-size: 18px;">
      We are very sad to see you leave.
    </p>
    <p style="font-size: 20px">
      Is there anything we could have done to keep you on board with us? 
      Do let us know.
    </p>`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
