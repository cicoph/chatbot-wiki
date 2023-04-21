import {
    ExportFormatV1,
    ExportFormatV2,
    ExportFormatV3,
    ExportFormatV4,
    LatestExportFormat,
    SupportedExportFormats,
} from '@/types/export';

import { cleanConversationHistory } from './clean';
import { FolderInterface } from '@/types/folder';
import { Conversation, Message, Role } from '@/types/chat';

export function isExportFormatV1(obj: any): obj is ExportFormatV1 {
    return Array.isArray(obj);
}

export function isExportFormatV2(obj: any): obj is ExportFormatV2 {
    return !('version' in obj) && 'folders' in obj && 'history' in obj;
}

export function isExportFormatV3(obj: any): obj is ExportFormatV3 {
    return obj.version === 3;
}

export function isExportFormatV4(obj: any): obj is ExportFormatV4 {
    return obj.version === 4;
}

export const isLatestExportFormat = isExportFormatV4;

export function cleanData(data: SupportedExportFormats): LatestExportFormat {
    if (isExportFormatV1(data)) {
        return {
            version: 4,
            history: cleanConversationHistory(data),
            folders: [],
            prompts: [],
        };
    }

    if (isExportFormatV2(data)) {
        return {
            version: 4,
            history: cleanConversationHistory(data.history || []),
            folders: (data.folders || []).map((chatFolder) => ({
                id: chatFolder.id.toString(),
                name: chatFolder.name,
                type: 'chat',
            })),
            prompts: [],
        };
    }

    if (isExportFormatV3(data)) {
        return { ...data, version: 4, prompts: [] };
    }

    if (isExportFormatV4(data)) {
        return data;
    }

    throw new Error('Unsupported data format');
}


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

    await fetch('/api/user/export-google', {
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' },
        method: 'POST'
    }).then(result => console.log(result))
};