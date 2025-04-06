import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    IconButton,
    Fab
} from '@mui/material';
import { Chat as ChatIcon, Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMessage = message;
        setMessage('');
        setIsLoading(true);

        // Add user message to chat history
        setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);

        try {
            const response = await fetch('http://localhost:5001/api/chat/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error getting response');
            }

            // Add AI response to chat history
            setChatHistory(prev => [...prev, { type: 'bot', text: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setChatHistory(prev => [...prev, { 
                type: 'bot', 
                text: 'Sorry, I encountered an error. Please try again.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <Fab
                color="primary"
                aria-label="chat"
                sx={{ position: 'fixed', bottom: 20, right: 20 }}
                onClick={() => setIsOpen(true)}
            >
                <ChatIcon />
            </Fab>

            {/* Chat Window */}
            {isOpen && (
                <Paper
                    sx={{
                        position: 'fixed',
                        bottom: 90,
                        right: 20,
                        width: 350,
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                    }}
                >
                    {/* Chat Header */}
                    <Box sx={{ 
                        p: 2, 
                        backgroundColor: 'primary.main', 
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6">Financial Advisor</Typography>
                        <IconButton 
                            size="small" 
                            onClick={() => setIsOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Messages */}
                    <Box sx={{ 
                        flex: 1, 
                        overflowY: 'auto', 
                        p: 2,
                        backgroundColor: '#f5f5f5'
                    }}>
                        <List>
                            {chatHistory.map((chat, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: chat.type === 'user' ? 'flex-end' : 'flex-start',
                                        padding: '2px 0'
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            p: 1,
                                            backgroundColor: chat.type === 'user' ? 'primary.main' : 'white',
                                            color: chat.type === 'user' ? 'white' : 'text.primary',
                                            maxWidth: '80%'
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {chat.text}
                                        </Typography>
                                    </Paper>
                                </ListItem>
                            ))}
                            {isLoading && (
                                <ListItem>
                                    <CircularProgress size={20} />
                                </ListItem>
                            )}
                            <div ref={chatEndRef} />
                        </List>
                    </Box>

                    {/* Chat Input */}
                    <Box sx={{ p: 2, backgroundColor: 'white' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Ask about financial topics..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <IconButton 
                                        onClick={handleSend}
                                        disabled={!message.trim() || isLoading}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatBot;
