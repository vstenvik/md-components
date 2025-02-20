import React, { useRef, ChangeEvent, DragEvent, MouseEvent } from 'react';
import classnames from 'classnames';
import { useFileUpload } from '../hooks/useFileUpload';
import MdFileList from '../fileList/MdFileList';
import MdButton from '../button/MdButton';

import MdUploadIcon from '../icons/MdUploadIcon';

interface MdFileUploadProps {
  onUpload?(files: File[] | FormData): void;
  onCancel?(e: MouseEvent): void;
  useFormData?: boolean;
  uploadButtonText?: string;
  cancelButtonText?: string;
  hideFileListIcons?: boolean;
  multiple?: boolean;
  imagesOnly?: boolean;
};

const MdFileUpload: React.FunctionComponent<MdFileUploadProps> = ({
  onUpload,
  onCancel,
  useFormData = false,
  uploadButtonText = 'Last opp',
  cancelButtonText = 'Avbryt',
  hideFileListIcons = false,
  multiple = true,
  imagesOnly = false
}: MdFileUploadProps) => {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (onUpload) {
      if (useFormData) {
        const formData = createFormData();
        onUpload(formData);
      } else {
        onUpload(files);
      }
    }
  };

  const handleCancel = (e: MouseEvent) => {
    e.preventDefault();
    clearAllFiles();
    if (onCancel) {
      onCancel(e);
    }
  }

  const outerClassnames = classnames('md-fileupload');
  const dropAreaClassnames = classnames('md-fileupload__droparea');

  const onDragEnterEvent = (e: DragEvent<HTMLDivElement>) => {
    handleDragDropEvent(e);

    if (!multiple && files.length > 0) {
      // @ts-ignore
      e.target?.classList?.add('md-fileupload__droparea--not-allowed');
    } else {
      // @ts-ignore
      e.target?.classList?.add('md-fileupload__droparea--active');
    }
  }

  const onDragLeaveEvent = (e: DragEvent<HTMLDivElement>) => {
    handleDragDropEvent(e);
    // @ts-ignore
    e.target?.classList?.remove('md-fileupload__droparea--active');
    // @ts-ignore
    e.target?.classList?.remove('md-fileupload__droparea--not-allowed');
  }

  const onRemoveFile = ((file: File) => {
    removeFile(file.name);
  })

  return (
    <div className={outerClassnames}>
      <div
        className={dropAreaClassnames}
        onDragEnter={onDragEnterEvent}
        onDragLeave={onDragLeaveEvent}
        onDragEnd={onDragLeaveEvent}
        onDragOver={handleDragDropEvent}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          handleDragDropEvent(e);
          onDragLeaveEvent(e);
          if (multiple || (!multiple && files.length < 1)) {
            setFiles(e, 'a', imagesOnly);
          }
        }}
      >
        <div className="md-fileupload__droparea-icon">
          <MdUploadIcon />
        </div>

        <div className="md-fileupload__droparea-content">
          Dropp {imagesOnly ? 'et bilde' : 'en fil'} her eller <button type="button" onClick={() => inputRef.current?.click()}>velg fra denne maskinen</button>
          <div className="md-fileupload__droparea-content--count">Antall {imagesOnly ? 'bilder' : 'filer'}: {files.length} {!multiple ? '/ 1' : ''}</div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="md-fileupload__input"
          accept={imagesOnly ? 'image/*' : '*'}
          onChange={(e: ChangeEvent<HTMLElement> | DragEvent<HTMLDivElement>) => {
            if (multiple || (!multiple && files.length < 1)) {
              setFiles(e, 'a', imagesOnly);
              if (inputRef && inputRef.current) {
                inputRef.current.value = '';
              }
            }
          }}
        />

        {files && files.length > 0 &&
          <div className="md-fileupload__files-wrapper">
            <MdFileList
              files={files}
              hideDownload={true}
              allowDelete={true}
              hideIcons={hideFileListIcons}
              onRemoveFile={(file: File) => onRemoveFile(file)}
            />
          </div>
        }
      </div>

      <div className="md-fileupload__actions">
        <MdButton
          theme="secondary"
          onClick={handleCancel}
        >
          {cancelButtonText}
        </MdButton>
        <MdButton
          onClick={handleSubmit}
          disabled={!files || files.length === 0}
        >
          {uploadButtonText}
        </MdButton>
      </div>
    </div>
  );
}

export default MdFileUpload;
