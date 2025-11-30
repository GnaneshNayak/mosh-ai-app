const conversations = new Map<string, string>();

export const conversationRepository = {
   getConversationResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setConversationResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
   clearConversations() {
      conversations.clear();
   },
};
