import React from 'react';

const Footer = () => {
    return (
        <div style={{backgroundColor: '#1d3557', color: 'white', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem'}}>
            <div className="container py-4">
                <hr className="my-4" />
                <div className="row">
                    {/* Logo Section */}
                    <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
                        <div className="image">
                            <img src='/logo.svg' alt="logo" className="img-fluid" style={{maxHeight: '80px'}} />
                        </div>
                    </div>

                    {/* Hours Section */}
                    <div className="col-md-4 mb-4 mb-md-0">
                        <div className='timing'>
                            <table className='w-100'>
                                <thead>
                                    <tr><th className="h5">Hours</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className="pb-2">Monday: 10:00AM to 11:00PM</td></tr>
                                    <tr><td className="pb-2">Wednesday: 10:00AM to 11:00PM</td></tr>
                                    <tr><td className="pb-2">Thursday: 10:00AM to 11:00PM</td></tr>
                                    <tr><td className="pb-2">Friday: 10:00AM to 11:00PM</td></tr>
                                    <tr><td>Saturday: 10:00AM to 8:00PM</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="col-md-4">
                        <div className="contact">
                            <table className='w-100'>
                                <thead>
                                    <tr><th className="h5">Contact</th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="pb-2">
                                            <i className="fa-solid fa-phone me-2"></i>
                                            30900 203400
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pb-2">
                                            <i className="fa-solid fa-message me-2"></i>
                                            apollo@gmail.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fa-solid fa-location-dot me-2"></i>
                                            Gujarat, India
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-center py-3" style={{backgroundColor: '#1d3557', color: 'white'}}>
                &copy; All CopyRight Reserved By Apollo Medical Institute.
            </footer>
        </div>
    )
}

export default Footer;