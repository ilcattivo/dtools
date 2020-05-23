import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Thumbs from './components/thumbs';
import './style.sass';

const FileUploader = ({ handleImages, handleRemove }) => {
  const [filesPreview, setFilesPreview] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          loaded: false,
        })
      );
      setFilesPreview([...filesPreview, ...newFiles]);
      setFilesToUpload(acceptedFiles);
    },
  });

  const onRemove = (event, removedFile) => {
    event.preventDefault();
    axios.get(`/api/users/removeimage?id=${removedFile.id}`).then(() => {
      setFilesPreview(
        filesPreview.filter((file) => file.id !== removedFile.id)
      );
      handleRemove(removedFile.url);
    });
  };

  const rootClasses = useMemo(() => {
    let classNames = 'dropzone';

    if (isDragActive) classNames += ' active';
    if (isDragAccept) classNames += ' accept';
    if (isDragReject) classNames += ' reject';

    return classNames;
  }, [isDragActive, isDragReject, isDragAccept]);

  useEffect(() => {
    if (!filesToUpload.length) return;

    const path = '/api/users/uploadimage';

    for (let file of filesToUpload) {
      const formData = new FormData();
      formData.append('pic', file);

      const config = {
        header: { 'content-type': 'multipart/form-data' },
      };

      axios.post(path, formData, config).then((res) => {
        const newArr = [...filesPreview];
        const uploadedFile = newArr.find((el) => el.name === file.name);
        uploadedFile.loaded = true;
        uploadedFile.url = res.data.url;
        uploadedFile.id = res.data.id;
        setFilesPreview(newArr);
        handleImages(res.data.url);
      });
    }

    setFilesToUpload([]);
  }, [filesToUpload]);

  return (
    <section>
      <div {...getRootProps()} className={rootClasses}>
        <input {...getInputProps()} />
        <p>
          Нажмите здесь для выбора изображений или переместите файлы в эту зону
        </p>
      </div>
      {filesPreview.length > 0 && (
        <Thumbs files={filesPreview} onRemove={onRemove} />
      )}
    </section>
  );
};

export default FileUploader;
