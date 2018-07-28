/**
 * Created by ChitSwe on 1/31/17.
 */

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import accepts from 'attr-accept';

const supportMultiple = (typeof document !== 'undefined' && document && document.createElement) ?
'multiple' in document.createElement('input') :
    true;
class FilePickerFabButton extends React.Component{

    onClick(){
        this.fileInputEl.click();
    }

    getDataTransferItems(event, isMultipleAllowed = true) {
        let dataTransferItemsList = [];
        if (event.dataTransfer) {
            const dt = event.dataTransfer;
            if (dt.files && dt.files.length) {
                dataTransferItemsList = dt.files;
            } else if (dt.items && dt.items.length) {
                // During the drag even the dataTransfer.files is null
                // but Chrome implements some drag store, which is accesible via dataTransfer.items
                dataTransferItemsList = dt.items;
            }
        } else if (event.target && event.target.files) {
            dataTransferItemsList = event.target.files;
        }

        if (dataTransferItemsList.length > 0) {
            dataTransferItemsList = isMultipleAllowed ? dataTransferItemsList : [dataTransferItemsList[0]];
        }

        // Convert from DataTransferItemsList to the native Array
        return Array.prototype.slice.call(dataTransferItemsList);
    }

    onChange(e) {
        const { onFilesAccepted, multiple } = this.props;
        const fileList = this.getDataTransferItems(e, multiple);
        const acceptedFiles = [];
        const rejectedFiles = [];

        // Stop default browser behavior
        e.preventDefault();



        fileList.forEach((file) => {
            if ( accepts(file, 'image/*')) {
                file.preview = window.URL.createObjectURL(file); // eslint-disable-line no-param-reassign
            }

            if (accepts(file,this.props.accept) && this.fileMatchSize(file)) {
                acceptedFiles.push(file);
            } else {
                rejectedFiles.push(file);
            }
        });

        if (onFilesAccepted) {
            onFilesAccepted.call(this, acceptedFiles, rejectedFiles, e);
        }
    }
    fileMatchSize(file) {
        return file.size <= this.props.maxSize && file.size >= this.props.minSize;
    }

    render (){
        let {icon,accept,multiple,onFilesAccepted,mini,style,secondary} = this.props;
        return (
            <FloatingActionButton mini={mini} secondary={secondary}  style={style} onClick={this.onClick.bind(this)}>
                <input type="file"  ref={ el => this.fileInputEl = el} style={{display:'none'}} multiple={supportMultiple&&multiple} accept={accept} onChange={this.onChange.bind(this)}/>
                {icon}
            </FloatingActionButton>
        );
    }
}

FilePickerFabButton.defaultProps = {
    secondary:false,
    mini:false,
    multiple:false,
    accept:'file/*',
    icon:<FileUpload/>,
    style:{},
    maxSize: Infinity,
    minSize: 0
}

FilePickerFabButton.PropTypes = {
    mini:React.PropTypes.bool,
    multiple: React.PropTypes.bool, // Allow dropping multiple files
    accept: React.PropTypes.string,
    icon: React.PropTypes.node,
    onFilesAccepted :React.PropTypes.func.isRequired,
    secondary:React.PropTypes.bool,
    style:React.PropTypes.object,
    maxSize: React.PropTypes.number,
    minSize: React.PropTypes.number
};

export default FilePickerFabButton;
