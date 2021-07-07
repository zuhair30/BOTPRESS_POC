//CHECKSUM:ff190
"use strict";
// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');

/**
 * Send an email to John Doe when some foo happens
 * 
 *
 * @title Send Email
 * @category Foo Forwarding
 * @author Michael Mukwekezeke.
 */


    // Create a SMTP transporter object NB: You can create directTransport object to send from server
     
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL 
    auth: {
        user: 'zuhair30@gmail.com',
        pass: 'SamaN&3997'
    }
    
});



    // Message object
    let message = {
        from: 'zuhair30@gmail.com',
        to: 'fatimazaina22@gmail.com' , //freshdesk offers free helpdesk for email channel and beats Ethereal there if you want a free option
        subject: 'You can replace everything with variables for sec',
        text: 'Name: '+ '\t' + event.state.user.customerName + '\n'+ 'Message: ' + '\t' + event.state.user.message};
    // Sending message   
    transporter.sendMail(message);