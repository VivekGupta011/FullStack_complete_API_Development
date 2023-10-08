import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Color from '../components/Color';
import Container from '../components/Container';

const CompareProduct = () => {
    return (
        <>
            <Meta title="Compare Product" />
            <BreadCrumb title="Compare Product" />
            <Container class1="compare-product-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src="images/cross.svg" className='position-absolute cross img-fluid' alt="cross" />
                            <div className="product-card-image">
                                <img src="images/watch.jpg" alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">Honor T1 7.0.1 GB RAM 8 GB ROM 7 Inch With Wi-fi+3G Tablet</h5>
                                <h6 className="price mb-3 mt-3">$100</h6>
                                <div>
                                    <div className="product-detail">
                                        <h5>Brand: </h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type: </h5>
                                        <p>Watch</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Availability: </h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color: </h5>
                                        <Color />
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size: </h5>
                                        <div className="d-flex gap-10">
                                            <p>M</p>
                                            <p>S</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src="images/cross.svg" className='position-absolute cross img-fluid' alt="cross" />
                            <div className="product-card-image">
                                <img src="images/watch.jpg" alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">Honor T1 7.0.1 GB RAM 8 GB ROM 7 Inch With Wi-fi+3G Tablet</h5>
                                <h6 className="price mb-3 mt-3">$100</h6>
                                <div>
                                    <div className="product-detail">
                                        <h5>Brand: </h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type: </h5>
                                        <p>Watch</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Availability: </h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color: </h5>
                                        <Color />
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size: </h5>
                                        <div className="d-flex gap-10">
                                            <p>M</p>
                                            <p>S</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CompareProduct;
