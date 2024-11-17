import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAddWeightMutation } from "../api/DietExtendedApi";
import WeightModal from "../modals/WeightModal";

const DataEntryForm = ({ dieters, onSubmit }) => {
    const [showModal, setShowModal] = useState(false);
    const [addWeight, { isLoading, isError }] = useAddWeightMutation();

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    return (
        <div className="d-flex align-items-center justify-content-between mx-3 py-3">
        <h3>Diet Progress</h3>
        <Button variant="dark" onClick={handleModalOpen}>
            Add Weight
        </Button>

        <WeightModal
            show={showModal}
            handleClose={handleModalClose}
            onSubmit={onSubmit}
            dieters={dieters}
            addWeight={addWeight}
            isLoading={isLoading}
            isError={isError}
        />
    </div>
    );
};

export default DataEntryForm;

