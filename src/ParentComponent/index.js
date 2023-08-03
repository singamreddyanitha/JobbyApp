import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Home from "../Components/Home"
import Jobs from "../Components/Jobs"
import Login from "../Components/Login"
import ProtectedRoute from "../Components/ProtectedRoute"
import JobItemDetails from "../Components/JobItemDetails"
import NotFound from "../Components/NotFound"

const ParentComponent = () => {

    return (
        <div>
        <Router >
           <Routes>
            <Route path = "/login" element = {<Login />} />
              <Route element = {< ProtectedRoute />}>
                  <Route  exact path = "/" element = {<Home />} />
                  <Route  exact path = "/jobs" element = {<Jobs/>} />
                  <Route exact path = "/jobs/:id" element = {<JobItemDetails />} />
                </Route>
              <Route path = "/not-found" element = {<NotFound />} /> 
            <Route path = "*" element = {<NotFound />} />
          </Routes >
        </Router>

         {/* <Home />
           <Jobs />
         */}
        </div>
    )
}

export default ParentComponent