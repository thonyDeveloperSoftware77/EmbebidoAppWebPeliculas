import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Chip } from "@nextui-org/react";
import { getVideoId } from "../../../controllers/recomendacion";

export default function ModalComponent({ isOpen, onClose, pelicula, generos, usuario, uid, setUpdate }, props) {
    console.log(pelicula);
    const [key, setKey] = useState("");
    const [rating, setRating] = useState(0);


    useEffect(() => {
        setRating(0)
        if (pelicula.id) {
            getVideoId(pelicula.id).then((response) => {
                setKey(response);
            });
        }

    }, [pelicula])

    return (
        <Modal size="3xl"
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onClose}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{pelicula.title}</ModalHeader>
                        <ModalBody>
                            <p>
                                {pelicula.overview}
                            </p>
                            <div className="flex">
                                {pelicula.genre_ids.map((genre) => (
                                    <div style={{ marginRight: "5px" }} key={genre}>
                                        <Chip style={{ marginRight: "7px" }} color="default" key={genre} className="text-default-500">
                                            {generos.filter(genero => genero.id === genre)[0]?.name}
                                        </Chip>
                                    </div>
                                ))}
                            </div>
                          
                            <iframe width="730" height="415" src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>


                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent"></div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
