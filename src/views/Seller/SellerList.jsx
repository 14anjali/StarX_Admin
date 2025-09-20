import { Container, Table } from 'react-bootstrap';

function SellerList() {
  return (
    <Container className="my-4">
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created Date</th>
              {/* <th className="text-end">Wallet Balance</th> */}

              {/* <th className="text-end">User Detail</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">Name</td>
              <td>selleremail@gmail.com</td>
              <td>999934543</td>
              <td>12-03-2025</td>
              {/* <td className="text-end fw-bold">404</td> */}
              {/* <td className="text-end">
                      <Link to={`/app/user/${user._id}`} className="btn btn-sm btn-outline-primary">
                        View
                      </Link>
                    </td> */}
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default SellerList;
