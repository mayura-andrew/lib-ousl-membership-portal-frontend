import React from 'react'

const Footer: React.FC = () => (
    <footer className="text-center">
        <div className="text-base text-darkmod-blue font-normal my-12">
            <p>
            &copy; {new Date().getFullYear()} All rights reserved
            <a href='www.lib.ou.ac.lk'
            target='_blank'
            rel='noopener noreferrer'
            className='active:text-darkmod-blue font-normal'>
                {' '}
                The Open University of Sri Lanka Main Library
            </a>
            </p>
        </div>
    </footer>
);
export default Footer;
