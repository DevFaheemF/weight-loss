import { Modal, Button, Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    weight: Yup.number()
        .required("Weight is required")
        .positive("Weight must be a positive number"),
    week: Yup.number()
        .required("Week is required")
        .positive("Week must be a positive number")
        .integer("Week must be an integer"),
});

const WeightModal = ({ show, handleClose, onSubmit, dieters, addWeight, isLoading, isError }) => {
    const handleFormSubmit = async (values, { resetForm }) => {
        const { name, weight, week } = values;
        const currentWeight = parseFloat(weight);

        try {
            await addWeight({ name, weight: currentWeight, week: parseInt(week) }).unwrap();

            onSubmit({
                name,
                currentWeight,
                week,
                weightLoss: currentWeight - (dieters.find((d) => d.name === name)?.weight || 0),
            });

            resetForm();
            handleClose();
        } catch (err) {
            console.error("Error adding weight:", err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Please Add Your Weight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: "",
                        weight: "",
                        week: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Container>
                                <Row>
                                    <Col>
                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Name</BootstrapForm.Label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="your name"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger mt-2" />
                                        </BootstrapForm.Group>

                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Current Weight (kg)</BootstrapForm.Label>
                                            <Field
                                                type="number"
                                                name="weight"
                                                className="form-control"
                                                placeholder="current weight"
                                            />
                                            <ErrorMessage name="weight" component="div" className="text-danger mt-2" />
                                        </BootstrapForm.Group>

                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Current Week Number</BootstrapForm.Label>
                                            <Field
                                                type="number"
                                                name="week"
                                                className="form-control"
                                                placeholder="current week"
                                            />
                                            <ErrorMessage name="week" component="div" className="text-danger mt-2" />
                                        </BootstrapForm.Group>

                                       <div className="d-flex justify-content-end">
                                       <Button variant="dark" type="submit" disabled={isLoading || isSubmitting} >
                                            {isLoading || isSubmitting ? "Submitting..." : "Submit"}
                                        </Button>
                                       </div>
                                        {isError && <p className="text-danger mt-2">Error submitting data.</p>}
                                    </Col>
                                </Row>
                            </Container>
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default WeightModal;
