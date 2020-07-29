import React, { Component } from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer'
import Gallery from './Gallery';
import UserEdit from './UserEdit';
import Board from './Board';
import AddEntry from './AddEntry';
import Connect from './Connect'
import Greeting from './Greeting'



class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            entries: [],
            
            };  
        this.logout=this.logout.bind(this)
        };

   

        componentDidMount(){
            axios.get('/api/memento/users').then(res=>{
                this.props.login(res.data);
                axios.get(`/api/memento/entries/get?uid=${this.props.user.uid}`).then(resp=>{
                    this.setState({
                        entries: resp.data
                       })
                       console.log(this.state.entries)
                    }).catch(error=>console.log(error))
            }).catch(error=>{
                console.log('session does not exist', this.state.isLoggedIn);
                this.setState({entries: []})
                this.props.history.push('/login')
            })
          
        }

      

        
     
    
        logout() {
            // axios GET to /auth/logout here
            axios.post('/api/memento/auth/logout')
            .then(()=>{
                this.props.logout()
            })
            .catch(err => console.log(err));
        
          }
    


   render(){
 
    return(
        <div className="dashboard">
                
                <main>
                
                <div className="dash-greeting">
                    <div className="prof-pic-small"><img src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f13d2595-f83b-4330-bf3f-7edc411502d7/69.jpg" alt=""/></div> <Greeting user={this.props.user}/>
                </div>
                <Route path='/dashboard/gallery' render={()=><Gallery entries={this.state.entries}/>}/>
                <Route path="/dashboard/board" component={Board}/>
                <Route path='/dashboard/addentry/:type' component={AddEntry}/>
                <Route path='/dashboard/useredit' component={UserEdit}/>
                <Route path="/dashboard/connect" render={()=><Connect entries={this.state.entries}/>}/>
               
               

                </main>
                <aside className="all-header">
                    <div className="all-title"><Link to="/dashboard/gallery"><b>Memento</b></Link></div>
                    <div className="user-box">
                    <Link to='/dashboard/connect'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAADmCAMAAABruQABAAAAh1BMVEX29vYAAAD5+fn+/v77+/vu7u7w8PD09PTi4uLr6+vOzs7f39/T09PExMTJyckqKiq1tbV6enpfX1++vr5nZ2dJSUkkJCTZ2dlNTU1cXFyvr682NjZDQ0MMDAyEhISioqJVVVUUFBQ7OzuYmJh0dHR/f3+Tk5MgICATExOfn5+Li4svLy9ra2sNEl5oAAAK1ElEQVR4nO1dbVfiOhAumUApb4IgaFUKgrqg///33bbgXYSZadpO0rCH54N79hzb9HFekkxmJkFwww033HDDDTfcIAuVQuv0R9MfIgqlAXQYLXqjFL1+FGb//wcoprz0Il6u5q0T3D0tx3193fxSYv3kvoXjdRZ3QTf9iRWhIdq9EMSOeEzacIXC0zCa8cQO2A6uTXhaT99MmOXCG12T7BSMnk2Z5ewGV8MOuk9lmOWaGV2FYirYlGWWIb4C0UG3wDdSeOr4LjoYV2OW4rUHTX89C72sTC1F4jE5FVCLEEO8e0tOdYznNAr3nq4xVfRVl1qrtQp8JKfad/WppeQ89JZC1FqtmXc2pyIhav45FBFb+4FfU4HqiEktQ88jm1NtA6mtJvtdkmz224fi3+00zeh/FLuRLHwAoDNk/y6SFf/7975oZZHUHsbhWdhHaWgn7ENjP7SywNZWRMwg3Zlz+9e2D1M4L7X5kN6WaR3TD2490Eqe2jJgdUu36bX1onHB8dSmRX98BTvq2VXTglMdhtq6b/B5MKQeb3iSY6V2ZxbegYWXgmOpfUWGBqMHxBuatDhWIY2p0Wo5aU5wLLV5mfkJEvwlja28WGp35aZewE8O4oa8iWozq4oSCnl8Gfqax2aUUsrWjiBWKKXfIwE5WztCoxGyJpRS0tYO0Kiv/HavlAW2VumPjQvOOTfVYagZrkYugFtc17HBsdSq2NoBIfY6x1tUeVs7ALDtzt6pUhYoZHUdQpXyySU3K7Z2eHMfe6NDnbRkazkAe2co9eWFsKaQGQCL6zlbmVilFsAEeaurPZwKOYWsnUShsfSGkRtuPLX68USN7eKGTpyJXYUMiEnACTf2LLuW8/9BY9ws21qGprjx85qMo9ZYGHZkn1toWyFTAJZ2M7DuJ+HbPjU8IGR9k6NHnEJKaQ3Mkde3hV5Oj0qfcgrZWoYIef3aukp2GIUUG1xPkfe/2HYltEqK2VoKeEcGsH7CSB5vfkom4sIaGSGxLjeCm8Aa8mQQVDl61t0kfs4iqZDUkYDgADgU5sGEqakuNsaD/XAJINnVoraWDrHFuG3sr7j0ZX614LyWQeEHw/ZXXCm58xQsWYVMxYbmeN25iOCp7uuZ1ISp4QenbiKvur8+GfNZmJomUhUcBYJU+NfY98Ilo6qDrZKdeMkjoL95/PwzXyWR8JAqIBIqHR50KA0qVPJFoprYZXw2ntBVF0pT9WTW15K2oRRF7dXF4PoHNqrOSWp2z/FVllsc9kfjONltkng8XETiNeekQrae7VFTANHwY3bunFfLOKs5lxqEpmYtw1CBGnyQUbv1dtoWoUfbmrU8NQ39PT6Z/sVsqOqzY6itrZwpapg+FhDL8bnp1Cx+ZRTSSjhZ6/GnCbMcy1orFI7ah7xGKpiWqxj6CKv+fTlbs5GdAP2CSpJLrMcVFZOT2nNHeiKtWHJ+X2m/A1zhvvgZQOWS89a4tAZx81qr1Zf2I4BFrA0xKblWUYqrlB6IU9tXp9ZqvbRLfY92SU1poy4qND7L6BGrkOLUqI1vCQxMjY63NXFqYVUvcgrTta1TW5Ohlro3I4fi1ta4Y/oyMDoGvE5qRmEpx9RkFDJDcRXGVdraAUWlQW6lFhQr5MskGY96vd402Rc1byo4dfFLIef7USevOM+7KwKoRcLtW/ncK6+o3Q/VeVgk691Hr87Yw2l26SOvkCy1+wUe71HQ+SAe4fYmHtnaXY/Zc0IblcGc8ZMeKeSSj2IpdEfEBDk8olZYch7o6FLq9Ak4a2vSDcdYW3tdGIx22YkrJp9yTI2xtXXXSEeU/p1TSZ9N+6OQf8yoZd986i931aQmT43ZihpKLQcMflYqM7pzgj+2Zi61/FUQTTf7zZTpR0tUbh+l5qGtnbwtXYpp5hne1qSpcbZWmloR3CqklK0ZwR9be5WmxtqaP26kSvd4f5w/Q01D2B8sOiXPgR0rZCVbU3p6mMZWcZlzYH+o0VLT/b96fGfutf2xNdqNnKV/G55H8QcM8vMaIzWa2kWuLb3aP32KbdfrVCEZ568vyt72xYfAus2dnXiikGjVw6qoNTf0Xi+f+h/ya8iKUzaeIs2e3+uQ7Yzt9HyNXY3gLYpaTwuKXVF+iltb4048FdXxrDUbIAl5CoIxH6j2xY0EZCFOjuekmyUcHglmex01KOrT7pRai18eqx77qV+TuBd1UlpBuzvc3XMe5EBN3NaYCD6rkAFVAHSG9efnH4NfsyE17nCiMLsABLsm++NGDtBU6N9zaka5RcQk4AO1WgqZAakO+1eopRYnopXi1FRdhTyQq5R5+BvyCy0BqeXkiKaexvgjnTQoRo3rEmyEN+nbmJQSo5aFFYpS6hl8i98tIkkt27cwPT54yN8yxYbhq6h/xZuYXkw6Y5f8EqztQh1q2SFwhfTRnfxFPnT/88rUgtLX1aWWJl28GfBdYuokcWsYl6iMoPfmNUD0Kq5NLYVWU8Ps3287lwyi/TePWNTuWQc9rCPfb8w3XTt38HH3REgsEBSE0y2zxf7a97Sl2wXxfhxy1DJo0IPNRUljiudt3Ad71yYynbQkl3XZLcHRKP6YzFaPLy+Pq+/3zXjQsXtDMB11q29rF2PlOZUA+Q/Q1i+lwwPBVqi5Bj21XT21AKglsrxC5vdKOex4QFqbNDUFUbyfLF3ev403FJKvuoXBT/Hmw8hVjxFibpO+Bu9Xsdy7G8mhjW7lLxjQv7Vj5oQc4UmEq24vFN9CMfYFiOWWcGcaxKYdtCzCV8nCHRwxd+XgqjY8XUXWR+Ke2IHcsGHfHFCz39oNvVtAtjMNNX9abzaFm5vkCBQ1+1f0oK2XJe8dRvv757DemBttFCz4FyWl5qLBM3Y2LTcqQ+3L+hyANUF+FRuVVkgHDdDQVYlYAxeO2pf16Q3tKip1yzdHzcGSS2HhBKFesIytOenwj+ZeybhJVmouNqcoN5EFA0tt6GLfbY1b41Kzp5O8rbmJlqChyV1tbs0rZEDE72o3KPaCGp7rWDcM5Ac1PGWu5krPF2qBWiMfUOu2YW+oBRqrAaizs/KHGu6sl9U/wSNqeFSZ603BwydqRMJ71bx1NrXINbUU2GdUnAV8o4afB1eKKnilkBnQuxgrNSr2jhp1amrWp+4Uvilk/k1oFcaq7Mf4SI1q/mlUInryFu8UMgNxyUzJzGsfpRaQB6d3obnJsdSKeyTZA1Vh8mCcCOKr1FIoothzZUjOT1s7gMhUSMmZqKXSXGykYWrp51ElhM/FzUl0h2tn3qStHb+PznqdFiRtwoCrXm6eWkqOLkL+bnPN+AK2M3bjCplBc6W9u4CQXVHJuRfUClzdehNdJgZqCGI+8d8HhTyAv5RiNo7yBNwDNEBnynlHj6QWFGhljrf3eLToRlF3MYqXxcUM/khNqkTUS2p8ZceVUwsC7v73K6cWqKiwb8O1UssqRP9ZavTNk/8AtUxy9dXSn3ntDLpbtz+HdKMAQeiO0X1gFObSHRtFoXRR/x4G9+Il58KoflmRdLmEBeio6D4DFG8mnbEbh4JxeX+5s3HZpw3osORVU1sLJefWABEXdDzDzEbJuUUoiAxlt70yZhkUhOPC2e45YXp3ew0NUczEHx82fXc1iPJQGsLR5uliKbZe7YdIiOjqkN0vHg2mycf7ZLudvH8k4143gGuW2G/kt1YD/FScX728brjhBjn8B0vPnN8+o01vAAAAAElFTkSuQmCC" alt="connect with others" className="icon"  width="30"/></Link>
                    <Link to='/dashboard/board'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQl679HqNTHtCIGPWQ60ca5TdYB5GG7mSBhFQ&usqp=CAU" alt="Inspiration" className="icon"  width="30"/></Link>
                    <Link to='/dashboard/useredit'><img src="https://image.flaticon.com/icons/png/512/84/84380.png" alt="user edit" className="icon" width="30"/></Link>
                     <Link to ='/'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAAD39/fFxcW8vLynp6fv7++UlJT8/PyFhYXz8/Orq6sYGBjd3d1ISEjh4eF+fn7MzMzX19d0dHSgoKBUVFQtLS1iYmIfHx80NDRPT09BQUHR0dG0tLSKiorn5+cLCwsRERE8PDxubm5fX18pKSmbm5spC1p/AAAF20lEQVR4nO2dcX/aLBCAg7WOpGqqNWmcpsZu9vt/xJn17aqBV+A4A8fvnr87wjOEJHB3yTIXyjavTnMRjG5+qvK2dOqzA4u8Dud2RZ0v8PXkdBfa64rdVGLaZdl6GVpJYbn+2zMkXkLraHlB8ytjmX9DaqQ1ZxVa5AYrDMFpaIubTP0FYx7BHs9RlFkZ2sCI51yUsS4y39QTL8Pn0P234NlHMPZJ+InPVIzvSUbHEi4Y943imxZs+B6665ZsoYL70D23Zg801C+kr5t2Gop286rtE3A5lbqX+bcC+N+FRfGm6dUc9hq10DT1kGG+lMF40PQL9s7/qBcMj0bxEdSQOg1z5K5CyZWewSaicrs/hp6DXxTHYddAN33ZDJvB2zXwRdlVaSCLw6QbNvOE3lMoT8OudZAXjInyY0d4n0ZCfZzEMYxjJe1RV1M21MGGIWFDO9gwJGxoBxuGhA3tYMOQsKEdbBgSNrSDDUPChnawYUjY0A42DAkb2sGGIWFDO0Y3lP0Z4OxwsDgKJGqYyWxfnS/TWJxTKgEZNAz/xUbk5mFsSRp+h7e8mv948EOlYXgR77Q0B0UsruIMSBjOLgMHjgfj3xeXwSIkDFeuV5MXg07CcBh+YHG576AmEoZKlNmb+d/8CzshYfhDuaBFLNfXwBM1FJVpSZXZuiFtKN4PxmDPw5a0oejMkaOTirShOZtCZvKFtqHY/PfacYMPAQkMjcbQ6q5BegzPD+Km/sNCzyMyFEu//LT/ISZD0ZR3SBGIylAcUTJ+r4nLsI/Bxh7F2AyBORU3iM5Q/EK+YHyGosJdUiM0FPUM84IxGopmjXjBKA3/dgJrTY3UEDFzJ1ZDvPSraA3FL6SfabyG4ucMZS56GC4enh6defptbShq8474PQ2V1Ll7sEJYUoGGs59jCKKkCsIMi+04gkL88B5FmKHDZPLl2VcRZDhquRffB3GQ4biF3bZ+D+IQQ3kc1VDMveonQgyLcQWF35IKMZyNbtjviCdu2N81Ejc074iTN+wfxBM3FCfYgzghQ2DJNlKGoIJmtAzFh/tTKjFDwPYNNUPxe+I4iuQMxc4cmkLcUBzXTooEDR23A0kaOp2j0jR0qSlH1NBhR5yqodjZPoiTNRRV6obJj+F5HlrORKKGya+lLifEJA2dTvkJGnZukRr0DJN/tzi/H6ZtmPw7fvL7NC3guJSU4QpyHEzIsHFcRMkZJn9ukfzZU/LnhyOfAad/jq/96McdmXsFRVOIp/ELUeSYKD36L93cBa+vkcENR41NDGKYfnzpeT0dKUbYlBt8P8Ms/ThvKJRi9WE45VskbZh8zkzyeU+IX36L0jD5/MM+dB0voztCw+TzgJPP5U4+Hx//u3ZxGXap18VIvrZJ8vVpLHa1xzq38OJWnSiTAO06URa72h+kq5mlXq+tWxh/obRr7r2bNmQk8bqJVWEcQUq1Lz+UC6ZWv1TZZzVVE5TUatAOS8lPzbdxYnWEF8rVDIbkakFffcz9WBr/nF4978uJmGZN9kzuvq6Ual39rHz/vJBFrPawvDkRwyx7rJqmTvj7Fj3Spq9Uv1FiDxvawYYhYUM72DAkbGgHG4aEDe1gw5CwoR1sGBI2tIMNQ8KGdrBhSNjQDjYMCRvawYYhYUM7VEOEhDgkhqeHQMNu2Ap+HDIUJTClgxjKZtgMWsKRN0pCdQOKIF4OmzlCPmd6Dwrl57UEtfM8bMalFtpdyZWewbKelS+Bx7KaqispMBdjoTYUhaJGUMC+c6EtAfEWei4WShjGmTmwMXUi9rxu2mko2o2+ogG0+MBe21qM7GGCMhutPoInW+AQ6h6O4sTjcVK56UcJ7Hb/yajFWMB4pbXpl9O48KviIuvQ/TdSe+a1laEFjJjDpQ3EPhURckvjvmWg7DvEPIqgmpcqZazLTY2XHTxuGTZbUHdV1vE93Swxi4CckdOd+aIjspsiZ6/3zS3yWOZjnXt9u/IWZZtXp7my0zUa3fxU5a3bPf4PawJzH2PfP3QAAAAASUVORK5CYII=" width="30"  alt ="logout" className="icon" onClick={this.logout}/></Link>
                        
                    </div> 
                </aside>
            </div>
        )
    }}


const mapStateToProps = state => {
    return {
      user: state.user
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        login: (user) => dispatch(login(user))
    
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);