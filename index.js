'use strict'

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
});

// start connection to the database
connection.connect();

var products;
connection.query('select a.name, b.amount from events a join event_tickets b on a.id = b.event_id', function(error, results, fields) {
  if (error) throw error;
  //  console.log('The solution is: ', results[0].solution);
  products = results;
});


connection.end();

const Telegraf = require('telegraf')
const {
  Markup
} = Telegraf

const app = new Telegraf('')
// const PAYMENT_TOKEN = ''

// const products = [{
//     name: 'Tomato Sauce',
//     location: 500,
//     description: 'Sweet and thick',
//     photoUrl: 'http://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/no-salt-added-ketchup-40824.png'
//   },
//   {
//     name: 'Chilli Sauce',
//     location: 270,
//     description: 'hot and good!',
//     photoUrl: 'http://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/no-salt-added-ketchup-40824.png'
//
//   },
//   {
//     name: 'Sour Sauce',
//     location: 300,
//     description: 'Sweet and sour',
//     photoUrl: 'http://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/no-salt-added-ketchup-40824.png'
//   }
// ]


app.command('start', ({
  reply
}) => reply('welcome to TicketSoko! Ask what we have to see the events:'))
// regex to reply when user enters anything with what
app.hears(/^what.*/i, ({
  replyWithMarkdown
}) => replyWithMarkdown(`Let me show you my products!
  ${products.reduce((acc, p) => acc += `*${p.name}* - KES ${p.amount} \n`, '')}
  What do You want?`, Markup.keyboard(products.map(p => p.name)).oneTime().resize().extra()));


app.startPolling()
