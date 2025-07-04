import { Link } from 'react-router-dom';
import img from '../assets/404.svg';
import styled from 'styled-components';

const Logo = styled.h1`
  font-weight: bold;
  font-size: 30px;
`;

const LogoSpan = styled.span`
  font-size: 35px;
  color:teal;
`

const NotFound = () => {
    return (
        <div>
            <center className=''>
                <Logo id="logo">my<LogoSpan id="logo">Duka.</LogoSpan></Logo>
            </center>
            <div className='bg-gray-200 p-2 w-[500px] flex flex-col gap-8 rounded-xl items-center mx-auto mt-8'>
                <div className='w-full'>
                    <img src={img} className='w-full object-cover' alt="Not Found" />
                </div>
                <div className='text-center'>
                    <h1 className='font-bold text-2xl mb-3'>Ooups, page not found :(</h1>
                    <p className='text-gray-800'>We{"'"}re sorry, but the page you are looking for could not be found. It may have been removed, had its name changed, or is temporarily unavailable.</p>
                </div>
                <div>
                    <button className='bg-teal-600 text-white py-2 px-6 rounded-xl'>
                        <Link to="/">
                            Back To Homepage
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
