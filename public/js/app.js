class Gatekeeper extends React.Component {
  state = {
    restaurants: [],
    sessions:{
      currentRestaurant: {},
      error: ""
    }
  }
  componentDidMount = () => {
    axios.get('/restaurant/').then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  showForm = () => {
    if(document.querySelector('#createDiv').style.display === 'block') {
      document.querySelector('#createDiv').style.display = 'none'
    } else {
      document.querySelector('#createDiv').style.display = 'block'
      document.querySelector('#loginDiv').style.display = 'none'
    }
  }
  showLogin = () => {
    if(document.querySelector('#loginDiv').style.display === 'block') {
      document.querySelector('#loginDiv').style.display = 'none'
    } else {
      document.querySelector('#loginDiv').style.display = 'block'
    }
  }
  createRestaurant = (data) => {
    event.preventDefault()
    axios.post('/restaurant/', data).then(response => {
      this.setState({
        restaurants: response.data
      })
      document.querySelector('#newRestForm').reset()
      this.showForm()
    })
  }
  editRestaurant = (data, id) => {
    event.preventDefault()
    axios.put('/restaurant/' + id, data).then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  deleteRestaurant = (id) => {
    axios.delete('/restaurant/' + id).then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  login = (data) => {
    event.preventDefault()
    axios.post('/sessions/', data).then(response => {
      console.log(response.data);
      if((typeof response.data) === 'string') {
        this.setState({
          sessions: {
            error: response.data
          }
        })
      } else {
        response.data.password= ''
        this.setState({
          sessions:{
            currentRestaurant: response.data,
            error: ""
          }
        })
      }
    })
  }
  render = () => {
    return (
      <div id='appContainer'>
        <nav id='topNav'>
          <div id='createShowButton' className='navBtn' onClick={this.showForm}>Create a Restaurant Profile</div>
          <div id='loginShowButton' className='navBtn' onClick={this.showLogin}>Login</div>
        </nav>
        <div id='createDiv' style={{display: 'none'}}>
          <NewRestaurantForm createRestaurant={this.createRestaurant}></NewRestaurantForm>
        </div>
        <div id='loginDiv' style={{display: 'none'}}>
          <LoginForm login={this.login} error={this.state.sessions.error}></LoginForm>
        </div>
        <div id='feedApp'>
          <RestaurantFeed restaurants={this.state.restaurants} editRestaurant={this.editRestaurant} deleteRestaurant={this.deleteRestaurant}></RestaurantFeed>
        </div>
      </div>
    )
  }
}


ReactDOM.render (
  <Gatekeeper></Gatekeeper>, document.querySelector('main')
)
