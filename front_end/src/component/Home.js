import { Route, Redirect } from 'react-router'
import { CheckUserLogIn } from './CheckUserLogIn';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import VisionsBoard from './VisionBoard';

export function Home() {
    console.log(localStorage);
    
    // localStorage.clear()
   



    return (
        <>
            <h1>Alex's branch</h1>
            <div className='homePageDispaly'>
                <img src={'https://www.oberlo.com/media/1608267092-life-goals.jpg?w=1824&fit=max'} style={{width:'60%', background:'cover'}} />

            </div>
        </>
    )

}

export default Home