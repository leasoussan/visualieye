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
            <div className='flex justify-center'>
                <img src={'https://www.oberlo.com/media/1608267092-life-goals.jpg?w=1824&fit=max'} style={{width:'60%', background:'cover', textAlign:"center"}} />
            </div>
        </>
    //     <h1 className="text-3xl font-bold underline">
    //     Hello world!
    //   </h1>
    )

}

export default Home


