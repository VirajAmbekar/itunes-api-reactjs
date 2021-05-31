import React, { Component } from 'react'
import axios from "axios";

export default class Search extends Component {
    constructor(){
      super();
      this.state = {
          msg:"data not available",
          name:"",
          data:[],
      }
      this.load = this.load.bind(this);
    }

load(){
    if(this.state.name !== ""){
    var n = this.state.name;
    axios.get('https://itunes.apple.com/search?term='+n).then(resp => {
        this.setState({data : resp.data.results})
    console.log(this.state.data);
    console.log(resp)
});
    }
}
    render() {
        let i = 1;
        return (
            <div>
                <h3>Search Artist</h3>
                <form>
                <input type="text" name="name" placeholder="artist name" onChange={(e) => this.setState({name : e.target.value})} />
                 <br/>
                </form>
             
                 <input type="button" value="Search"  onClick={this.load}/>

                {
                this.state.data? 
                <div>
                       <table className="table table-striped">
                <thead>
                  <tr>
                    <td></td>
                    <td>wrapperType</td>
                    <td>kind</td>
                    <td>artistName</td>
                    <td>collectionName</td>
                    <td>trackName</td>
                    <td>trackViewUrl</td>
                    <td>contentAdvisoryRating</td>
                  </tr >
                </thead>

                <tbody>
                  {this.state.data.map((item) =>

                    <tr>
                      <td>{i++}</td>
                      <td>  {item.wrapperType} </td>
                      <td>  {item.kind} </td>
                      <td>  {item.artistName} </td>
                      <td>  {item.collectionName} </td>
                      <td>  {item.trackName} </td>
                      <td> <a href={item.trackViewUrl} target="_blank">go</a> </td>
                      <td>  {item.contentAdvisoryRating} </td>
                    </tr>
                  )}

                </tbody>


              </table>
                </div>
                :
                <div>
                    {this.state.msg}
                </div>
                }
            </div>
        )
    }
}
