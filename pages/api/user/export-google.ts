import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { DefaultAdapter } from 'next-auth/adapters';

type ApiResReq = {
    res: NextApiResponse,
    req: NextApiRequest
}
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
        return await handlePOST({req, res});
    } else if (req.method === "GET") {
        return await handleGET( {res} )
    } else if (req.method === "DELETE") {
        return await handleDELETE({res});
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

async function handleGET( { res } ) {
    return res.json({}).end()
}
// GET /api/user/:id
async function handlePOST({ req, res }) {
    const { folderName, discussion } = req.body
    const folderId = await createFolder(folderName) as string
    const documentId = await createDocument({ title: `Doc per ${folderName}`, discussion })
    const id = await moveDocToFolder({ documentId, folderId })
    return id ? res.status(200).json({id}) : res.status(404).json({message: 'file not found'})
}

// DELETE /api/user/:id
async function handleDELETE({res}) {

}

const createDocument = async ({ title, discussion }: { title: string, discussion: any } ) => {
    const createResponse = await docs.documents.create({
        requestBody: {
            title
        },
    });
    const { documentId } = createResponse.data
    let requests = []
    discussion.map((section , i) => {
        const { title, content } = section as { title: string, content: string[] }
        const titleFormatted = {
            insertText: {
                location: {
                  index: 1
                },
                text: `${title}\n`
            }
        }
        const paragraghFormatted = content.map((p, index) => {
            return {
                insertText: {
                    location: {
                      index: 1
                    },
                    text: `${p}\n`
                }  
            }
        })
        requests.push(...(paragraghFormatted).concat([titleFormatted]) )
    })
    await docs.documents.batchUpdate({
        documentId,
        requestBody: {
            requests
          }
    });
    return documentId
}

const createFolder = async (folderName: string) => {
    const folderId = await getFolderId(folderName)
    if (!folderId) {
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
    if( !file ) return null
    const result = await drive.files.update({
        fileId: documentId,
        removeParents: oldParent,
        addParents: folderId,
        supportsAllDrives: true
    })
    return result.data.id
}

const getFolderId = async (folderName: string): Promise<string | boolean> => {
    const result = await drive.files.list({
        fields: "files(id, name, driveId)",
        q: `name='${folderName} - Contenuti' and '${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder'`,
    }).then( response => {
        const { files } = response.data
        if (files.length == 0) return false
        const folder = files.length > 1 ? files.find(file => file.name == folderName) : files[0]
        return folder?.id
    }).catch(err => {
        console.log('The API returned an error: ' + err);
        return false;
    })
    return result
}