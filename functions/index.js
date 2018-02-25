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




exports.onAnswer = functions.firestore.document('Done/{fileId}')
  .onCreate(event=>{
    const document = event.data.exists ? event.data.data() : null;
    const farmerId = document.farmerId;
    const amount = parseFloat(document.amount);
    const farmerRef = firestore.doc(`farmers/${farmerId}`);
    if(!farmerRef) return null;
    return farmerRef.get().then((doc)=>{
      if (doc.exists) {
        const alreadyAmount = doc.data().amount;
        const newAmount = parseFloat(alreadyAmount)+amount;
        return farmerRef.set({amount: newAmount}, {merge: true});
      }
      return null;
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  })
