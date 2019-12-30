import axios from 'axios'

export default {
  getInfoApi () {
    axios.get('/getInfo')
      .then(res => {
        return res
      })
      .catch(err => {
        return err
      })
  }
}
