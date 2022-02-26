import React, {FC, useState} from 'react'
import {Photo} from '../../App'
import './PhotoItem.scss'
import {Button, Modal} from "react-bootstrap";

interface PhotoItemProps {
    photo: Photo,
    removePhoto: (photo: Photo) => void
};

interface ModalProps {
    largeImg: string,
    show: boolean;
    onHide: () => void
}


const PhotoItem: FC<PhotoItemProps> = ({photo, removePhoto}) => {
    const [showModal, setShowModal] = useState(false)


    const MyVerticallyCenteredModal: FC<ModalProps> = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Photo 600x600
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.largeImg }alt=""/>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <>
            <div key={photo.id}>
                <div className='photo'>
                    <div className="photo__content">
                        <img onClick={() => setShowModal(true)} src={photo.thumbnailUrl} alt=""/>
                        <strong className='photo__content-title'>{photo.id}{photo.title}</strong>
                    </div>

                    <div className='photo__btns'>
                        <div>{photo.albumId}</div>

                        <button onClick={() => removePhoto(photo)}>Delete</button>
                    </div>
                </div>

            </div>
            {
                showModal && <>
                    <MyVerticallyCenteredModal
                        largeImg={photo.url}
                        show={showModal}
                        onHide={() => setShowModal(false)}
                    />
                </>
            }
        </>

    )
}


export default PhotoItem
