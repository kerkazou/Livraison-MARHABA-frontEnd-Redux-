import '../../App.css';
import Error from './components/404.png';

function PageNotFound() {
  return (
    <section className="d-flex justify-content-center align-items-center">
      <img src={Error} alt='error' style={{'width':'100%','height':'100vh'}}></img>
    </section>
  );
}

export default PageNotFound;