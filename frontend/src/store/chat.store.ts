import { create } from "zustand";

interface ChatMessage {
  user: string;
  message: string;
}

interface ChatState {
  userMessage: string;
  setUserMessage: (userMessage: string) => void;
  chatLog: ChatMessage[];
  setChatLog: (chatLog: ChatMessage[]) => void;
  isContentReplaced: boolean;
  setIsContentReplaced: (isContentReplaced: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  sendMessage: (e: any, containerRef: React.RefObject<HTMLDivElement>) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  userMessage: "",
  setUserMessage: (userMessage) => set({ userMessage }),
  chatLog: [],
  setChatLog: (chatLog) => set({ chatLog }),
  isContentReplaced: false,
  setIsContentReplaced: (isContentReplaced) => set({ isContentReplaced }),
  loading: false,
  setLoading: (loading) => set({ loading }),

  sendMessage: async (e, containerRef) => {
    e.preventDefault();

    const { userMessage, chatLog, setChatLog, setIsContentReplaced, setUserMessage, setLoading } = get();

    if (!userMessage.trim()) return; // Prevent sending empty messages

    if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") console.log("User message:", userMessage);

    if (chatLog.length < 1) setIsContentReplaced(true);

    setChatLog([...chatLog, { user: "me", message: userMessage }]);
    setUserMessage("");

    // try {
    //   setLoading(true);
    //   const { data } = await axiosKonsumeInstance.post("/api/ChatBot/ChatBot", null, {
    //     params: { profileId: 2, request: userMessage },
    //   });

    //   if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") console.log("Response:", data);

    //   setChatLog([...get().chatLog, { user: "chat", message: `${data}` }]);
    // } catch (error: any) {
    //   toast.error(error.message);
    //   if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") console.error("Error:", error);
    // } finally {
    //   setLoading(false);
    // }

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  },
}));
