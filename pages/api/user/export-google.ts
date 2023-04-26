import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

const { GOOGLE_DRIVE_FOLDER_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env

const authDrive = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    (GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file"
    ]
);
const drive = google.drive({ version: "v3", auth: authDrive })

const authDocs = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    (GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/documents"]
);
const docs = google.docs({ version: "v1", auth: authDocs })

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const session = await getServerSession(req, res, authOptions);
    const user = session?.user as any
    if (!user) {
        throw new Error(
            `You must be logged in not supported at this route.`,
        );
    }
    if (req.method === "POST") {
        return await handlePOST({ req, res });
    } else if (req.method === "GET") {
        return await handleGET({ res })
    } else if (req.method === "DELETE") {
        return await handleDELETE({ res });
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

async function handleGET({ res }) {
    return res.json({}).end()
}
// GET /api/user/:id
async function handlePOST({ req, res }) {
    const { folderName, discussion } = req.body
    const folderId = await createFolder(folderName)
    if( folderId === '' ) return
    const documentId = await createDocument({ title: `${folderName}`, folderId, discussion })
    const id = await moveDocToFolder({ documentId, folderId })
    return id ? res.status(200).json({ id }) : res.status(404).json({ message: 'file not found' })
}

// DELETE /api/user/:id
async function handleDELETE({ res }) {

}

const createDocument = async ({ title, folderId, discussion }: { title: string, folderId: string, discussion: any }) => {
    const getVersion = await getVersionDoc( `${title}_v`, folderId )
    try {
        const createResponse = await docs.documents.create({
            requestBody: {
                title: `${title}_v${getVersion}`
            },
        });
        const { documentId } = createResponse.data
        let totalCount = 1
        let requests = []
        discussion.reverse().forEach(async (section, i) => {
            const { title, content } = section as { title: string, content: string[] }
            const paragraghFormatted = content.reverse().join('\n\n')
            const partialRequest = [
                {
                    insertText: {
                        location: {
                            index: totalCount,
                        },
                        text: `${title}\n\n`
                    }
                },
                {
                    insertText: {
                        location: {
                            index: title.length + totalCount + 1,
                        },
                        text: `${paragraghFormatted}\n\n\n`
                    }
                },
                {
                    updateTextStyle: {
                        textStyle: {
                            weightedFontFamily: {
                              fontFamily: 'Roboto',
                              weight: 900
                            },
                            fontSize: {
                              magnitude: 18,
                              unit: 'PT'
                            }
                        },
                        range: {
                            startIndex: totalCount,
                            endIndex: title.length + totalCount
                        },
                        fields: "weightedFontFamily,fontSize"
                    }
                },
            ]
            totalCount += paragraghFormatted.length + title.length + 3
            requests.push( ...partialRequest)
        })
        await docs.documents.batchUpdate({
            documentId,
            requestBody: {
                requests
            }
        });
        return documentId
    } catch (error) {
        console.log(error.message)
    }
}

const createFolder = async ( folderName: string ): Promise<string> => {
    const folderId = await getFolderId(folderName)
    if ( !folderId ) {
        const requestBody = {
            name: `${folderName} - Contenuti`,
            parents: [GOOGLE_DRIVE_FOLDER_ID],
            mimeType: 'application/vnd.google-apps.folder'
        };
        const res = await drive.files.create({
            requestBody,
            fields: 'id',
        })
        return res.data.id
    }
    return folderId
}

const moveDocToFolder = async ({ documentId, folderId }: { documentId: string, folderId: string }): Promise<any | null> => {
    let oldParent = ''
    const file = drive.files.get({
        fileId: documentId,
        fields: "parents"
    })
        .then(res => res.data.parents[0])
        .catch(err => {
            console.log('#1002 - The API returned an error:' + err);
            return false
        })
    if (!file) return null
    const result = await drive.files.update({
        fileId: documentId,
        removeParents: oldParent,
        addParents: folderId,
        supportsAllDrives: true
    })
    return result.data.id
}

const getFolderId = async (folderName: string): Promise<string> => await drive.files.list({
    fields: "files(id)",
    q: `name='${folderName} - Contenuti' and '${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder'`,
}).then(response => {
    const { files } = response.data
    if (files.length == 0) return ''
    const { id = '' } = files.length > 1 ? files.find(file => file.name == folderName) : files[0]
    return id
}).catch(err => {
    console.log('The API returned an error: ' + err);
    return '';
});


const getVersionDoc = async (fileName: string, folderId: string): Promise<number> => await drive.files.list({
    fields: "files(name)",
    q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document'`,
}).then(response => {
    const { files } = response.data
    if (files.length == 0) return 1
    const folder = files.filter(file => file.name.includes(fileName))
    return folder.length + 1
}).catch(err => {
    console.log('The API returned an error: ' + err);
    return 1;
})