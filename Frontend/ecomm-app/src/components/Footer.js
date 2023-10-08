import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs'
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
    <footer className='py-4'>
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-5">
            <div className="footer-top-data d-flex align-items-center gap-30">
              <img src={newsletter} alt='newsletters' />
              <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
            </div>
          </div>
          <div className="col-7">
          <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-4'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-4">
            <h4 className='text-white mb-4'>Contact Us</h4>
            <div>
              <address className='text-white fs-5'>#No: 7 Musa Street Upper Allen Town</address>
              <a href='tel: +23278837468' className='mt-3 d-block mb-1 text-white'>+23278837468</a>
              <a href='mailto: hassanmusa3971@gmail.com' className='mt-2 d-block mb-0 text-white'>hassanmusa3971@gmail.com</a>
              <div className="social_icons d-flex align-items-center gap-30 mt-4">
                <a href="#" className='text-white'>
                  <BsLinkedin className='fs-5' />
                </a>
                <a href="#" className='text-white'>
                  <BsInstagram />
                </a>
                <a href="#" className='text-white'>
                  <BsGithub />
                </a>
                <a href="#" className='text-white'>
                  <BsYoutube />
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <h4  className='text-white mb-4'>Information</h4>
            <div className='footer-links d-flex flex-column align-items'>
              <Link to="/privacy-policy" className='text-white py-2 mb-1'>Privacy Policy</Link>
              <Link to="/refund-policy" className='text-white py-2 mb-1'>Refund Policy</Link>
              <Link to="shipping-policy" className='text-white py-2 mb-1'>Shipping Policy</Link>
              <Link to="/term-conditions" className='text-white py-2 mb-1'>Terms & Conditions</Link>
              <Link to="/blogs" className='text-white py-2 mb-1'>Blogs</Link>
            </div>
          </div>
          <div className="col-3">
            <h4  className='text-white mb-4'>Account</h4>
            <div className='footer-links d-flex flex-column align-items'>
              <Link className='text-white py-2 mb-1'>About</Link>
              <Link className='text-white py-2 mb-1'>Faq</Link>
              <Link className='text-white py-2 mb-1'>Contact</Link>
            </div>
          </div>
          <div className="col-2">
            <h4  className='text-white mb-4'>Quick Links</h4>
            <div className='footer-links d-flex flex-column align-items'>
              <Link className='text-white py-2 mb-1'>Accessories</Link>
              <Link className='text-white py-2 mb-1'>Laptops</Link>
              <Link className='text-white py-2 mb-1'>Headphones</Link>
              <Link className='text-white py-2 mb-1'>Smart Watches</Link>
              <Link className='text-white py-2 mb-1'>Tablets</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-4'>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className='text-center mb-0 text-white'>&copy; { new Date().getFullYear() }; Power by Developer's Corner</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;
