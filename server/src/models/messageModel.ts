import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:"User"},
    text: { type: String, required: true },
    chatId:{
        type:String
    },
    fileUrl: { type: String }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
