import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProductService from './ProductService';
import {Link} from 'react-router-dom';
const productService = new ProductService();
class ListStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentList: [],
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
  };
  handleInput = e => {
    e.preventDefault();
  };
  componentDidMount() {
    let thisComponent = this;
    productService.getProducts()
      .then(function (response) {
        thisComponent.setState({ StudentList: response.data });
      })
  }
  handleDelete(sid)
  {
    let selfComponent = this;
      productService.deleteProduct(sid).then(function (response) {
        NotificationManager.warning("Student Deteted Successfully");
        selfComponent.setState({ StudentList: response.data });
      })
    
  }
  


  render() {
    return (
      <div className="content">
        <NotificationContainer />
        <form onSubmit={this.handleForm}>
          <div className="card">
            <div className="card-header text-center">Student List</div>
            <div className="card-body table-responsive">
              <div className="row" style={{ marginTop: 20 }}>
                <div className="col-sm-12">
                  <table className="table" >
                    <thead>
                      <tr>
                        <th>Student Id</th>
                        <th >Student Name</th>
                        <th>Student Semester</th>
                        <th>Student Branch</th>
                        <th>Created Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.StudentList.map(data =>
                        <tr key={data.sid}>
                        <td>{data.sid}</td>

                          <td>{data.name}</td>
                          <td>{data.semester}</td>
                      <td> {data.branch} </td>
                      <td>{data.created_at}</td>
                      <td><Link  className="btn btn-primary"  to={"/student-edit/"+data.sid}>Edit</Link>  <button className="btn btn-danger"  onClick={(e)=> this.handleDelete(data.sid) }> Delete</button></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </form>
      </div>
    );
  }
}


export default ListStudent;