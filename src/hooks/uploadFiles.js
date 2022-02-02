import { useEffect, useState } from "react"


export const useUploadFiles = (ref) => {
    const [files, setFiles] = useState([])
    const [uiFiles, setUiFiles] = useState([])

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((el) => el !== prev[index]));
        setUiFiles((prev) => prev.filter((el) => el !== prev[index]));
    };
    useEffect(() => {
        const handleFile = (e) => {
            const content = e.target.result;
            setUiFiles((prevState) => [...prevState, content]);
        };
        const changeFilesHandler = (e) => {
            console.log(e);
            [...e.target.files].forEach((el) => {
                if (files.some((element) => el.name === element.name)) return;
                setFiles((prev) => [...prev, el]);
                let reader = new FileReader();
                reader.addEventListener("load", handleFile);
                reader.readAsDataURL(el);
            });
        };
        if (ref.current) {
            ref.current.addEventListener('change',
                changeFilesHandler
            )
        }
    }, [ref])

    return [files, uiFiles, removeFile]
}