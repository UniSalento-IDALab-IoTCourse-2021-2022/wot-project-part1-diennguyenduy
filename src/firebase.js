const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("../serviceAccountKey.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

const data = {
  sensor: "ID1",
  timestamp: new Date().toISOString(),
  temperature: 25,
};

async function writeDB(data, patient_id) {
  const docRef = db.collection("patients").doc(patient_id);

  await docRef.set(data);
}

async function getData() {
  let snapshot = await db.collection("patients").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

writeDB(data, "patient_03");
//getData();
