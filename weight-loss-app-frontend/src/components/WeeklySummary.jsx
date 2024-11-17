import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useGetProgressQuery } from '../api/DietExtendedApi';
import Loader from './Loader';

const WeeklySummary = () => {
    const { data, error, isLoading } = useGetProgressQuery();
    const [cardsToShow, setCardsToShow] = useState(9);

    if (isLoading) return <Loader/>;
    if (error) return <p>Error loading data...</p>;

    const dieters = data?.progress || [];

    if (!dieters || dieters.length === 0) {
        return <p>No data available for the weekly summary.</p>;
    }

    const topAchiever = dieters.reduce((max, dieter) =>
        dieter.weightLoss > max.weightLoss ? dieter : max
    );

    const totalWeightLoss = dieters.reduce((total, dieter) => total + dieter.weightLoss, 0);

    const handleLoadMore = () => {
        setCardsToShow(cardsToShow + 9);
    };

    return (
        <section className='summary-section bg-dark mt-4'>
            <div id="weekly-summary">
                <div className="summary-overview mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <h5>Top Achiever</h5>
                            <p><strong>{topAchiever.name}</strong> with <strong>{topAchiever.weightLoss.toFixed(2)} kg</strong> lost.</p>
                            <p><strong>Total Community Weight Loss:</strong> {totalWeightLoss.toFixed(2)} kg</p>
                        </Card.Body>
                    </Card>
                </div>

                <Row>
                    {dieters.slice(0, cardsToShow).map((dieter, index) => (
                        <Col sm={12} md={6} lg={4} key={index} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title className='custom-heading text-dark'>{dieter.name}</Card.Title>
                                    <Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <strong>Week:</strong>
                                            <span>{dieter.week}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Weight Loss:</strong>
                                            <span>{dieter.weightLoss.toFixed(2)} kg</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>% Weight Loss:</strong>
                                            <span>{((dieter.weightLoss / dieter.weight) * 100).toFixed(2)}%</span>
                                        </div>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {cardsToShow < dieters.length && (
                    <div className="text-center mt-4">
                        <Button className='px-5' onClick={handleLoadMore} variant="light">
                            Load More
                        </Button>
                    </div>
                )}
            </div>
        </section>

    );
};

export default WeeklySummary;

