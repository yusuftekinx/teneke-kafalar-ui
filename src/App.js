import './App.css';
import Landing from './Components/Landing/Landing';
import "animate.css/animate.min.css";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Register from './Components/Auth/Register/Register';
import Login from './Components/Auth/Login/Login';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Components/Loading/Loading';
import { TokenControl } from './Service/Token/TokenControl';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onChangeStateToUser, onSaveUserToken } from './Redux/actions/Actions';
import Home from './Components/Home/Home';
import { loginRedirect } from './Helper/Redirect/LoginRedirect';
import Community from './Components/Community/Community';
import Vote from './Components/Vote/Vote';
import Settings from './Components/Settings/Settings'
import Help from './Components/Help/Help'
import CommunityContent from './Components/Community/CommunityContent/CommunityContent';
import io from 'socket.io-client'
import LiveNotification from './Components/LiveNotificaion/LiveNotification';
import { API_HOST } from './Service/settings';
const voteSocket = io(`${API_HOST}/socket-vote`)
const notificationSocket = io(`${API_HOST}/notification`)
const joinCommunitySocket = io(`${API_HOST}/joinCommunity`)

function App(props) {


  let token = localStorage.getItem('access_token')
  let history = useHistory();

  let tokenControl = async () => {

    if (token !== null) {
      await props.action[1](onSaveUserToken(token))
      await TokenControl(token).then(async (response) => {
        const { username, email, role } = response.data.user;
        let user = {
          username,
          email,
          role
        }
        await props.action[0](onChangeStateToUser(user))

      }).catch(err => {
        loginRedirect(props,history)
      })

    }

  }

  const endpoints = [
    {
      id: 1,
      path: '/',
      component: <Landing />,
      loading:true
    },
    {
      id: 2,
      path: '/login',
      component: <Login />,
      loading:true
    },
    {
      id: 3,
      path: '/register',
      component: <Register />,
      loading:true
    },
    {
      id: 4,
      path: '/community',
      component: <Home component = {<Community socket = {joinCommunitySocket} />} />,
    },
    {
      id:5,
      path:'/vote',
      component:<Home component = {<Vote socket = {voteSocket} />} />,
      loading:false
    },
    {
      id:6,
      path:'/settings',
      component:<Home component={<Settings/>} />,
      loading:false
    },
    {
      id:7,
      path:'/help',
      component:<Home component={<Help />} />,
      loading:false
    },
    {
      id:8,
      path:'/community/:slugName',
      component:  <Home component = {<Community component = {<CommunityContent />} />} />,
      loading:false
    },
    {
      id:9,
      path:'/notification',
      component:<Home component = {<LiveNotification io = {notificationSocket} role = {props.user.role} />} />,
      loading:false 
    }
  ]

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          {
            endpoints.map(endpoint => (
              <Route key={endpoint.id} exact path={`${endpoint.path}`}>
                <Loading loading = {endpoint.loading} event={tokenControl}>
                  {endpoint.component}
                </Loading>
              </Route>
            ))
          }
        </Switch>
      </Router>
    </div>
  );
}


const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators([onChangeStateToUser,onSaveUserToken], dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
