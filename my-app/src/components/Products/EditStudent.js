import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProductService from './ProductService';
const productService = new ProductService();
class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sid : "",
        name : "",
        semester : "",
        branch : "",
        errors: {}
    };
  }

   componentDidMount() {
     let urlId = this.props.match.params.sid;
    let thisComponent = this;
    productService.getProductById(urlId)
      .then(function (response) {
        thisComponent.setState({
          sid: response.data.sid, 
          name: response.data.name, 
          semester: response.data.semester, 
          branch: response.data.branch, 
           });
      })
  }

  handleForm = e => {
    e.preventDefault();
    const data = new FormData()

    data.append('sid', this.state.sid)
    data.append('name', this.state.name)
    data.append('semester', this.state.semester)
    data.append('branch', this.state.branch)
    productService.updateProduct(data).then(response => {
      if(response.data)
      {
         this.setState({
            sid: response.data.sid, 
            name: response.data.name, 
            semester: response.data.semester, 
            branch: response.data.branch,  
             });
      }
       NotificationManager.success("Student Updated Sussceefully");

    })
    .catch(err => {
      if (err.response && err.response.status === 400)
        NotificationManager.error(err.response.data.msg);
      else
        NotificationManager.error("Something Went Wrong");
      this.setState({ errors: err.response })
    });
};
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="content">
        <NotificationContainer />
                <form onSubmit={this.handleForm}>
                    <div className="card">
                        <div className="card-header text-center">Student Id:{this.state.sid}</div>
                        <div className="card-body">
                        <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-4">
                        <div className="form-group">
                        <label >Student Id</label>
                                <input type="text" required name="sid" value={this.state.sid} onChange={this.handleInput} className="form-control" placeholder="Enter student ID" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label >Student Name</label>
                                <textarea  name="name"value={this.state.name} onChange={this.handleInput} className="form-control" placeholder="Enter Student Name" ></textarea>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Semester</label>
                                <input type="text"  name="semester"value={this.state.semester} onChange={this.handleInput} className="form-control" placeholder="Enter Student Semester" />
                            </div>
                            </div>
                            
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label >Branch</label>
                                <textarea   name="branch" value={this.state.branch}onChange={this.handleInput} className="form-control" placeholder="Enter Branch" ></textarea>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Add Student</button></div>
                    </div>
                    </div>

                </form>
            </div>
    );
  }
}


export default EditStudent;