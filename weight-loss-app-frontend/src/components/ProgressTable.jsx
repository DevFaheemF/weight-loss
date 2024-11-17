import { Container, Row, Col, Table } from "react-bootstrap";
import { useGetProgressQuery } from "../api/DietExtendedApi";
import Loader from "./Loader";

const ProgressDisplay = ({ dieters }) => {
  const { data, error, isLoading } = useGetProgressQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error loading progress data.</p>;
  }

  const dietersData = data?.progress || [];

  const sortedDieters = [...dietersData].sort((a, b) => b.percentageLoss - a.percentageLoss);

  return (
    <Container>
      <Row>
        <Col>
          <div className="table-responsive">
            <Table striped bordered hover responsive className="progress-table mb-5 text-center">
              <thead className="table-dark text-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Weight Change (kg)</th>
                  <th>Percentage Loss (%)</th>
                  <th>Weeks Ahead/Behind</th>
                  <th>Target Progress</th>
                </tr>
              </thead>
              <tbody>
                {sortedDieters.map((dieter, index) => {
                  const weightChange = dieter.weightLoss || 0;
                  const percentageLoss = dieter.percentageLoss || 0;
                  const weeksBehind = Math.round((dieter.weightLoss / 0.5) - dieter.week);

                  return (
                    <tr
                      key={dieter._id}
                      className={`table-row ${
                        index % 2 === 0 ? "bg-light text-dark" : "bg-info text-light"
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td className="fw-bold">{dieter.name}</td>
                      <td>{weightChange.toFixed(2)}</td>
                      <td>{percentageLoss.toFixed(2)}%</td>
                      <td>{weeksBehind} weeks</td>
                      <td>{dieter.targetWeight}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProgressDisplay;
