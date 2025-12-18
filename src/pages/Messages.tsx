import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [messageText, setMessageText] = useState('');

  // TODO: Supabase Integration - Real-time Messaging
  // 1. Create 'conversations' table: id, participant_1, participant_2, created_at, updated_at
  // 2. Create 'messages' table: id, conversation_id, sender_id, content, read, created_at
  // 3. Enable RLS so users can only see their own conversations
  // 4. Enable Supabase Realtime for 'messages' table
  // 5. Fetch conversations: supabase.from('conversations').select('*, profiles!participant_2(*)')
  // 6. Subscribe to new messages: supabase.channel('messages').on('postgres_changes', { event: 'INSERT', table: 'messages' }, callback)
  const conversations = [
    {
      id: '1',
      participant: { name: 'John Doe', role: 'Employer' },
      lastMessage: 'Thanks for your interest!',
      timestamp: '2 mins ago',
      unread: 2,
    },
    {
      id: '2',
      participant: { name: 'ABC Construction', role: 'Employer' },
      lastMessage: 'Can you start next week?',
      timestamp: '1 hour ago',
      unread: 0,
    },
    {
      id: '3',
      participant: { name: 'HomeWorks Ltd', role: 'Employer' },
      lastMessage: 'Perfect! See you then',
      timestamp: '1 day ago',
      unread: 0,
    },
  ];

  // TODO: Supabase - Fetch messages for selected conversation
  // const { data: messages } = await supabase.from('messages').select('*').eq('conversation_id', selectedConversation).order('created_at')
  const messages = [
    {
      id: '1',
      sender: 'other',
      text: 'Hi! I saw your profile and I\'m interested in hiring you for a project.',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'me',
      text: 'Hello! Thank you for reaching out. I\'d be happy to discuss the project details.',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      sender: 'other',
      text: 'Great! We need a carpenter for custom kitchen cabinets. Are you available next week?',
      timestamp: '10:35 AM',
    },
    {
      id: '4',
      sender: 'me',
      text: 'Yes, I have availability next week. Could you provide more details about the project scope?',
      timestamp: '10:40 AM',
    },
    {
      id: '5',
      sender: 'other',
      text: 'Thanks for your interest!',
      timestamp: 'Just now',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    // TODO: Replace with Supabase real-time message insert
    console.log('TODO: Send message to Supabase', {
      conversationId: selectedConversation,
      text: messageText,
    });

    setMessageText('');
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Mammy Coker Hub" className="h-10 w-auto" />
              <span className="font-heading font-bold text-lg hidden sm:block">
                Messages
              </span>
            </Link>
            <Link to="/dashboard/professional">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Messages Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-80 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversation === conversation.id ? 'bg-muted/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold truncate">{conversation.participant.name}</h3>
                      {conversation.unread > 0 && (
                        <Badge className="ml-2">{conversation.unread}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conversation.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedConv?.participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedConv?.participant.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedConv?.participant.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {/* TODO: Subscribe to Supabase real-time messages for live updates */}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <Button variant="ghost" size="icon" type="button">
                <Paperclip size={20} />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <Smile size={20} />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="hero" disabled={!messageText.trim()}>
                <Send size={20} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
