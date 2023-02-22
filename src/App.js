import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  Thread,
  Window,
  MessageList
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
const API_KEY = "5nhqev8c8m5a"; //Customers CodeSandbox App

const USER_ID1 = "john";
const USER_TOKEN1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9obiJ9.k0RHrPuMEmzwxXb34Q_ifgp976O9EDMAhV5y9ivMGaw";

const USER_ID2 = "keyurladani";
const USER_TOKEN2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia2V5dXJsYWRhbmkifQ.aUKvilGK3_dnUFDknY7xns1KVD2ZFJw24bip0BnMW8Y";

// Setup two users, so that we can simulate send/receive messages using two urls:.
// https://w8i1o1.csb.app/
// https://w8i1o1.csb.app/?alt
const alt = window.location.search === "?alt";

const userId = alt ? USER_ID2 : USER_ID1;
const userToken = alt ? USER_TOKEN2 : USER_TOKEN1;

document.title = `UserId: ${userId} - Stream test`;

const App = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(API_KEY, { timeout: 10000 });

      await client.connectUser(
        {
          id: userId
        },
        userToken
      );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  const filters = { type: "messaging", members: { $in: [userId] } };
  const sort = { last_message_at: -1 };
  const options = { offset: 0, limit: 30 };

  //customize the prop customMessageActions
  const logMessageHandler = (message, event) => {
    console.log(message, event);
  };
  const customMessageActions = {
    Log: logMessageHandler
  };

  //--//

  return (
    <Chat client={chatClient} theme="messaging dark">
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList customMessageActions={customMessageActions} />
          <MessageInput autoFocus={true} />
        </Window>
        <Thread
          autoFocus={true}
          additionalMessageListProps={{ customMessageActions }}
        />
      </Channel>
    </Chat>
  );
};

export default App;
