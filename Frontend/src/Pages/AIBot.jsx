import React, {useState} from "react";
import ChatInput from "../Components/mentorchat/ChatInput";
import MessageBubble from "../Components/mentorchat/MessageBubble";

export default function AIBot() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const setQuerychange = (e)=>{
        setQuery(e.target.value);
    }
    const getResponse = async() =>{
      setLoading(true);
        setMessages(prev=>[...prev, {role:"user", text:query}]);
        setQuery("")
        try{
          const res = await  geminires(query);
          setMessages(prev=>[...prev, {role:"mentor", text:res}]);
          setLoading(false)
        } catch(e){
          setLoading(false);
          console.log(e);
        }
    }
  return (
   <div className="flex flex-col h-[calc(100vh-102px)]">
  {/* Header */}
  <div>
    <h1 className="text-center text-3xl">Tinku Mentor</h1>
  </div>

  {/* Chat messages */}
  <div className="flex-grow overflow-y-auto">
    {
      loading===true?
      (
      <div className="animate-pulse"> thinking.... </div>
      )
      :
      (

        <div><MessageBubble messages={messages}/> </div>
      )

    }
   
  </div>

  {/* Chat input*/}
  <div className="p-2 flex justify-center">
    <ChatInput setQuerychange={setQuerychange} getResponse={getResponse} />
  </div>
</div>

  );
}
