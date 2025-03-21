import Message from "../models/messageModel";

 const fetchMessage = async () => {
    try {
      const messages = await Message.find().populate("sender")
      return messages
    } catch (error: any) {
        throw new Error(error.message || "Error during fetching messages..");
    }
  };


  export default {fetchMessage}