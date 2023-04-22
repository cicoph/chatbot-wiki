import { FolderInterface } from '@/types/folder';
import { Conversation } from '@/types/chat';

export const exportGoogleDocs = async ( folderId: string ) => {
    let folders = localStorage.getItem('folders');
    if (folders.length == 0) return
    
    let chatFolder = JSON.parse(folders) as FolderInterface[]
    if (chatFolder.length == 0) return

    let history = localStorage.getItem('conversationHistory');

    if (history.length == 0) return
    let chatConversation = JSON.parse(history) as Conversation[]

    if (chatConversation.length == 0) return

    const folder = chatFolder.find(folder => folder.id == folderId)
    const conversations = chatConversation.filter( conv => conv.folderId == folderId )
    const folderName = folder.name
    const discussion = []
    conversations.forEach( conversation => {
        const { messages, name: title } = conversation
        const content = messages.filter( m => m.role == 'assistant' ).map( m => m.content ).reverse()
        discussion.push({
            title,
            content
        } )
    })

    const data = {
        folderName,
        discussion: discussion.reverse()
    }
    
    return await fetch('/api/user/export-google', {
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' },
        method: 'POST'
    }).then(async result => await result.json())
};