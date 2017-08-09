const readline = require('readline');
// note change this to the following if using npm package: require('telesignsdk);
const TeleSignSDK = require('../../src/TeleSign');
//var TeleSignSDK = require('telesignsdk');

const customerId = "440813A2-1F7E-11E1-B760-000000000000"; // Todo: find in portal.telesign.com
const apiKey = "yVG2pGeuyRXKgb8tt97Hr210FWE4c+WukHVWsNon914dQo4FTrZzxoLePeKCz27WhrSzmQncXjTvZ6U+0wGZeQ=="; // Todo: find in portal.telesign.com
const rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "phone_number";
const messageType = "ARN";
const verifyCode = "32658";
const message = "Your code is " + verifyCode;

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

client.sms.message(messageCallback, phoneNumber, message, messageType);

function prompt(question, callback) {
    const stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

prompt('Enter the verification code received:\n', function (input) {
    if (input === verifyCode) {
        console.log('Your code is correct.');
    } else {
        console.log('Your code is incorrect. input: ' + input + ", code: " + verifyCode);
    }
    process.exit();
});