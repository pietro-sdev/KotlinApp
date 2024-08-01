import React, { useState, useEffect} from "react";
import styles from "./test.module.css";
import api from '../../services/api'
import fileDownload from 'js-file-download';
// import { Blob } from "buffer"

export default function TestUpload (){
    const [selectedFile, setSelectedFile] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [image, setImage] = useState("")

    useEffect(()=>{
        const key = "cities.csv"
        api.post('downloadFile', {"key": key}, {"responseType": "blob"}).then((response)=>{
            // const imageData = Buffer.from(response.data, 'base64')
            // console.log(response)
            // const blob = new Blob( [Buffer.from(response.data, 'base64')], {
            //     type: "application/octet-stream",
            //   });
            fileDownload(response.data, key);
            setImage(imageData)
        }).catch((e)=>console.log(e))
    },[])

    const uploadFile = (e) => {
        e.preventDefault();                                         

        // Create an object of formData
        let formData = new FormData();

        // Update the formData object

        formData.append('file', selectedFile);


        api.post("uploadFile", formData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                //console.log(res)
                if (res.status === 200)
                    return setSuccessMessage("File uploaded successfullyS3")
                })
                .catch((error) => {
                    //console.error(error.response);
                    return setErrorMessage(error.response.statusText+" Please select the file")
            })

    };

    return (
        <div>
            <form method="post" action="#" onSubmit={(e) => uploadFile(e)} >
                <input type="file" name="uploadFile" onChange={(e) => {setSelectedFile(e.target.files[0])}}></input>
                <p> {successMessage}</p>
                <p>{errorMessage}</p>
                <button> upload</button>
            </form>
            <img src={`data:image/png;base64,${image}`} alt="teste"/>
        </div>
    )
    
}