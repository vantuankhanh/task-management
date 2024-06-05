const { Timestamp } = require("firebase-admin/firestore");
const { db } = require("../../connection/firebase.connection");
const { errorHandler } = require("../../loggers/errorHandler");
const { response } = require("../../utils/responseBuilder");

const getMessage = async (req, res) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return response(
        res,
        { success: false },
        "Required id of employees send and received!",
        400
      );
    }

    const messageRef = db
      .collection("message")
      .where(`between.${from}`, "==", true)
      .where(`between.${to}`, "==", true);
    const messageSnap = await messageRef.get();

    const messageData = messageSnap.docs
      .map((mess) => ({ ...mess.data() }))
      .sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());

    const data = messageData.map((message) => {
      return {
        isFrom: message.from === from,
        message: message.message,
        createdAt: message.createdAt.toDate(),
      };
    });

    return response(
      res,
      data,
      `Successfully get messages of ${from} and ${to}`,
      200
    );
  } catch (error) {
    errorHandler(error, "get message");
    response(res, null, "Internal server error", 500);
  }
};

const createMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    if (!from || !to || !message) {
      return response(
        res,
        { success: false },
        "Required id of employees send, received and message!",
        400
      );
    }

    const messageRef = db.collection("message");
    let between = {};
    between[from] = true;
    between[to] = true;
    await messageRef.add({
      between,
      from,
      message,
      createdAt: Timestamp.fromMillis(Date.now()),
    });

    return response(
      res,
      { success: true },
      "Successfully created message",
      201
    );
  } catch (error) {
    errorHandler(error, "get message");
    response(res, null, "Internal server error", 500);
  }
};

module.exports = {
  getMessage,
  createMessage,
};
