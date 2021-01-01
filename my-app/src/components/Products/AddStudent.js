import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProductService from './ProductService';
const productService = new ProductService();
class AddStudent extends Component {
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
  handleForm = e => {
    e.preventDefault();
    const data = new FormData()

    data.append('sid', this.state.sid)
    data.append('name', this.state.name)
    data.append('semester', this.state.semester)
    data.append('branch', this.state.branch)
    
    // axios
    productService.createProduct(data).then(result => {
      console.log(result);
      NotificationManager.success("Student Added Sussceefully");
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
                        <div className="card-header text-center">Add Student</div>
                        <div className="card-body">
                        <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-4">
                        <div className="form-group">
                                <label >Student Id</label>
                                <input type="text" required name="sid" onChange={this.handleInput} className="form-control" placeholder="Enter student ID" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label >Student Name</label>
                                <textarea  name="name" onChange={this.handleInput} className="form-control" placeholder="Enter Student Name" ></textarea>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Semester</label>
                                <input type="text"  name="semester" onChange={this.handleInput} className="form-control" placeholder="Enter Student Semester" />
                            </div>
                            </div>
                            
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label >Branch</label>
                                <textarea   name="branch" onChange={this.handleInput} className="form-control" placeholder="Enter Branch" ></textarea>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Add Product</button></div>
                    </div>
                    </div>
                        {/* </div>
                        <div className="col-sm-2"></div>
                    </div> */}

                </form>
            </div>
    );
  }
}


export default AddStudent;