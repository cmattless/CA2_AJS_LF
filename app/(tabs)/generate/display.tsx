import React, { useContext, useEffect } from 'react';
import { StoryContext } from '@/contexts/StoryContext';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';


const DisplayStory: React.FC = () => {
    const router = useRouter();
    const { story } = useContext(StoryContext);

    return (
        <View className="flex-1 bg-[#333333]">
            <View className="flex-row justify-between items-center p-4">
                <Image
                    className='w-full h-1/3 brightness-50'
                    style={{ width: 80, height: 122 }}
                    source={require("@/assets/images/LF_Trans.png")}
                    resizeMode="contain"
                />
            </View>
            <ScrollView className="justify-between items-center p-4">
                <Markdown style={styles}>{story}</Markdown>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    heading1: {
        fontSize: 32,
        backgroundColor: '#000000',
        color: '#00000',
    },
    heading2: {
        fontSize: 24,
    },
    heading3: {
        fontSize: 18,
    },
    heading4: {
        fontSize: 16,
    },
    heading5: {
        fontSize: 13,
    },
    heading6: {
        fontSize: 11,
    },
    text: {
        color: '#aaaaaa',
        fontSize: 16,
    }, 
    bullet_list: {
        color: '#aaaaaa',
        fontSize: 16,
    },
    li: {
        color: '#aaaaaa',
        fontSize: 16,
    }

});

export default DisplayStory;