module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Nayan",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by the administrator na pasikat";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(` ${name} ꧁༒☬শালায় আমারে ব্লক দিছে, হিতেরে অ্যাড করতে পারতেছি না!☬༒꧂ `, event.threadID)
   } else api.sendMessage(`${name} ꧁༺❌🚫😅আমাদের রেখে পালাবা কোথায় বাবু?😅🚫❌༻꧂`, event.threadID);
  })
 }
}
