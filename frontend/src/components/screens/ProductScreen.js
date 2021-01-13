import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button} from 'react-bootstrap';
import Rating from '../Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions'
import Loader from '../Loader';
import Message from '../Message';

const ProductScreen = ({match}) => {
    // const product = products.find(p => p._id === match.params.id)
    // const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const productDetails = useSelector(state => state.productDetails)
    console.log(productDetails, "test")
    const { loading, error, product = [] } = productDetails;
    return (
        <>
         <Link className='btn btn-light my-3' to="/"> Go Back </Link>   
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span> Price: {product.price}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span> Description: {product.description}</span>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong> ${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn=block' type='button' disabled={product.countInStock === 0}> Add To Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
         )}
        </>
    )
}

export default ProductScreen
