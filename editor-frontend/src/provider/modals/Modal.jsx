import { useContext } from 'react';
import { ModalContext } from '../ModalProvider';
import CreateFileModal from './CreateFileModal';

const Modal = () => {

    const modalFeatures = useContext(ModalContext);

    return <>
        {modalFeatures.activeModal === "CREATE_FILE" && <CreateFileModal />}
        {modalFeatures.activeModal === "EDIT_FILE" && <CreateFileModal />}
        {modalFeatures.activeModal === "CREATE_FOLDER" && <CreateFolderModal />}
    </>
}

export default Modal;