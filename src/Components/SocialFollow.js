import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{ faFacebook, faTwitter, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons'


export default function SocialFollow(){
    return(
        <div className='social-follow'>
             <a
    href="https://github.com/GKAtwood"
    className="github social"
 >
         <FontAwesomeIcon icon={faGithub} size="2x" />
 </a>
 <a
  href="https://www.facebook.com/gabi.atwood567/"
  className="facebook social"
>
  <FontAwesomeIcon icon={faFacebook} size="2x" />
</a>
<a href="https://www.twitter.com/xxgoldie_bushxx/" className="twitter social">
  <FontAwesomeIcon icon={faTwitter} size="2x" />
</a>
<a
  href="https://www.instagram.com/gift.ofgabs/"
  className="instagram social"
>
  <FontAwesomeIcon icon={faInstagram} size="2x" />
</a>
        </div>
    )
}