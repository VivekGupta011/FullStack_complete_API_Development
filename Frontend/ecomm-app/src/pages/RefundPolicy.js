import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const RefundPolicy = () => {
    return (
        <>
            <Meta title="Refund Policy" />
            <BreadCrumb title="Refund Policy" />
            <Container class1="policy-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <h2 className='d-flex align-items-center justify-content-center'>Refund Policy</h2>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default RefundPolicy;
