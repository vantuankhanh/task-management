const { db } = require("../connection/firebase.connection");
const { errorHandler } = require("../loggers/errorHandler");

const checkDataExist = async (collection, statement) => {
  try {
    const ref = db.collection(collection);

    let snap = ref;
    for (let i = 0; i < statement.length; i++) {
      const sm = statement[i].split(" ");
      snap = snap.where(sm[0], sm[1], sm[2]);
    }

    const data = await snap.get();
    if (data.docs.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    errorHandler(error, "check data exists");
  }
};

module.exports = checkDataExist;
