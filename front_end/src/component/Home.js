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
          {/* <h1 className='h1tag'>I am H1</h1>
          <h2>I am H2</h2>
          <h3>I am H3</h3>
          <h4>I am H4</h4>
          <p>I am "P"</p> */}


            <div className='homePageDisplay'>
                <img src={'https://www.oberlo.com/media/1608267092-life-goals.jpg?w=1824&fit=max'} style={{width:'60%', background:'cover'}} />
            </div>
        </>
    )

}

export default Home


