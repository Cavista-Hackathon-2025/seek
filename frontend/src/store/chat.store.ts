import { create } from "zustand";

interface ChatState {
    userMessage: string;
    setUserMessage: (userMessage: string) => void;
    chatLog: string[];
    setChatLog: (chatLog: string[]) => void;
    isContentReplaced: boolean;
    setIsContentReplaced: (isContentReplaced: boolean) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    sendMessage: (e: any) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
    userMessage: "",
    setUserMessage: (userMessage: string) => set({ userMessage }),
    chatLog: [],
    setChatLog: (chatLog: string[]) => set({ chatLog }),
    isContentReplaced: false,
    setIsContentReplaced: (isContentReplaced: boolean) => set({ isContentReplaced }),
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
    sendMessage: async (e) => {
        e.preventDefault();
        const { userMessage, chatLog, setChatLog, setIsContentReplaced, setUserMessage, setLoading } = get();

        if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") console.log(userMessage);

        if (chatLog.length < 1) setIsContentReplaced(true);

        setChatLog([...chatLog, { user: "me", message: userMessage }]);
        setUserMessage("");

        try {
            setLoading(true);
            const { data } = await axiosKonsumeInstance.post("/api/ChatBot/ChatBot", null, {
                params: { profileId: 2, request: userMessage },
            });

            if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") console.log(data);

            setChatLog([...get().chatLog, { user: "chat", message: `${data}` }]);
            setLoading(false);
        } catch (error: any) {
            console.error(error.message);
        }

    },
}));