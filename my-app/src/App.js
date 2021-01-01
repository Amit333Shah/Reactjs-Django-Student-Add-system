import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AddStudent from "./components/Products/AddStudent";
import ListStudent from "./components/Products/ListStudent";
import EditStudent from "./components/Products/EditStudent";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/Layout";
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Router>
      <Layout>
        <div>
          <GuestRoute path="/add-student" exact component={AddStudent} />
          <GuestRoute path="/list-student" exact component={ListStudent} />
           <GuestRoute path="/student-edit/:sid" exact component={EditStudent} />
        </div>
      </Layout>
    </Router>
  );
}

export default App;