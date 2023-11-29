import { getFullYear, getFooterCopy } from './../utils/utils';
import './Footer.css';


function Footer() {
  return(
    <div>
      <footer className='App-footer'>
        <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      </footer>
    </div>
  );
}

export default Footer;