import aws from 'aws-sdk'

export async function uploadFile(fileName, fileContent) {
    const s3 = new aws.S3({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_REGION,
    });
    s3.config.maxRetries = 2
    // const fileContent = await axios(filePath);

    const params = {
        Bucket: process.env.REACT_APP_BUCKET,
        Key: "imagens/" + fileName, // aws name
        Body: fileContent,
        //ContentType: mimeType//geralmente se acha sozinho
    };
    const data = await s3.upload(params).promise();
    return data.Location;
}

export async function downloadFile(key, name = null) {
    // name should be download name
    if (!name)
        name = key
    api.post('downloadFile',
        { "key": key },
        { "responseType": "blob" }).then((response) => {
            fileDownload(response.data, name);
            return response.data
        }).catch((e) => console.log(e))
}