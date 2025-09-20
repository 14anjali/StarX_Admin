import { Container, Row, Col, Button, Modal, Form, Spinner, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const QRCodeList = () => {
  const [amount, setAmount] = useState('');
  const [totalQr, setTotalQr] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [qrData, setQrData] = useState([]);

  const navigate = useNavigate();

  // Fetch QR Codes

  const fetchQr = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/auth/signin-1', { replace: true });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://starx-backend.onrender.com/api/qrcode/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      if (response.status === 401) {
        Cookies.remove('token');
        navigate('/auth/signin-1', { replace: true });
        return;
      }
      const data = await response.json();
      if (response.ok) setQrData(data);
      else setError(data.message || 'Failed to fetch QR codes');
    } catch {
      setError('Something went wrong. Try again!');
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    fetchQr();

  }, [navigate, fetchQr]);

  // Process QR Data into cards
  const processQrData = () => {
    const result = {};
    qrData.forEach((item) => {
      const key = `₹${item.amount}`;
      if (!result[key]) result[key] = { total: 0, used: 0, remain: 0 };
      result[key].total += 1;
      if (item.status === 'used') result[key].used += 1;
      else result[key].remain += 1;
    });
    return result;
  };

  const qrStats = processQrData();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    // setSelectedProduct('');
    setAmount('');
    setTotalQr('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) return navigate('/auth/signin-1', { replace: true });

    const payload = { amount, count: totalQr };
    setBtnLoading(true);

    try {
      const response = await fetch('https://starx-backend.onrender.com/api/qrcode/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Server returned invalid JSON');
      }

      console.log('Parsed data:', data);

      if (!response.ok) {
        // Handle non-200 status codes
        throw new Error(data?.message || `Server error: ${response.status}`);
      }

      // Success case
      handleCloseModal();
      fetchQr();
      alert('QR codes created successfully!');
    } catch (err) {
      console.error('Error details:', err);
      alert(err.message || 'Something went wrong while creating QR codes.');
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status" style={{ width: '4rem', height: '4rem' }} />
          <p className="mt-3 fw-bold text-primary">Loading QR...</p>
        </div>
      </div>
    );

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">QR Code Management</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowModal}>
            <i className="bi bi-plus-circle me-2"></i>Add QR Codes
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        {Object.keys(qrStats).length === 0 && <p>No QR Codes available</p>}
        {Object.entries(qrStats).map(([key, stats]) => (
          <Col xs={12} sm={6} md={4} lg={3} key={key}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="text-center">{key} QR</Card.Title>
                <hr />
                <p className="mb-1">
                  Total: <strong>{stats.total}</strong>
                </p>
                <p className="mb-1 text-muted">
                  Used: <strong>{stats.used}</strong>
                </p>
                <p className="mb-0 text-primary">
                  Remain: <strong>{stats.remain}</strong>
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {error && <p className="text-danger mt-3">{error}</p>}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New QR Codes</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>QR Code Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                placeholder="Enter amount"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Number of QR Codes</Form.Label>
              <Form.Control
                type="number"
                value={totalQr}
                onChange={(e) => setTotalQr(e.target.value)}
                min="1"
                placeholder="Enter total number of QR codes"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={btnLoading}>
              {btnLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Adding...
                </>
              ) : (
                'Add QR Codes'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default QRCodeList;
