const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.onAnswer = functions.firestore.document('AudioFiles/{fileId}')
  .onWrite(event=>{
    const document = event.data.exists ? event.data.data() : null;
    if(document.answer.trim()!=="") {
      return event.data.ref.set({status: true}, {merge: true});
    }
  })
