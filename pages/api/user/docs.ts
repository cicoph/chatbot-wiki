import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { DefaultAdapter } from 'next-auth/adapters';

const { GOOGLE_DRIVE_FOLDER_ID } = process.env

const authDrive = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file"]
);
const drive = google.drive({ version: "v3", auth: authDrive })

const authDocs = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/documents"]
);
const docs = google.docs({ version: "v1", auth: authDocs }) //sheets({ version: "v4", auth: jwt });

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
        handlePOST(res, req);
    } else if (req.method === "DELETE") {
        handleDELETE(res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

// GET /api/user/:id
async function handlePOST(res, req) {
    const { folderName, content } = res.body
    const folderId = await createFolder(folderName) as string
    const documentId = await createDocument( { title: `Doc per ${folderName}`, content} )
    const exportUrl = await moveDocToFolder( { documentId, folderId } )
    return res.json( exportUrl ).end()
}

// DELETE /api/user/:id
async function handleDELETE(res) {

}

const createDocument =async ({ title, content }: { title: string, content: string } ) => {
    const createResponse = await docs.documents.create({
        requestBody: {
            title
        },
    });
    console.log(createResponse.data);
    const { documentId } = createResponse.data
    const updateResponse = await docs.documents.batchUpdate({
        documentId,
        requestBody: {
            requests: [{
                insertText: {
                    endOfSegmentLocation: {},
                    text: content
                }
            }]
        }
    });
    console.log( updateResponse.data )
    return documentId
}

const createFolder = async (folderName: string) => {
    const folderId = getFolderId(folderName)
    if (!folderId) {
        const requestBody = {
            title: `${folderName} - Contenuti`,
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
    drive.files.get({
        fileId: documentId,
        fields: "parents"
    }, (err, res) => {
        if (err) return console.log('#1002 - The API returned an error:' + err);
        oldParent = res.data.parents[0]
        console.log("Parent folder ID :", res.data.parents[0])

    })
    const result = await drive.files.update({
        fileId: documentId,
        removeParents: oldParent,
        addParents: folderId,
        supportsAllDrives: true
    })
    console.log( result.data.exportLinks )
    return result.data.exportLinks
}

const getFolderId = (folderName: string): string | boolean => {
    let result
    drive.files.list({
        spaces: 'drive',
        driveId: GOOGLE_DRIVE_FOLDER_ID,
        q: `name='${folderName} - Contenuti ' and mimeType='application/vnd.google-apps.folder'`,
        pageSize: 25,
        fields: "nextPageToken, files(id, name)"
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        const { files } = response.data
        console.log("Files: " + files)
        if ( files.length == 0 ) return false
        const folder = files.find(file => file.name == folderName)
        for (var i = 0; i < files.length; i++) {
            console.log('%s (%s)', files[i].name, files[i].id);
        }
        result = folder.id || false
    });
    return result
}