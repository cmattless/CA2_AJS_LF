import React, { createContext, useContext,useState, ReactNode } from 'react';


interface StoryContextProps {
    story:  string | null;
    setStory: React.Dispatch<React.SetStateAction<string | null>>;
}


export const useStory = () => {
    const { story, setStory } = useContext(StoryContext);

    return { story, setStory };
}




const defaultStory: string | null = null;

export const StoryContext = createContext<StoryContextProps>({
    story: defaultStory,
    setStory: () => {}
});

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [story, setStory] = useState<string | null>(defaultStory);

    return (
        <StoryContext.Provider value={{ story, setStory }}>
            {children}
        </StoryContext.Provider>
    );
};